-- CHARACTER-ATTRIBUTE MAPPINGS - Massive Scale Demonstration
-- This shows how I can map hundreds of characters with detailed attributes

-- Solo Leveling Characters
INSERT INTO character_attributes (character_id, attribute_id) VALUES
-- Sung Jin-Woo (assuming ID 1)
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
-- Add advanced attributes for Jin-Woo
(1, 21), (1, 41), (1, 71), (1, 81), (1, 91), (1, 101), (1, 111), (1, 121),

-- Go Gun-Hee (assuming next available ID)
((SELECT id FROM characters WHERE name = 'Go Gun-Hee'), 1), -- male
((SELECT id FROM characters WHERE name = 'Go Gun-Hee'), 11), -- old
((SELECT id FROM characters WHERE name = 'Go Gun-Hee'), 41), -- serious
((SELECT id FROM characters WHERE name = 'Go Gun-Hee'), 51), -- leader
((SELECT id FROM characters WHERE name = 'Go Gun-Hee'), 111), -- modern_setting

-- Baek Yoonho
((SELECT id FROM characters WHERE name = 'Baek Yoonho'), 1), -- male
((SELECT id FROM characters WHERE name = 'Baek Yoonho'), 31), -- blonde_hair
((SELECT id FROM characters WHERE name = 'Baek Yoonho'), 51), -- powerful
((SELECT id FROM characters WHERE name = 'Baek Yoonho'), 81), -- transformation
((SELECT id FROM characters WHERE name = 'Baek Yoonho'), 111), -- modern_setting

-- Cha Hae-In
((SELECT id FROM characters WHERE name = 'Cha Hae-In'), 2), -- female
((SELECT id FROM characters WHERE name = 'Cha Hae-In'), 51), -- powerful
((SELECT id FROM characters WHERE name = 'Cha Hae-In'), 91), -- weapon_mastery
((SELECT id FROM characters WHERE name = 'Cha Hae-In'), 111), -- modern_setting

-- Tower of God Characters
-- Bam/Twenty-Fifth Baam
((SELECT id FROM characters WHERE name = 'Bam/Twenty-Fifth Baam'), 1), -- male
((SELECT id FROM characters WHERE name = 'Bam/Twenty-Fifth Baam'), 21), -- black_hair
((SELECT id FROM characters WHERE name = 'Bam/Twenty-Fifth Baam'), 12), -- young
((SELECT id FROM characters WHERE name = 'Bam/Twenty-Fifth Baam'), 3), -- protagonist
((SELECT id FROM characters WHERE name = 'Bam/Twenty-Fifth Baam'), 74), -- energy_manipulation
((SELECT id FROM characters WHERE name = 'Bam/Twenty-Fifth Baam'), 104), -- chosen_one

-- Khun Aguero Agnes
((SELECT id FROM characters WHERE name = 'Khun Aguero Agnes'), 1), -- male
((SELECT id FROM characters WHERE name = 'Khun Aguero Agnes'), 32), -- blue_hair
((SELECT id FROM characters WHERE name = 'Khun Aguero Agnes'), 4), -- intelligent
((SELECT id FROM characters WHERE name = 'Khun Aguero Agnes'), 61), -- ice_powers
((SELECT id FROM characters WHERE name = 'Khun Aguero Agnes'), 93), -- royalty

-- Rak Wraithraiser
((SELECT id FROM characters WHERE name = 'Rak Wraithraiser'), 1), -- male
((SELECT id FROM characters WHERE name = 'Rak Wraithraiser'), 13), -- tall
((SELECT id FROM characters WHERE name = 'Rak Wraithraiser'), 45), -- hot_tempered
((SELECT id FROM characters WHERE name = 'Rak Wraithraiser'), 77), -- super_strength
((SELECT id FROM characters WHERE name = 'Rak Wraithraiser'), 91), -- weapon_mastery

-- The God of High School Characters
-- Jin Mori
((SELECT id FROM characters WHERE name = 'Jin Mori'), 1), -- male
((SELECT id FROM characters WHERE name = 'Jin Mori'), 21), -- black_hair
((SELECT id FROM characters WHERE name = 'Jin Mori'), 3), -- protagonist
((SELECT id FROM characters WHERE name = 'Jin Mori'), 77), -- super_strength
((SELECT id FROM characters WHERE name = 'Jin Mori'), 78), -- super_speed
((SELECT id FROM characters WHERE name = 'Jin Mori'), 81), -- transformation
((SELECT id FROM characters WHERE name = 'Jin Mori'), 91), -- weapon_mastery
((SELECT id FROM characters WHERE name = 'Jin Mori'), 101), -- legendary_bloodline

-- Han Daewi
((SELECT id FROM characters WHERE name = 'Han Daewi'), 1), -- male
((SELECT id FROM characters WHERE name = 'Han Daewi'), 21), -- black_hair
((SELECT id FROM characters WHERE name = 'Han Daewi'), 60), -- fire_powers
((SELECT id FROM characters WHERE name = 'Han Daewi'), 91), -- weapon_mastery

-- Yu Mira
((SELECT id FROM characters WHERE name = 'Yu Mira'), 2), -- female
((SELECT id FROM characters WHERE name = 'Yu Mira'), 21), -- black_hair
((SELECT id FROM characters WHERE name = 'Yu Mira'), 91), -- weapon_mastery
((SELECT id FROM characters WHERE name = 'Yu Mira'), 101), -- legendary_bloodline

-- Noblesse Characters
-- Cadis Etrama Di Raizel
((SELECT id FROM characters WHERE name = 'Cadis Etrama Di Raizel'), 1), -- male
((SELECT id FROM characters WHERE name = 'Cadis Etrama Di Raizel'), 21), -- black_hair
((SELECT id FROM characters WHERE name = 'Cadis Etrama Di Raizel'), 23), -- red_eyes
((SELECT id FROM characters WHERE name = 'Cadis Etrama Di Raizel'), 5), -- powerful
((SELECT id FROM characters WHERE name = 'Cadis Etrama Di Raizel'), 64), -- shadow_powers
((SELECT id FROM characters WHERE name = 'Cadis Etrama Di Raizel'), 93), -- royalty
((SELECT id FROM characters WHERE name = 'Cadis Etrama Di Raizel'), 101), -- legendary_bloodline

-- Frankenstein
((SELECT id FROM characters WHERE name = 'Frankenstein'), 1), -- male
((SELECT id FROM characters WHERE name = 'Frankenstein'), 32), -- blonde_hair
((SELECT id FROM characters WHERE name = 'Frankenstein'), 44), -- loyal
((SELECT id FROM characters WHERE name = 'Frankenstein'), 73), -- energy_manipulation

-- Lookism Characters
-- Park Daniel
((SELECT id FROM characters WHERE name = 'Park Daniel'), 1), -- male
((SELECT id FROM characters WHERE name = 'Park Daniel'), 21), -- black_hair
((SELECT id FROM characters WHERE name = 'Park Daniel'), 3), -- protagonist
((SELECT id FROM characters WHERE name = 'Park Daniel'), 12), -- young
((SELECT id FROM characters WHERE name = 'Park Daniel'), 81), -- transformation
((SELECT id FROM characters WHERE name = 'Park Daniel'), 94), -- commoner

-- Gun Park
((SELECT id FROM characters WHERE name = 'Gun Park'), 1), -- male
((SELECT id FROM characters WHERE name = 'Gun Park'), 21), -- black_hair
((SELECT id FROM characters WHERE name = 'Gun Park'), 5), -- powerful
((SELECT id FROM characters WHERE name = 'Gun Park'), 25), -- glasses
((SELECT id FROM characters WHERE name = 'Gun Park'), 91), -- weapon_mastery

-- Chinese Manhua Characters
-- Wei Wuxian
((SELECT id FROM characters WHERE name = 'Wei Wuxian'), 1), -- male
((SELECT id FROM characters WHERE name = 'Wei Wuxian'), 21), -- black_hair
((SELECT id FROM characters WHERE name = 'Wei Wuxian'), 3), -- protagonist
((SELECT id FROM characters WHERE name = 'Wei Wuxian'), 69), -- necromancy
((SELECT id FROM characters WHERE name = 'Wei Wuxian'), 39), -- cheerful
((SELECT id FROM characters WHERE name = 'Wei Wuxian'), 102), -- reincarnated

-- Lan Wangji
((SELECT id FROM characters WHERE name = 'Lan Wangji'), 1), -- male
((SELECT id FROM characters WHERE name = 'Lan Wangji'), 21), -- black_hair
((SELECT id FROM characters WHERE name = 'Lan Wangji'), 47), -- calm_collected
((SELECT id FROM characters WHERE name = 'Lan Wangji'), 93), -- royalty
((SELECT id FROM characters WHERE name = 'Lan Wangji'), 91), -- weapon_mastery

-- Nie Li
((SELECT id FROM characters WHERE name = 'Nie Li'), 1), -- male
((SELECT id FROM characters WHERE name = 'Nie Li'), 21), -- black_hair
((SELECT id FROM characters WHERE name = 'Nie Li'), 3), -- protagonist
((SELECT id FROM characters WHERE name = 'Nie Li'), 4), -- intelligent
((SELECT id FROM characters WHERE name = 'Nie Li'), 102), -- reincarnated
((SELECT id FROM characters WHERE name = 'Nie Li'), 107), -- cultivation

-- Xiao Yan
((SELECT id FROM characters WHERE name = 'Xiao Yan'), 1), -- male
((SELECT id FROM characters WHERE name = 'Xiao Yan'), 21), -- black_hair
((SELECT id FROM characters WHERE name = 'Xiao Yan'), 3), -- protagonist
((SELECT id FROM characters WHERE name = 'Xiao Yan'), 60), -- fire_powers
((SELECT id FROM characters WHERE name = 'Xiao Yan'), 107), -- cultivation

-- Yun Che
((SELECT id FROM characters WHERE name = 'Yun Che'), 1), -- male
((SELECT id FROM characters WHERE name = 'Yun Che'), 21), -- black_hair
((SELECT id FROM characters WHERE name = 'Yun Che'), 3), -- protagonist
((SELECT id FROM characters WHERE name = 'Yun Che'), 60), -- fire_powers
((SELECT id FROM characters WHERE name = 'Yun Che'), 65), -- healing_powers
((SELECT id FROM characters WHERE name = 'Yun Che'), 107), -- cultivation

-- Yang Kai
((SELECT id FROM characters WHERE name = 'Yang Kai'), 1), -- male
((SELECT id FROM characters WHERE name = 'Yang Kai'), 21), -- black_hair
((SELECT id FROM characters WHERE name = 'Yang Kai'), 3), -- protagonist
((SELECT id FROM characters WHERE name = 'Yang Kai'), 67), -- space_manipulation
((SELECT id FROM characters WHERE name = 'Yang Kai'), 107), -- cultivation

-- System/Isekai Characters
-- Kim Dokja
((SELECT id FROM characters WHERE name = 'Kim Dokja'), 1), -- male
((SELECT id FROM characters WHERE name = 'Kim Dokja'), 21), -- black_hair
((SELECT id FROM characters WHERE name = 'Kim Dokja'), 3), -- protagonist
((SELECT id FROM characters WHERE name = 'Kim Dokja'), 4), -- intelligent
((SELECT id FROM characters WHERE name = 'Kim Dokja'), 74), -- precognition
((SELECT id FROM characters WHERE name = 'Kim Dokja'), 108), -- regression

-- Cale Henituse
((SELECT id FROM characters WHERE name = 'Cale Henituse'), 1), -- male
((SELECT id FROM characters WHERE name = 'Cale Henituse'), 32), -- red_hair
((SELECT id FROM characters WHERE name = 'Cale Henituse'), 3), -- protagonist
((SELECT id FROM characters WHERE name = 'Cale Henituse'), 4), -- intelligent
((SELECT id FROM characters WHERE name = 'Cale Henituse'), 104), -- isekai
((SELECT id FROM characters WHERE name = 'Cale Henituse'), 93), -- royalty

-- Chung Myung
((SELECT id FROM characters WHERE name = 'Chung Myung'), 1), -- male
((SELECT id FROM characters WHERE name = 'Chung Myung'), 21), -- black_hair
((SELECT id FROM characters WHERE name = 'Chung Myung'), 3), -- protagonist
((SELECT id FROM characters WHERE name = 'Chung Myung'), 91), -- weapon_mastery
((SELECT id FROM characters WHERE name = 'Chung Myung'), 102), -- reincarnated
((SELECT id FROM characters WHERE name = 'Chung Myung'), 107), -- cultivation

-- Cheon Yeo-woon
((SELECT id FROM characters WHERE name = 'Cheon Yeo-woon'), 1), -- male
((SELECT id FROM characters WHERE name = 'Cheon Yeo-woon'), 21), -- black_hair
((SELECT id FROM characters WHERE name = 'Cheon Yeo-woon'), 3), -- protagonist
((SELECT id FROM characters WHERE name = 'Cheon Yeo-woon'), 73), -- energy_manipulation
((SELECT id FROM characters WHERE name = 'Cheon Yeo-woon'), 91), -- weapon_mastery
((SELECT id FROM characters WHERE name = 'Cheon Yeo-woon'), 115), -- technology_advanced

-- Grid
((SELECT id FROM characters WHERE name = 'Grid'), 1), -- male
((SELECT id FROM characters WHERE name = 'Grid'), 21), -- black_hair
((SELECT id FROM characters WHERE name = 'Grid'), 3), -- protagonist
((SELECT id FROM characters WHERE name = 'Grid'), 91), -- weapon_mastery
((SELECT id FROM characters WHERE name = 'Grid'), 114), -- virtual_reality

-- Add more mappings for remaining characters...
-- This demonstrates the scalability - I can continue for hundreds more characters;