-- Manhwa Akinator Database Schema

-- Characters table
CREATE TABLE characters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  manhwa_title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Attributes/Questions table
CREATE TABLE attributes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  question TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  priority INTEGER DEFAULT 1
);

-- Character attributes mapping
CREATE TABLE character_attributes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  character_id INTEGER,
  attribute_id INTEGER,
  value TEXT CHECK(value IN ('yes', 'no', 'maybe')) NOT NULL,
  FOREIGN KEY (character_id) REFERENCES characters(id),
  FOREIGN KEY (attribute_id) REFERENCES attributes(id),
  UNIQUE(character_id, attribute_id)
);

-- Sample characters
INSERT INTO characters (name, manhwa_title, description, image_url) VALUES
('Sung Jin-Woo', 'Solo Leveling', 'The Shadow Monarch and strongest S-rank hunter who gained his powers through the System.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
('Arthur Leywin', 'The Beginning After The End', 'Former king reincarnated into a world of magic, possessing unique abilities and knowledge.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
('Cale Henituse', 'Trash of the Count''s Family', 'Strategic noble who appears lazy but saves the world through careful planning.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
('Wei Wuxian', 'Mo Dao Zu Shi', 'Grandmaster of Demonic Cultivation known for his unconventional methods and carefree attitude.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
('Dokja Kim', 'Omniscient Reader', 'Reader who becomes part of his favorite novel and uses his knowledge to survive.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
('Cheon Yeo-woon', 'Nano Machine', 'Descendant who gains nanomachine technology to become the strongest martial artist.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
('Grid', 'Overgeared', 'Legendary blacksmith and player who creates the strongest items in a virtual world.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
('Yun Che', 'Against the Gods', 'Protagonist with the power of the Evil God who seeks revenge and becomes incredibly powerful.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
('Lucas', 'Who Made Me a Princess', 'Powerful magician who becomes the protector and teacher of Princess Athanasia.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
('Athanasia', 'Who Made Me a Princess', 'Princess with memories of her past life, trying to avoid death by changing the story.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
('Aria', 'The Villainess Reverses the Hourglass', 'Villainess who uses an hourglass to go back in time and change her fate.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
('Penelope Eckhart', 'Death Is The Only Ending For The Villainess', 'Girl trapped in an otome game trying to avoid all the death endings.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
('Roxana Agriche', 'The Way to Protect the Female Lead''s Older Brother', 'Villainess who protects her family while navigating dangerous political intrigue.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
('Nine', 'Beware of the Villainess!', 'Girl who becomes the villainess and decides to avoid the male leads entirely.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
('Raeliana McMillan', 'Why Raeliana Ended Up at the Duke''s Mansion', 'Woman who makes a contract marriage to avoid her death in the novel.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400');

-- Sample attributes/questions
INSERT INTO attributes (name, question, category, priority) VALUES
('is_male', 'Is this character male?', 'basic', 5),
('is_female', 'Is this character female?', 'basic', 5),
('has_black_hair', 'Does this character have black hair?', 'appearance', 3),
('has_magic_powers', 'Does this character have magical powers?', 'abilities', 4),
('is_protagonist', 'Is this character the main protagonist?', 'role', 4),
('is_villain', 'Is this character a villain?', 'role', 4),
('is_noble', 'Is this character from nobility?', 'background', 3),
('uses_sword', 'Does this character fight with a sword?', 'combat', 3),
('is_reincarnated', 'Is this character reincarnated or from another world?', 'background', 4),
('has_system', 'Does this character have access to a game-like system?', 'abilities', 3),
('is_overpowered', 'Is this character extremely powerful compared to others?', 'power', 3),
('has_romantic_interest', 'Does this character have a romantic subplot?', 'relationship', 2),
('is_student', 'Is this character a student?', 'role', 2),
('can_time_travel', 'Can this character travel through time or turn back time?', 'abilities', 2),
('is_from_manhwa', 'Is this character from a Korean manhwa?', 'origin', 5),
('is_from_manhua', 'Is this character from a Chinese manhua?', 'origin', 5),
('has_blue_eyes', 'Does this character have blue eyes?', 'appearance', 2),
('wears_armor', 'Does this character commonly wear armor?', 'appearance', 2),
('is_assassin', 'Is this character an assassin or has stealth abilities?', 'role', 2),
('has_healing_powers', 'Can this character heal others or themselves?', 'abilities', 2);

-- Character attributes mapping
INSERT INTO character_attributes (character_id, attribute_id, value) VALUES
-- Sung Jin-Woo
(1, 1, 'yes'), (1, 3, 'yes'), (1, 5, 'yes'), (1, 7, 'no'), (1, 8, 'yes'), (1, 10, 'yes'), (1, 11, 'yes'), (1, 15, 'yes'), (1, 19, 'yes'),
-- Arthur Leywin
(2, 1, 'yes'), (2, 4, 'yes'), (2, 5, 'yes'), (2, 7, 'yes'), (2, 8, 'yes'), (2, 9, 'yes'), (2, 11, 'yes'), (2, 15, 'yes'),
-- Cale Henituse
(3, 1, 'yes'), (3, 4, 'yes'), (3, 5, 'yes'), (3, 7, 'yes'), (3, 9, 'yes'), (3, 15, 'yes'),
-- Wei Wuxian
(4, 1, 'yes'), (4, 3, 'yes'), (4, 4, 'yes'), (4, 5, 'yes'), (4, 12, 'yes'), (4, 16, 'yes'),
-- Dokja Kim
(5, 1, 'yes'), (5, 3, 'yes'), (5, 5, 'yes'), (5, 9, 'yes'), (5, 10, 'yes'), (5, 15, 'yes'),
-- Cheon Yeo-woon
(6, 1, 'yes'), (6, 3, 'yes'), (6, 5, 'yes'), (6, 8, 'yes'), (6, 11, 'yes'), (6, 15, 'yes'),
-- Grid
(7, 1, 'yes'), (7, 5, 'yes'), (7, 10, 'yes'), (7, 11, 'yes'), (7, 15, 'yes'),
-- Yun Che
(8, 1, 'yes'), (8, 4, 'yes'), (8, 5, 'yes'), (8, 11, 'yes'), (8, 16, 'yes'),
-- Lucas
(9, 1, 'yes'), (9, 4, 'yes'), (9, 11, 'yes'), (9, 12, 'yes'), (9, 15, 'yes'),
-- Athanasia
(10, 2, 'yes'), (10, 4, 'yes'), (10, 5, 'yes'), (10, 7, 'yes'), (10, 9, 'yes'), (10, 12, 'yes'), (10, 14, 'yes'), (10, 15, 'yes'),
-- Aria
(11, 2, 'yes'), (11, 5, 'yes'), (11, 7, 'yes'), (11, 9, 'yes'), (11, 14, 'yes'), (11, 15, 'yes'),
-- Penelope Eckhart
(12, 2, 'yes'), (12, 5, 'yes'), (12, 7, 'yes'), (12, 9, 'yes'), (12, 15, 'yes'),
-- Roxana Agriche
(13, 2, 'yes'), (13, 7, 'yes'), (13, 9, 'yes'), (13, 12, 'yes'), (13, 15, 'yes'),
-- Nine
(14, 2, 'yes'), (14, 5, 'yes'), (14, 9, 'yes'), (14, 15, 'yes'),
-- Raeliana McMillan
(15, 2, 'yes'), (15, 5, 'yes'), (15, 7, 'yes'), (15, 9, 'yes'), (15, 12, 'yes'), (15, 15, 'yes');