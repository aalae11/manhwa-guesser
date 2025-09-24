/**
 * Real-Time Multiplayer System with WebSocket Support
 * Features: Live battles, spectator mode, tournaments
 */

const { v4: uuidv4 } = require('uuid');

class MultiplayerEngine {
    constructor() {
        this.activeRooms = new Map(); // roomId -> room data
        this.playerSockets = new Map(); // socketId -> socket
        this.waitingPlayers = new Set(); // players waiting for match
        this.tournaments = new Map(); // tournamentId -> tournament data
        this.leaderboard = new Map(); // userId -> stats
    }

    /**
     * Create a new multiplayer room
     */
    createRoom(hostSocket, roomType = 'battle', settings = {}) {
        const roomId = uuidv4();
        const room = {
            id: roomId,
            type: roomType, // 'battle', 'tournament', 'cooperative'
            host: hostSocket.userId,
            players: [this.getPlayerInfo(hostSocket)],
            spectators: [],
            status: 'waiting', // 'waiting', 'active', 'finished'
            settings: {
                maxPlayers: settings.maxPlayers || 2,
                timeLimit: settings.timeLimit || 300, // 5 minutes
                difficulty: settings.difficulty || 'medium',
                characterPool: settings.characterPool || 'all',
                ...settings
            },
            gameState: null,
            createdAt: Date.now()
        };

        this.activeRooms.set(roomId, room);
        hostSocket.join(roomId);
        
        return room;
    }

    /**
     * Join an existing room
     */
    joinRoom(socket, roomId, asSpectator = false) {
        const room = this.activeRooms.get(roomId);
        if (!room) {
            throw new Error('Room not found');
        }

        if (room.status !== 'waiting' && !asSpectator) {
            throw new Error('Room is not accepting new players');
        }

        const playerInfo = this.getPlayerInfo(socket);

        if (asSpectator) {
            room.spectators.push(playerInfo);
        } else {
            if (room.players.length >= room.settings.maxPlayers) {
                throw new Error('Room is full');
            }
            room.players.push(playerInfo);
        }

        socket.join(roomId);
        
        // Start game if room is full
        if (room.players.length === room.settings.maxPlayers && room.status === 'waiting') {
            this.startMultiplayerGame(room);
        }

        return room;
    }

    /**
     * Start a multiplayer game
     */
    startMultiplayerGame(room) {
        room.status = 'active';
        room.startedAt = Date.now();
        
        switch (room.type) {
            case 'battle':
                room.gameState = this.initializeBattleMode(room);
                break;
            case 'cooperative':
                room.gameState = this.initializeCooperativeMode(room);
                break;
            case 'speedrun':
                room.gameState = this.initializeSpeedrunMode(room);
                break;
        }

        // Notify all players and spectators
        this.broadcastToRoom(room.id, 'gameStarted', {
            gameState: room.gameState,
            players: room.players,
            settings: room.settings
        });

        // Set game timeout
        setTimeout(() => {
            if (room.status === 'active') {
                this.endGame(room, 'timeout');
            }
        }, room.settings.timeLimit * 1000);
    }

    /**
     * Initialize battle mode (players compete to guess first)
     */
    initializeBattleMode(room) {
        return {
            mode: 'battle',
            currentCharacter: this.selectRandomCharacter(room.settings.characterPool),
            playerStates: room.players.map(player => ({
                userId: player.userId,
                score: 0,
                questionsAsked: 0,
                currentGuess: null,
                isReady: false,
                timeRemaining: room.settings.timeLimit
            })),
            sharedQuestions: [], // Questions visible to all players
            winner: null
        };
    }

    /**
     * Initialize cooperative mode (players work together)
     */
    initializeCooperativeMode(room) {
        return {
            mode: 'cooperative',
            currentCharacter: this.selectRandomCharacter(room.settings.characterPool),
            sharedQuestions: [],
            sharedAnswers: [],
            teamScore: 0,
            questionsRemaining: 20,
            currentTurn: room.players[0].userId,
            turnOrder: room.players.map(p => p.userId)
        };
    }

    /**
     * Initialize speedrun mode (fastest to complete)
     */
    initializeSpeedrunMode(room) {
        return {
            mode: 'speedrun',
            characters: this.selectMultipleCharacters(room.settings.characterPool, 5),
            playerProgress: room.players.map(player => ({
                userId: player.userId,
                completedCharacters: 0,
                currentCharacterIndex: 0,
                totalTime: 0,
                isFinished: false
            }))
        };
    }

    /**
     * Handle player action in multiplayer game
     */
    handlePlayerAction(socket, roomId, action) {
        const room = this.activeRooms.get(roomId);
        if (!room || room.status !== 'active') {
            throw new Error('Game not active');
        }

        const playerId = socket.userId;
        
        switch (action.type) {
            case 'askQuestion':
                return this.handleMultiplayerQuestion(room, playerId, action.data);
            case 'makeGuess':
                return this.handleMultiplayerGuess(room, playerId, action.data);
            case 'useHint':
                return this.handleHintUsage(room, playerId);
            case 'surrender':
                return this.handleSurrender(room, playerId);
        }
    }

    /**
     * Handle question in multiplayer context
     */
    handleMultiplayerQuestion(room, playerId, questionData) {
        const gameState = room.gameState;
        
        if (gameState.mode === 'battle') {
            // In battle mode, each player asks their own questions
            const playerState = gameState.playerStates.find(p => p.userId === playerId);
            if (!playerState) return;

            playerState.questionsAsked++;
            
            // Add to shared questions if enabled
            if (room.settings.sharedQuestions) {
                gameState.sharedQuestions.push({
                    playerId,
                    question: questionData.question,
                    answer: questionData.answer,
                    timestamp: Date.now()
                });
            }
        } else if (gameState.mode === 'cooperative') {
            // In cooperative mode, questions are shared
            if (gameState.currentTurn !== playerId) {
                throw new Error('Not your turn');
            }

            gameState.sharedQuestions.push(questionData);
            gameState.questionsRemaining--;
            
            // Move to next player's turn
            const currentIndex = gameState.turnOrder.indexOf(playerId);
            const nextIndex = (currentIndex + 1) % gameState.turnOrder.length;
            gameState.currentTurn = gameState.turnOrder[nextIndex];
        }

        this.broadcastToRoom(room.id, 'questionAsked', {
            gameState,
            questionData,
            playerId
        });

        return gameState;
    }

    /**
     * Handle guess in multiplayer context
     */
    handleMultiplayerGuess(room, playerId, guessData) {
        const gameState = room.gameState;
        const isCorrect = guessData.characterId === gameState.currentCharacter.id;

        if (gameState.mode === 'battle') {
            if (isCorrect) {
                // Player wins the battle
                gameState.winner = playerId;
                this.updatePlayerStats(playerId, 'win');
                this.endGame(room, 'completed');
            } else {
                // Wrong guess, player continues or is eliminated
                const playerState = gameState.playerStates.find(p => p.userId === playerId);
                if (playerState) {
                    playerState.currentGuess = guessData;
                }
            }
        } else if (gameState.mode === 'cooperative') {
            if (isCorrect) {
                gameState.teamScore += this.calculateTeamScore(gameState.questionsRemaining);
                room.players.forEach(player => {
                    this.updatePlayerStats(player.userId, 'cooperative_win');
                });
                this.endGame(room, 'completed');
            } else {
                gameState.questionsRemaining = Math.max(0, gameState.questionsRemaining - 2);
            }
        }

        this.broadcastToRoom(room.id, 'guessMade', {
            gameState,
            guess: guessData,
            isCorrect,
            playerId
        });

        return { gameState, isCorrect };
    }

    /**
     * Quick match system
     */
    findQuickMatch(socket, preferences = {}) {
        // Look for existing waiting rooms
        for (const [roomId, room] of this.activeRooms) {
            if (room.status === 'waiting' && 
                room.players.length < room.settings.maxPlayers &&
                this.isCompatibleMatch(room, preferences)) {
                return this.joinRoom(socket, roomId);
            }
        }

        // Create new room if no match found
        return this.createRoom(socket, 'battle', preferences);
    }

    /**
     * Tournament system
     */
    createTournament(hostSocket, settings) {
        const tournamentId = uuidv4();
        const tournament = {
            id: tournamentId,
            name: settings.name || 'Manhwa Masters Tournament',
            host: hostSocket.userId,
            participants: [],
            maxParticipants: settings.maxParticipants || 16,
            rounds: [],
            currentRound: 0,
            status: 'registration', // 'registration', 'active', 'finished'
            prize: settings.prize || 'Glory and Honor',
            settings: {
                roundTimeLimit: settings.roundTimeLimit || 180,
                charactersPerRound: settings.charactersPerRound || 3,
                ...settings
            },
            createdAt: Date.now()
        };

        this.tournaments.set(tournamentId, tournament);
        return tournament;
    }

    /**
     * Real-time leaderboard updates
     */
    updateLeaderboard(userId, gameResult) {
        if (!this.leaderboard.has(userId)) {
            this.leaderboard.set(userId, {
                userId,
                totalGames: 0,
                wins: 0,
                losses: 0,
                averageQuestions: 0,
                bestTime: Infinity,
                rating: 1200, // ELO-style rating
                streak: 0,
                achievements: []
            });
        }

        const stats = this.leaderboard.get(userId);
        stats.totalGames++;

        if (gameResult.won) {
            stats.wins++;
            stats.streak++;
            stats.rating += this.calculateRatingChange(stats, gameResult, true);
        } else {
            stats.losses++;
            stats.streak = 0;
            stats.rating += this.calculateRatingChange(stats, gameResult, false);
        }

        // Update average questions
        stats.averageQuestions = (stats.averageQuestions * (stats.totalGames - 1) + gameResult.questionsUsed) / stats.totalGames;

        // Update best time
        if (gameResult.timeUsed && gameResult.timeUsed < stats.bestTime) {
            stats.bestTime = gameResult.timeUsed;
        }

        // Check for achievements
        this.checkAchievements(userId, stats, gameResult);

        return stats;
    }

    /**
     * Achievement system
     */
    checkAchievements(userId, stats, gameResult) {
        const achievements = [];

        // Speed achievements
        if (gameResult.timeUsed && gameResult.timeUsed < 30 && gameResult.won) {
            achievements.push({ id: 'speed_demon', name: 'Speed Demon', description: 'Won in under 30 seconds' });
        }

        // Streak achievements
        if (stats.streak === 5) {
            achievements.push({ id: 'hot_streak', name: 'Hot Streak', description: '5 wins in a row' });
        }
        if (stats.streak === 10) {
            achievements.push({ id: 'unstoppable', name: 'Unstoppable', description: '10 wins in a row' });
        }

        // Efficiency achievements
        if (gameResult.questionsUsed <= 5 && gameResult.won) {
            achievements.push({ id: 'mind_reader', name: 'Mind Reader', description: 'Won with 5 questions or less' });
        }

        // Add new achievements to stats
        achievements.forEach(achievement => {
            if (!stats.achievements.find(a => a.id === achievement.id)) {
                stats.achievements.push(achievement);
            }
        });

        return achievements;
    }

    /**
     * Spectator features
     */
    enableSpectatorMode(socket, roomId) {
        const room = this.activeRooms.get(roomId);
        if (!room) throw new Error('Room not found');

        const spectatorInfo = this.getPlayerInfo(socket);
        room.spectators.push(spectatorInfo);
        
        socket.join(roomId);
        
        // Send current game state to spectator
        socket.emit('spectatorJoined', {
            room,
            gameState: room.gameState
        });

        return room;
    }

    /**
     * Broadcast to all players and spectators in a room
     */
    broadcastToRoom(roomId, event, data) {
        // This would use Socket.io in the actual implementation
        const room = this.activeRooms.get(roomId);
        if (!room) return;

        // Simulate broadcast (in real implementation, use socket.io)
        console.log(`Broadcasting to room ${roomId}:`, event, data);
    }

    /**
     * Helper methods
     */
    getPlayerInfo(socket) {
        return {
            userId: socket.userId || 'anonymous',
            username: socket.username || 'Anonymous',
            avatar: socket.avatar || 'default',
            rating: this.leaderboard.get(socket.userId)?.rating || 1200,
            joinedAt: Date.now()
        };
    }

    selectRandomCharacter(pool) {
        // This would integrate with the character database
        return {
            id: Math.floor(Math.random() * 100),
            name: 'Random Character',
            series: 'Random Series'
        };
    }

    selectMultipleCharacters(pool, count) {
        // Return multiple random characters
        return Array(count).fill().map(() => this.selectRandomCharacter(pool));
    }

    isCompatibleMatch(room, preferences) {
        return (
            room.settings.difficulty === (preferences.difficulty || 'medium') &&
            room.settings.timeLimit <= (preferences.maxTime || 300)
        );
    }

    calculateRatingChange(stats, gameResult, won) {
        // Simple ELO-style calculation
        const K = 32; // K-factor
        const expected = 1 / (1 + Math.pow(10, (gameResult.opponentRating - stats.rating) / 400));
        const actual = won ? 1 : 0;
        return Math.round(K * (actual - expected));
    }

    calculateTeamScore(questionsRemaining) {
        return Math.max(100, questionsRemaining * 10);
    }

    endGame(room, reason) {
        room.status = 'finished';
        room.endedAt = Date.now();
        room.endReason = reason;

        this.broadcastToRoom(room.id, 'gameEnded', {
            gameState: room.gameState,
            reason,
            duration: room.endedAt - room.startedAt
        });

        // Clean up room after 5 minutes
        setTimeout(() => {
            this.activeRooms.delete(room.id);
        }, 5 * 60 * 1000);
    }

    // Analytics and admin features
    getRoomAnalytics() {
        return {
            totalRooms: this.activeRooms.size,
            activeGames: Array.from(this.activeRooms.values()).filter(r => r.status === 'active').length,
            waitingRooms: Array.from(this.activeRooms.values()).filter(r => r.status === 'waiting').length,
            totalPlayers: this.playerSockets.size,
            averageGameDuration: this.calculateAverageGameDuration()
        };
    }

    calculateAverageGameDuration() {
        const finishedRooms = Array.from(this.activeRooms.values())
            .filter(r => r.status === 'finished' && r.endedAt && r.startedAt);
        
        if (finishedRooms.length === 0) return 0;
        
        const totalDuration = finishedRooms.reduce((sum, room) => 
            sum + (room.endedAt - room.startedAt), 0);
        
        return Math.round(totalDuration / finishedRooms.length / 1000); // seconds
    }
}

module.exports = MultiplayerEngine;