-- INFINITE GAME SCENARIOS AND QUESTIONS
-- This demonstrates unlimited question generation potential

-- Advanced Character Attributes Questions
INSERT INTO game_questions (text, attribute_id, weight) VALUES
('Does this character have the ability to manipulate time?', 70, 2.5),
('Is this character known for their exceptional cooking skills?', 85, 2.0),
('Does this character have a connection to ancient bloodlines or legendary families?', 101, 3.0),
('Is this character from a modern-day setting with contemporary technology?', 111, 2.5),
('Does this character practice cultivation or martial arts for power enhancement?', 107, 3.0),
('Is this character known for their ability to see the future or past?', 74, 2.8),
('Does this character have any form of resurrection or revival abilities?', 76, 2.7),
('Is this character associated with virtual reality or digital worlds?', 114, 2.3),
('Does this character have the power to control or manipulate emotions?', 79, 2.4),
('Is this character from a wealthy or noble background?', 93, 2.1),

-- Series-Specific Questions
('Is this character from the Solo Leveling series?', NULL, 1.8),
('Does this character appear in Tower of God?', NULL, 1.8),
('Is this character from a Chinese cultivation manhua?', NULL, 2.2),
('Does this character come from a modern Korean webtoon?', NULL, 1.9),
('Is this character part of the Noblesse universe?', NULL, 2.0),
('Does this character appear in The God of High School?', NULL, 1.7),
('Is this character from Lookism?', NULL, 1.6),
('Does this character come from a regression/time loop story?', NULL, 2.4),
('Is this character from an isekai/transported to another world story?', NULL, 2.1),
('Does this character appear in Omniscient Reader''s Viewpoint?', NULL, 2.3),

-- Personality Deep Dive Questions
('Is this character known for being extremely loyal to their friends?', 44, 2.0),
('Does this character have a tendency to be overly confident or arrogant?', 46, 2.1),
('Is this character generally calm and collected in dangerous situations?', 47, 2.2),
('Does this character have a cheerful and optimistic personality?', 39, 1.9),
('Is this character known for being mysterious or secretive?', 42, 2.3),
('Does this character struggle with self-doubt or insecurity?', NULL, 1.8),
('Is this character driven primarily by revenge?', NULL, 2.5),
('Does this character prefer to work alone rather than in teams?', NULL, 2.1),
('Is this character known for their sense of humor or comedic timing?', 39, 1.7),
('Does this character have a strong moral code they follow?', NULL, 2.4),

-- Power and Abilities Deep Questions
('Can this character manipulate gravity or spatial dimensions?', 67, 3.2),
('Does this character have the ability to absorb or copy other powers?', NULL, 2.8),
('Is this character capable of creating or controlling illusions?', 68, 2.6),
('Does this character have any connection to death or the afterlife?', 69, 2.9),
('Can this character transform or shapeshift their appearance?', 81, 2.5),
('Does this character possess superhuman speed beyond normal limits?', 78, 2.7),
('Is this character capable of energy projection or beam attacks?', 73, 2.4),
('Does this character have defensive abilities or barriers?', NULL, 2.2),
('Can this character control or manipulate plants or nature?', NULL, 2.3),
('Does this character have psychic or telepathic abilities?', NULL, 2.6),

-- Appearance Specific Questions
('Does this character have heterochromia (different colored eyes)?', NULL, 2.1),
('Is this character known for wearing formal business attire?', NULL, 1.8),
('Does this character have any distinctive scars or markings?', NULL, 2.0),
('Is this character particularly tall compared to others?', 13, 1.7),
('Does this character wear glasses or have vision aids?', 25, 1.5),
('Is this character known for their unique hairstyle?', NULL, 1.6),
('Does this character have any robotic or cybernetic enhancements?', NULL, 2.4),
('Is this character often seen wearing a school uniform?', NULL, 1.9),
('Does this character have animal-like features or characteristics?', NULL, 2.2),
('Is this character known for their fashionable or stylish appearance?', NULL, 1.7),

-- Relationship and Social Questions
('Is this character the leader of a guild or organization?', 51, 2.3),
('Does this character have a romantic relationship in their series?', NULL, 1.8),
('Is this character known for having many followers or admirers?', NULL, 2.0),
('Does this character have a complicated relationship with their family?', NULL, 2.1),
('Is this character a mentor or teacher to other characters?', NULL, 2.2),
('Does this character have a rival or nemesis?', NULL, 2.0),
('Is this character part of a famous duo or partnership?', NULL, 1.9),
('Does this character prefer to keep their identity secret?', NULL, 2.3),
('Is this character known for betraying others?', NULL, 2.4),
('Does this character have disciples or students?', NULL, 2.1),

-- Story Role Questions
('Is this character the main antagonist of their series?', 6, 2.8),
('Does this character start weak but become extremely powerful?', NULL, 2.5),
('Is this character known for dying and coming back to life?', NULL, 2.7),
('Does this character travel between different worlds or dimensions?', NULL, 2.4),
('Is this character prophesied or destined for greatness?', 104, 2.6),
('Does this character have memory loss or amnesia?', NULL, 2.2),
('Is this character from the past living in the present?', NULL, 2.3),
('Does this character make contracts or deals with supernatural beings?', NULL, 2.4),
('Is this character known for breaking conventional rules or systems?', NULL, 2.2),
('Does this character have a tragic backstory involving loss?', NULL, 2.1),

-- Advanced Meta Questions
('Is this character more popular in Korea than other countries?', NULL, 1.6),
('Does this character appear in multiple media formats (webtoon, anime, game)?', NULL, 1.8),
('Is this character''s series completed or still ongoing?', NULL, 1.5),
('Has this character''s series been adapted into a live-action format?', NULL, 1.7),
('Is this character known for having merchandise or figures made of them?', NULL, 1.4),
('Does this character''s series have over 100 chapters/episodes?', NULL, 1.6),
('Is this character from a series that started before 2010?', NULL, 1.8),
('Has this character''s series won any major awards?', NULL, 1.5),
('Is this character''s series available in English translation?', NULL, 1.3),
('Does this character appear in crossover events or collaborations?', NULL, 1.7);

-- This is just a fraction of possible questions - I can generate thousands more!