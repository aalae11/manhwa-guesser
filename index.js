const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { randomUUID } = require('crypto');

// Create Express app
const app = express();

// In-memory database for serverless environment
const inMemoryDB = {
  characters: [
    // Solo Leveling
    { id: 1, name: 'Sung Jin-Woo', series: 'Solo Leveling', image_url: 'https://i.imgur.com/example1.jpg' },
    { id: 2, name: 'Cha Hae-In', series: 'Solo Leveling', image_url: 'https://i.imgur.com/example2.jpg' },
    { id: 3, name: 'Thomas Andre', series: 'Solo Leveling', image_url: 'https://i.imgur.com/example3.jpg' },
    { id: 4, name: 'Liu Zhigang', series: 'Solo Leveling', image_url: 'https://i.imgur.com/example4.jpg' },
    
    // Tower of God
    { id: 5, name: 'Bam', series: 'Tower of God', image_url: 'https://i.imgur.com/example5.jpg' },
    { id: 6, name: 'Khun Aguero Agnes', series: 'Tower of God', image_url: 'https://i.imgur.com/example6.jpg' },
    { id: 7, name: 'Rak Wraithraiser', series: 'Tower of God', image_url: 'https://i.imgur.com/example7.jpg' },
    { id: 8, name: 'Androssi Zahard', series: 'Tower of God', image_url: 'https://i.imgur.com/example8.jpg' },
    
    // The God of High School
    { id: 9, name: 'Jin Mori', series: 'The God of High School', image_url: 'https://i.imgur.com/example9.jpg' },
    { id: 10, name: 'Han Daewi', series: 'The God of High School', image_url: 'https://i.imgur.com/example10.jpg' },
    { id: 11, name: 'Yoo Mira', series: 'The God of High School', image_url: 'https://i.imgur.com/example11.jpg' },
    
    // Omniscient Reader's Viewpoint
    { id: 12, name: 'Kim Dokja', series: 'Omniscient Reader\'s Viewpoint', image_url: 'https://i.imgur.com/example12.jpg' },
    { id: 13, name: 'Yoo Joonghyuk', series: 'Omniscient Reader\'s Viewpoint', image_url: 'https://i.imgur.com/example13.jpg' },
    { id: 14, name: 'Han Sooyoung', series: 'Omniscient Reader\'s Viewpoint', image_url: 'https://i.imgur.com/example14.jpg' },
    
    // Jujutsu Kaisen
    { id: 15, name: 'Gojo Satoru', series: 'Jujutsu Kaisen', image_url: 'https://i.imgur.com/example15.jpg' },
    { id: 16, name: 'Itadori Yuji', series: 'Jujutsu Kaisen', image_url: 'https://i.imgur.com/example16.jpg' },
    { id: 17, name: 'Fushiguro Megumi', series: 'Jujutsu Kaisen', image_url: 'https://i.imgur.com/example17.jpg' },
    { id: 18, name: 'Kugisaki Nobara', series: 'Jujutsu Kaisen', image_url: 'https://i.imgur.com/example18.jpg' },
    
    // The Beginning After The End
    { id: 19, name: 'Arthur Leywin', series: 'The Beginning After The End', image_url: 'https://i.imgur.com/example19.jpg' },
    { id: 20, name: 'Tessia Eralith', series: 'The Beginning After The End', image_url: 'https://i.imgur.com/example20.jpg' },
    { id: 21, name: 'Sylvie', series: 'The Beginning After The End', image_url: 'https://i.imgur.com/example21.jpg' },
    
    // Trash of the Count's Family
    { id: 22, name: 'Cale Henituse', series: 'Trash of the Count\'s Family', image_url: 'https://i.imgur.com/example22.jpg' },
    { id: 23, name: 'Choi Han', series: 'Trash of the Count\'s Family', image_url: 'https://i.imgur.com/example23.jpg' },
    { id: 24, name: 'Alberu Crossman', series: 'Trash of the Count\'s Family', image_url: 'https://i.imgur.com/example24.jpg' },
    
    // Overgeared
    { id: 25, name: 'Grid', series: 'Overgeared', image_url: 'https://i.imgur.com/example25.jpg' },
    { id: 26, name: 'Yura', series: 'Overgeared', image_url: 'https://i.imgur.com/example26.jpg' },
    { id: 27, name: 'Jishuka', series: 'Overgeared', image_url: 'https://i.imgur.com/example27.jpg' },
    
    // Nano Machine
    { id: 28, name: 'Cheon Yeo-woon', series: 'Nano Machine', image_url: 'https://i.imgur.com/example28.jpg' },
    { id: 29, name: 'Cheon Yeo-woon (Young)', series: 'Nano Machine', image_url: 'https://i.imgur.com/example29.jpg' },
    
    // Against the Gods
    { id: 30, name: 'Yun Che', series: 'Against the Gods', image_url: 'https://i.imgur.com/example30.jpg' },
    { id: 31, name: 'Xia Qingyue', series: 'Against the Gods', image_url: 'https://i.imgur.com/example31.jpg' },
    
    // Who Made Me a Princess
    { id: 32, name: 'Athanasia de Alger Obelia', series: 'Who Made Me a Princess', image_url: 'https://i.imgur.com/example32.jpg' },
    { id: 33, name: 'Lucas', series: 'Who Made Me a Princess', image_url: 'https://i.imgur.com/example33.jpg' },
    { id: 34, name: 'Claude de Alger Obelia', series: 'Who Made Me a Princess', image_url: 'https://i.imgur.com/example34.jpg' },
    
    // The Villainess Reverses the Hourglass
    { id: 35, name: 'Aria Roscente', series: 'The Villainess Reverses the Hourglass', image_url: 'https://i.imgur.com/example35.jpg' },
    { id: 36, name: 'Asher', series: 'The Villainess Reverses the Hourglass', image_url: 'https://i.imgur.com/example36.jpg' },
    
    // Death Is The Only Ending For The Villainess
    { id: 37, name: 'Penelope Eckhart', series: 'Death Is The Only Ending For The Villainess', image_url: 'https://i.imgur.com/example37.jpg' },
    { id: 38, name: 'Callisto Regulus', series: 'Death Is The Only Ending For The Villainess', image_url: 'https://i.imgur.com/example38.jpg' },
    
    // The Way to Protect the Female Lead's Older Brother
    { id: 39, name: 'Roxana Agriche', series: 'The Way to Protect the Female Lead\'s Older Brother', image_url: 'https://i.imgur.com/example39.jpg' },
    { id: 40, name: 'Cassis Pedelian', series: 'The Way to Protect the Female Lead\'s Older Brother', image_url: 'https://i.imgur.com/example40.jpg' },
    
    // Beware of the Villainess!
    { id: 41, name: 'Nine', series: 'Beware of the Villainess!', image_url: 'https://i.imgur.com/example41.jpg' },
    { id: 42, name: 'Melissa Podebrat', series: 'Beware of the Villainess!', image_url: 'https://i.imgur.com/example42.jpg' },
    
    // Why Raeliana Ended Up at the Duke's Mansion
    { id: 43, name: 'Raeliana McMillan', series: 'Why Raeliana Ended Up at the Duke\'s Mansion', image_url: 'https://i.imgur.com/example43.jpg' },
    { id: 44, name: 'Noah Wynknight', series: 'Why Raeliana Ended Up at the Duke\'s Mansion', image_url: 'https://i.imgur.com/example44.jpg' },
    
    // UnOrdinary
    { id: 45, name: 'John', series: 'UnOrdinary', image_url: 'https://i.imgur.com/example45.jpg' },
    { id: 46, name: 'Seraphina', series: 'UnOrdinary', image_url: 'https://i.imgur.com/example46.jpg' },
    { id: 47, name: 'Arlo', series: 'UnOrdinary', image_url: 'https://i.imgur.com/example47.jpg' },
    
    // Lookism
    { id: 48, name: 'Park Hyung Suk', series: 'Lookism', image_url: 'https://i.imgur.com/example48.jpg' },
    { id: 49, name: 'Zack Lee', series: 'Lookism', image_url: 'https://i.imgur.com/example49.jpg' },
    { id: 50, name: 'Vasco', series: 'Lookism', image_url: 'https://i.imgur.com/example50.jpg' },
    
    // Wind Breaker
    { id: 51, name: 'Jay Jo', series: 'Wind Breaker', image_url: 'https://i.imgur.com/example51.jpg' },
    { id: 52, name: 'Shelly', series: 'Wind Breaker', image_url: 'https://i.imgur.com/example52.jpg' },
    
    // Eleceed
    { id: 53, name: 'Jisuk Yoo', series: 'Eleceed', image_url: 'https://i.imgur.com/example53.jpg' },
    { id: 54, name: 'Kayden Break', series: 'Eleceed', image_url: 'https://i.imgur.com/example54.jpg' },
    { id: 55, name: 'Wooin', series: 'Eleceed', image_url: 'https://i.imgur.com/example55.jpg' },
    
    // Noblesse
    { id: 56, name: 'Rai', series: 'Noblesse', image_url: 'https://i.imgur.com/example56.jpg' },
    { id: 57, name: 'Frankenstein', series: 'Noblesse', image_url: 'https://i.imgur.com/example57.jpg' },
    { id: 58, name: 'Regis K. Landegre', series: 'Noblesse', image_url: 'https://i.imgur.com/example58.jpg' },
    
    // Hardcore Leveling Warrior
    { id: 59, name: 'Yu Ijin', series: 'Hardcore Leveling Warrior', image_url: 'https://i.imgur.com/example59.jpg' },
    { id: 60, name: 'Dark', series: 'Hardcore Leveling Warrior', image_url: 'https://i.imgur.com/example60.jpg' },
    
    // Attack on Titan
    { id: 61, name: 'Eren Yeager', series: 'Attack on Titan', image_url: 'https://i.imgur.com/example61.jpg' },
    { id: 62, name: 'Mikasa Ackerman', series: 'Attack on Titan', image_url: 'https://i.imgur.com/example62.jpg' },
    { id: 63, name: 'Armin Arlert', series: 'Attack on Titan', image_url: 'https://i.imgur.com/example63.jpg' },
    { id: 64, name: 'Levi Ackerman', series: 'Attack on Titan', image_url: 'https://i.imgur.com/example64.jpg' },
    { id: 65, name: 'Erwin Smith', series: 'Attack on Titan', image_url: 'https://i.imgur.com/example65.jpg' },
    { id: 66, name: 'Hange Zoe', series: 'Attack on Titan', image_url: 'https://i.imgur.com/example66.jpg' },
    { id: 67, name: 'Jean Kirstein', series: 'Attack on Titan', image_url: 'https://i.imgur.com/example67.jpg' },
    { id: 68, name: 'Connie Springer', series: 'Attack on Titan', image_url: 'https://i.imgur.com/example68.jpg' },
    { id: 69, name: 'Sasha Blouse', series: 'Attack on Titan', image_url: 'https://i.imgur.com/example69.jpg' },
    { id: 70, name: 'Historia Reiss', series: 'Attack on Titan', image_url: 'https://i.imgur.com/example70.jpg' },
    
    // One Piece
    { id: 71, name: 'Monkey D. Luffy', series: 'One Piece', image_url: 'https://i.imgur.com/example71.jpg' },
    { id: 72, name: 'Roronoa Zoro', series: 'One Piece', image_url: 'https://i.imgur.com/example72.jpg' },
    { id: 73, name: 'Nami', series: 'One Piece', image_url: 'https://i.imgur.com/example73.jpg' },
    { id: 74, name: 'Usopp', series: 'One Piece', image_url: 'https://i.imgur.com/example74.jpg' },
    { id: 75, name: 'Sanji', series: 'One Piece', image_url: 'https://i.imgur.com/example75.jpg' },
    { id: 76, name: 'Tony Tony Chopper', series: 'One Piece', image_url: 'https://i.imgur.com/example76.jpg' },
    { id: 77, name: 'Nico Robin', series: 'One Piece', image_url: 'https://i.imgur.com/example77.jpg' },
    { id: 78, name: 'Franky', series: 'One Piece', image_url: 'https://i.imgur.com/example78.jpg' },
    { id: 79, name: 'Brook', series: 'One Piece', image_url: 'https://i.imgur.com/example79.jpg' },
    { id: 80, name: 'Jinbe', series: 'One Piece', image_url: 'https://i.imgur.com/example80.jpg' },
    
    // Naruto
    { id: 81, name: 'Naruto Uzumaki', series: 'Naruto', image_url: 'https://i.imgur.com/example81.jpg' },
    { id: 82, name: 'Sasuke Uchiha', series: 'Naruto', image_url: 'https://i.imgur.com/example82.jpg' },
    { id: 83, name: 'Sakura Haruno', series: 'Naruto', image_url: 'https://i.imgur.com/example83.jpg' },
    { id: 84, name: 'Kakashi Hatake', series: 'Naruto', image_url: 'https://i.imgur.com/example84.jpg' },
    { id: 85, name: 'Itachi Uchiha', series: 'Naruto', image_url: 'https://i.imgur.com/example85.jpg' },
    { id: 86, name: 'Hinata Hyuga', series: 'Naruto', image_url: 'https://i.imgur.com/example86.jpg' },
    { id: 87, name: 'Neji Hyuga', series: 'Naruto', image_url: 'https://i.imgur.com/example87.jpg' },
    { id: 88, name: 'Rock Lee', series: 'Naruto', image_url: 'https://i.imgur.com/example88.jpg' },
    { id: 89, name: 'Gaara', series: 'Naruto', image_url: 'https://i.imgur.com/example89.jpg' },
    { id: 90, name: 'Jiraiya', series: 'Naruto', image_url: 'https://i.imgur.com/example90.jpg' },
    
    // Dragon Ball
    { id: 91, name: 'Goku', series: 'Dragon Ball', image_url: 'https://i.imgur.com/example91.jpg' },
    { id: 92, name: 'Vegeta', series: 'Dragon Ball', image_url: 'https://i.imgur.com/example92.jpg' },
    { id: 93, name: 'Piccolo', series: 'Dragon Ball', image_url: 'https://i.imgur.com/example93.jpg' },
    { id: 94, name: 'Gohan', series: 'Dragon Ball', image_url: 'https://i.imgur.com/example94.jpg' },
    { id: 95, name: 'Trunks', series: 'Dragon Ball', image_url: 'https://i.imgur.com/example95.jpg' },
    { id: 96, name: 'Bulma', series: 'Dragon Ball', image_url: 'https://i.imgur.com/example96.jpg' },
    { id: 97, name: 'Chi-Chi', series: 'Dragon Ball', image_url: 'https://i.imgur.com/example97.jpg' },
    { id: 98, name: 'Krillin', series: 'Dragon Ball', image_url: 'https://i.imgur.com/example98.jpg' },
    { id: 99, name: 'Yamcha', series: 'Dragon Ball', image_url: 'https://i.imgur.com/example99.jpg' },
    { id: 100, name: 'Tien Shinhan', series: 'Dragon Ball', image_url: 'https://i.imgur.com/example100.jpg' },
    
    // Demon Slayer
    { id: 101, name: 'Tanjiro Kamado', series: 'Demon Slayer', image_url: 'https://i.imgur.com/example101.jpg' },
    { id: 102, name: 'Nezuko Kamado', series: 'Demon Slayer', image_url: 'https://i.imgur.com/example102.jpg' },
    { id: 103, name: 'Zenitsu Agatsuma', series: 'Demon Slayer', image_url: 'https://i.imgur.com/example103.jpg' },
    { id: 104, name: 'Inosuke Hashibira', series: 'Demon Slayer', image_url: 'https://i.imgur.com/example104.jpg' },
    { id: 105, name: 'Giyu Tomioka', series: 'Demon Slayer', image_url: 'https://i.imgur.com/example105.jpg' },
    { id: 106, name: 'Shinobu Kocho', series: 'Demon Slayer', image_url: 'https://i.imgur.com/example106.jpg' },
    { id: 107, name: 'Kyojuro Rengoku', series: 'Demon Slayer', image_url: 'https://i.imgur.com/example107.jpg' },
    { id: 108, name: 'Muzan Kibutsuji', series: 'Demon Slayer', image_url: 'https://i.imgur.com/example108.jpg' },
    { id: 109, name: 'Akaza', series: 'Demon Slayer', image_url: 'https://i.imgur.com/example109.jpg' },
    { id: 110, name: 'Doma', series: 'Demon Slayer', image_url: 'https://i.imgur.com/example110.jpg' },
    
    // My Hero Academia
    { id: 111, name: 'Izuku Midoriya', series: 'My Hero Academia', image_url: 'https://i.imgur.com/example111.jpg' },
    { id: 112, name: 'Katsuki Bakugo', series: 'My Hero Academia', image_url: 'https://i.imgur.com/example112.jpg' },
    { id: 113, name: 'Ochaco Uraraka', series: 'My Hero Academia', image_url: 'https://i.imgur.com/example113.jpg' },
    { id: 114, name: 'Shoto Todoroki', series: 'My Hero Academia', image_url: 'https://i.imgur.com/example114.jpg' },
    { id: 115, name: 'Tenya Iida', series: 'My Hero Academia', image_url: 'https://i.imgur.com/example115.jpg' },
    { id: 116, name: 'Tsuyu Asui', series: 'My Hero Academia', image_url: 'https://i.imgur.com/example116.jpg' },
    { id: 117, name: 'Eijiro Kirishima', series: 'My Hero Academia', image_url: 'https://i.imgur.com/example117.jpg' },
    { id: 118, name: 'Momo Yaoyorozu', series: 'My Hero Academia', image_url: 'https://i.imgur.com/example118.jpg' },
    { id: 119, name: 'All Might', series: 'My Hero Academia', image_url: 'https://i.imgur.com/example119.jpg' },
    { id: 120, name: 'Endeavor', series: 'My Hero Academia', image_url: 'https://i.imgur.com/example120.jpg' },
    
    // Tokyo Ghoul
    { id: 121, name: 'Ken Kaneki', series: 'Tokyo Ghoul', image_url: 'https://i.imgur.com/example121.jpg' },
    { id: 122, name: 'Touka Kirishima', series: 'Tokyo Ghoul', image_url: 'https://i.imgur.com/example122.jpg' },
    { id: 123, name: 'Hide Nagachika', series: 'Tokyo Ghoul', image_url: 'https://i.imgur.com/example123.jpg' },
    { id: 124, name: 'Rize Kamishiro', series: 'Tokyo Ghoul', image_url: 'https://i.imgur.com/example124.jpg' },
    { id: 125, name: 'Koutarou Amon', series: 'Tokyo Ghoul', image_url: 'https://i.imgur.com/example125.jpg' },
    { id: 126, name: 'Kureo Mado', series: 'Tokyo Ghoul', image_url: 'https://i.imgur.com/example126.jpg' },
    { id: 127, name: 'Yoshimura', series: 'Tokyo Ghoul', image_url: 'https://i.imgur.com/example127.jpg' },
    { id: 128, name: 'Nishiki Nishio', series: 'Tokyo Ghoul', image_url: 'https://i.imgur.com/example128.jpg' },
    { id: 129, name: 'Ayato Kirishima', series: 'Tokyo Ghoul', image_url: 'https://i.imgur.com/example129.jpg' },
    { id: 130, name: 'Hinami Fueguchi', series: 'Tokyo Ghoul', image_url: 'https://i.imgur.com/example130.jpg' },
    
    // Death Note
    { id: 131, name: 'Light Yagami', series: 'Death Note', image_url: 'https://i.imgur.com/example131.jpg' },
    { id: 132, name: 'L', series: 'Death Note', image_url: 'https://i.imgur.com/example132.jpg' },
    { id: 133, name: 'Misa Amane', series: 'Death Note', image_url: 'https://i.imgur.com/example133.jpg' },
    { id: 134, name: 'Ryuk', series: 'Death Note', image_url: 'https://i.imgur.com/example134.jpg' },
    { id: 135, name: 'Near', series: 'Death Note', image_url: 'https://i.imgur.com/example135.jpg' },
    { id: 136, name: 'Mello', series: 'Death Note', image_url: 'https://i.imgur.com/example136.jpg' },
    { id: 137, name: 'Soichiro Yagami', series: 'Death Note', image_url: 'https://i.imgur.com/example137.jpg' },
    { id: 138, name: 'Touta Matsuda', series: 'Death Note', image_url: 'https://i.imgur.com/example138.jpg' },
    { id: 139, name: 'Shuichi Aizawa', series: 'Death Note', image_url: 'https://i.imgur.com/example139.jpg' },
    { id: 140, name: 'Kanzo Mogi', series: 'Death Note', image_url: 'https://i.imgur.com/example140.jpg' },
    
    // Fullmetal Alchemist
    { id: 141, name: 'Edward Elric', series: 'Fullmetal Alchemist', image_url: 'https://i.imgur.com/example141.jpg' },
    { id: 142, name: 'Alphonse Elric', series: 'Fullmetal Alchemist', image_url: 'https://i.imgur.com/example142.jpg' },
    { id: 143, name: 'Winry Rockbell', series: 'Fullmetal Alchemist', image_url: 'https://i.imgur.com/example143.jpg' },
    { id: 144, name: 'Roy Mustang', series: 'Fullmetal Alchemist', image_url: 'https://i.imgur.com/example144.jpg' },
    { id: 145, name: 'Riza Hawkeye', series: 'Fullmetal Alchemist', image_url: 'https://i.imgur.com/example145.jpg' },
    { id: 146, name: 'Maes Hughes', series: 'Fullmetal Alchemist', image_url: 'https://i.imgur.com/example146.jpg' },
    { id: 147, name: 'Scar', series: 'Fullmetal Alchemist', image_url: 'https://i.imgur.com/example147.jpg' },
    { id: 148, name: 'Ling Yao', series: 'Fullmetal Alchemist', image_url: 'https://i.imgur.com/example148.jpg' },
    { id: 149, name: 'Lan Fan', series: 'Fullmetal Alchemist', image_url: 'https://i.imgur.com/example149.jpg' },
    { id: 150, name: 'Fu', series: 'Fullmetal Alchemist', image_url: 'https://i.imgur.com/example150.jpg' },
    
    // Hunter x Hunter
    { id: 151, name: 'Gon Freecss', series: 'Hunter x Hunter', image_url: 'https://i.imgur.com/example151.jpg' },
    { id: 152, name: 'Killua Zoldyck', series: 'Hunter x Hunter', image_url: 'https://i.imgur.com/example152.jpg' },
    { id: 153, name: 'Kurapika', series: 'Hunter x Hunter', image_url: 'https://i.imgur.com/example153.jpg' },
    { id: 154, name: 'Leorio Paradinight', series: 'Hunter x Hunter', image_url: 'https://i.imgur.com/example154.jpg' },
    { id: 155, name: 'Hisoka Morow', series: 'Hunter x Hunter', image_url: 'https://i.imgur.com/example155.jpg' },
    { id: 156, name: 'Chrollo Lucilfer', series: 'Hunter x Hunter', image_url: 'https://i.imgur.com/example156.jpg' },
    { id: 157, name: 'Illumi Zoldyck', series: 'Hunter x Hunter', image_url: 'https://i.imgur.com/example157.jpg' },
    { id: 158, name: 'Feitan Portor', series: 'Hunter x Hunter', image_url: 'https://i.imgur.com/example158.jpg' },
    { id: 159, name: 'Netero', series: 'Hunter x Hunter', image_url: 'https://i.imgur.com/example159.jpg' },
    { id: 160, name: 'Biscuit Krueger', series: 'Hunter x Hunter', image_url: 'https://i.imgur.com/example160.jpg' },
    
    // Bleach
    { id: 161, name: 'Ichigo Kurosaki', series: 'Bleach', image_url: 'https://i.imgur.com/example161.jpg' },
    { id: 162, name: 'Rukia Kuchiki', series: 'Bleach', image_url: 'https://i.imgur.com/example162.jpg' },
    { id: 163, name: 'Orihime Inoue', series: 'Bleach', image_url: 'https://i.imgur.com/example163.jpg' },
    { id: 164, name: 'Uryu Ishida', series: 'Bleach', image_url: 'https://i.imgur.com/example164.jpg' },
    { id: 165, name: 'Yasutora Sado', series: 'Bleach', image_url: 'https://i.imgur.com/example165.jpg' },
    { id: 166, name: 'Renji Abarai', series: 'Bleach', image_url: 'https://i.imgur.com/example166.jpg' },
    { id: 167, name: 'Byakuya Kuchiki', series: 'Bleach', image_url: 'https://i.imgur.com/example167.jpg' },
    { id: 168, name: 'Toshiro Hitsugaya', series: 'Bleach', image_url: 'https://i.imgur.com/example168.jpg' },
    { id: 169, name: 'Kenpachi Zaraki', series: 'Bleach', image_url: 'https://i.imgur.com/example169.jpg' },
    { id: 170, name: 'Mayuri Kurotsuchi', series: 'Bleach', image_url: 'https://i.imgur.com/example170.jpg' },
    
    // JoJo's Bizarre Adventure
    { id: 171, name: 'Jonathan Joestar', series: 'JoJo\'s Bizarre Adventure', image_url: 'https://i.imgur.com/example171.jpg' },
    { id: 172, name: 'Dio Brando', series: 'JoJo\'s Bizarre Adventure', image_url: 'https://i.imgur.com/example172.jpg' },
    { id: 173, name: 'Joseph Joestar', series: 'JoJo\'s Bizarre Adventure', image_url: 'https://i.imgur.com/example173.jpg' },
    { id: 174, name: 'Jotaro Kujo', series: 'JoJo\'s Bizarre Adventure', image_url: 'https://i.imgur.com/example174.jpg' },
    { id: 175, name: 'Josuke Higashikata', series: 'JoJo\'s Bizarre Adventure', image_url: 'https://i.imgur.com/example175.jpg' },
    { id: 176, name: 'Giorno Giovanna', series: 'JoJo\'s Bizarre Adventure', image_url: 'https://i.imgur.com/example176.jpg' },
    { id: 177, name: 'Jolyne Cujoh', series: 'JoJo\'s Bizarre Adventure', image_url: 'https://i.imgur.com/example177.jpg' },
    { id: 178, name: 'Johnny Joestar', series: 'JoJo\'s Bizarre Adventure', image_url: 'https://i.imgur.com/example178.jpg' },
    { id: 179, name: 'Josuke Higashikata (Part 8)', series: 'JoJo\'s Bizarre Adventure', image_url: 'https://i.imgur.com/example179.jpg' },
    { id: 180, name: 'Caesar Zeppeli', series: 'JoJo\'s Bizarre Adventure', image_url: 'https://i.imgur.com/example180.jpg' },
    
    // One Punch Man
    { id: 181, name: 'Saitama', series: 'One Punch Man', image_url: 'https://i.imgur.com/example181.jpg' },
    { id: 182, name: 'Genos', series: 'One Punch Man', image_url: 'https://i.imgur.com/example182.jpg' },
    { id: 183, name: 'Tornado of Terror', series: 'One Punch Man', image_url: 'https://i.imgur.com/example183.jpg' },
    { id: 184, name: 'Silver Fang', series: 'One Punch Man', image_url: 'https://i.imgur.com/example184.jpg' },
    { id: 185, name: 'Atomic Samurai', series: 'One Punch Man', image_url: 'https://i.imgur.com/example185.jpg' },
    { id: 186, name: 'Child Emperor', series: 'One Punch Man', image_url: 'https://i.imgur.com/example186.jpg' },
    { id: 187, name: 'Metal Knight', series: 'One Punch Man', image_url: 'https://i.imgur.com/example187.jpg' },
    { id: 188, name: 'King', series: 'One Punch Man', image_url: 'https://i.imgur.com/example188.jpg' },
    { id: 189, name: 'Zombieman', series: 'One Punch Man', image_url: 'https://i.imgur.com/example189.jpg' },
    { id: 190, name: 'Drive Knight', series: 'One Punch Man', image_url: 'https://i.imgur.com/example190.jpg' },
    
    // Mob Psycho 100
    { id: 191, name: 'Mob', series: 'Mob Psycho 100', image_url: 'https://i.imgur.com/example191.jpg' },
    { id: 192, name: 'Reigen Arataka', series: 'Mob Psycho 100', image_url: 'https://i.imgur.com/example192.jpg' },
    { id: 193, name: 'Dimple', series: 'Mob Psycho 100', image_url: 'https://i.imgur.com/example193.jpg' },
    { id: 194, name: 'Ritsu Kageyama', series: 'Mob Psycho 100', image_url: 'https://i.imgur.com/example194.jpg' },
    { id: 195, name: 'Shigeo Kageyama', series: 'Mob Psycho 100', image_url: 'https://i.imgur.com/example195.jpg' },
    { id: 196, name: 'Teruki Hanazawa', series: 'Mob Psycho 100', image_url: 'https://i.imgur.com/example196.jpg' },
    { id: 197, name: 'Tome Kurata', series: 'Mob Psycho 100', image_url: 'https://i.imgur.com/example197.jpg' },
    { id: 198, name: 'Ekubo', series: 'Mob Psycho 100', image_url: 'https://i.imgur.com/example198.jpg' },
    { id: 199, name: 'Suzuki', series: 'Mob Psycho 100', image_url: 'https://i.imgur.com/example199.jpg' },
    { id: 200, name: 'Toichiro Suzuki', series: 'Mob Psycho 100', image_url: 'https://i.imgur.com/example200.jpg' }
  ],
  
  attributes: [
    // Gender
    { id: 1, name: 'male', category: 'gender' },
    { id: 2, name: 'female', category: 'gender' },
    
    // Role
    { id: 3, name: 'protagonist', category: 'role' },
    { id: 4, name: 'antagonist', category: 'role' },
    { id: 5, name: 'supporting_character', category: 'role' },
    { id: 6, name: 'villain', category: 'role' },
    { id: 7, name: 'hero', category: 'role' },
    
    // Personality
    { id: 8, name: 'intelligent', category: 'personality' },
    { id: 9, name: 'kind', category: 'personality' },
    { id: 10, name: 'cold', category: 'personality' },
    { id: 11, name: 'cheerful', category: 'personality' },
    { id: 12, name: 'mysterious', category: 'personality' },
    { id: 13, name: 'arrogant', category: 'personality' },
    { id: 14, name: 'loyal', category: 'personality' },
    { id: 15, name: 'ruthless', category: 'personality' },
    
    // Power Level
    { id: 16, name: 'powerful', category: 'strength' },
    { id: 17, name: 'overpowered', category: 'strength' },
    { id: 18, name: 'weak', category: 'strength' },
    { id: 19, name: 'average_power', category: 'strength' },
    
    // Occupation
    { id: 20, name: 'hunter', category: 'occupation' },
    { id: 21, name: 'student', category: 'occupation' },
    { id: 22, name: 'teacher', category: 'occupation' },
    { id: 23, name: 'noble', category: 'occupation' },
    { id: 24, name: 'prince', category: 'occupation' },
    { id: 25, name: 'princess', category: 'occupation' },
    { id: 26, name: 'duke', category: 'occupation' },
    { id: 27, name: 'assassin', category: 'occupation' },
    { id: 28, name: 'magician', category: 'occupation' },
    { id: 29, name: 'warrior', category: 'occupation' },
    { id: 30, name: 'thief', category: 'occupation' },
    
    // Abilities
    { id: 31, name: 'skilled_fighter', category: 'ability' },
    { id: 32, name: 'magical_powers', category: 'ability' },
    { id: 33, name: 'healing_powers', category: 'ability' },
    { id: 34, name: 'time_manipulation', category: 'ability' },
    { id: 35, name: 'teleportation', category: 'ability' },
    { id: 36, name: 'mind_control', category: 'ability' },
    { id: 37, name: 'shapeshifting', category: 'ability' },
    { id: 38, name: 'regeneration', category: 'ability' },
    { id: 39, name: 'super_speed', category: 'ability' },
    { id: 40, name: 'super_strength', category: 'ability' },
    { id: 41, name: 'flying', category: 'ability' },
    { id: 42, name: 'invisibility', category: 'ability' },
    
    // Age
    { id: 43, name: 'old', category: 'age' },
    { id: 44, name: 'young', category: 'age' },
    { id: 45, name: 'teenager', category: 'age' },
    { id: 46, name: 'adult', category: 'age' },
    { id: 47, name: 'child', category: 'age' },
    
    // Appearance
    { id: 48, name: 'tall', category: 'appearance' },
    { id: 49, name: 'short', category: 'appearance' },
    { id: 50, name: 'average_height', category: 'appearance' },
    { id: 51, name: 'black_hair', category: 'appearance' },
    { id: 52, name: 'blonde_hair', category: 'appearance' },
    { id: 53, name: 'red_hair', category: 'appearance' },
    { id: 54, name: 'white_hair', category: 'appearance' },
    { id: 55, name: 'blue_eyes', category: 'appearance' },
    { id: 56, name: 'red_eyes', category: 'appearance' },
    { id: 57, name: 'green_eyes', category: 'appearance' },
    { id: 58, name: 'purple_eyes', category: 'appearance' },
    { id: 59, name: 'wears_glasses', category: 'appearance' },
    { id: 60, name: 'has_scars', category: 'appearance' },
    
    // Background
    { id: 61, name: 'reincarnated', category: 'background' },
    { id: 62, name: 'transmigrated', category: 'background' },
    { id: 63, name: 'from_another_world', category: 'background' },
    { id: 64, name: 'royal_family', category: 'background' },
    { id: 65, name: 'commoner', category: 'background' },
    { id: 66, name: 'orphan', category: 'background' },
    { id: 67, name: 'has_system', category: 'background' },
    { id: 68, name: 'has_cheat_ability', category: 'background' },
    
    // Relationships
    { id: 69, name: 'has_romantic_interest', category: 'relationship' },
    { id: 70, name: 'single', category: 'relationship' },
    { id: 71, name: 'has_family', category: 'relationship' },
    { id: 72, name: 'has_friends', category: 'relationship' },
    { id: 73, name: 'loner', category: 'relationship' },
    
    // Series Type
    { id: 74, name: 'from_manhwa', category: 'origin' },
    { id: 75, name: 'from_manhua', category: 'origin' },
    { id: 76, name: 'from_manga', category: 'origin' },
    { id: 77, name: 'from_webtoon', category: 'origin' },
    
    // Special Traits
    { id: 78, name: 'immortal', category: 'special' },
    { id: 79, name: 'can_die', category: 'special' },
    { id: 80, name: 'has_pet', category: 'special' },
    { id: 81, name: 'uses_sword', category: 'special' },
    { id: 82, name: 'uses_magic', category: 'special' },
    { id: 83, name: 'uses_technology', category: 'special' },
    { id: 84, name: 'wears_armor', category: 'special' },
    { id: 85, name: 'wears_robes', category: 'special' }
  ],
  
  character_attributes: [
    // Basic attributes for all characters - simplified for now
    // Sung Jin-Woo (Solo Leveling)
    { character_id: 1, attribute_id: 1 }, { character_id: 1, attribute_id: 3 }, { character_id: 1, attribute_id: 16 }, 
    { character_id: 1, attribute_id: 20 }, { character_id: 1, attribute_id: 31 }, { character_id: 1, attribute_id: 32 }, 
    { character_id: 1, attribute_id: 44 }, { character_id: 1, attribute_id: 48 }, { character_id: 1, attribute_id: 51 }, 
    { character_id: 1, attribute_id: 67 }, { character_id: 1, attribute_id: 74 },
    
    // Cha Hae-In (Solo Leveling)
    { character_id: 2, attribute_id: 2 }, { character_id: 2, attribute_id: 16 }, { character_id: 2, attribute_id: 20 }, 
    { character_id: 2, attribute_id: 31 }, { character_id: 2, attribute_id: 44 }, { character_id: 2, attribute_id: 48 }, 
    { character_id: 2, attribute_id: 51 }, { character_id: 2, attribute_id: 74 },
    
    // Bam (Tower of God)
    { character_id: 5, attribute_id: 1 }, { character_id: 5, attribute_id: 3 }, { character_id: 5, attribute_id: 16 }, 
    { character_id: 5, attribute_id: 32 }, { character_id: 5, attribute_id: 44 }, { character_id: 5, attribute_id: 48 }, 
    { character_id: 5, attribute_id: 51 }, { character_id: 5, attribute_id: 74 },
    
    // Khun Aguero Agnes (Tower of God)
    { character_id: 6, attribute_id: 1 }, { character_id: 6, attribute_id: 8 }, { character_id: 6, attribute_id: 16 }, 
    { character_id: 6, attribute_id: 32 }, { character_id: 6, attribute_id: 44 }, { character_id: 6, attribute_id: 48 }, 
    { character_id: 6, attribute_id: 52 }, { character_id: 6, attribute_id: 55 }, { character_id: 6, attribute_id: 74 },
    
    // Jin Mori (The God of High School)
    { character_id: 9, attribute_id: 1 }, { character_id: 9, attribute_id: 3 }, { character_id: 9, attribute_id: 17 }, 
    { character_id: 9, attribute_id: 21 }, { character_id: 9, attribute_id: 31 }, { character_id: 9, attribute_id: 44 }, 
    { character_id: 9, attribute_id: 48 }, { character_id: 9, attribute_id: 51 }, { character_id: 9, attribute_id: 74 },
    
    // Han Daewi (The God of High School)
    { character_id: 10, attribute_id: 1 }, { character_id: 10, attribute_id: 16 }, { character_id: 10, attribute_id: 21 }, 
    { character_id: 10, attribute_id: 31 }, { character_id: 10, attribute_id: 44 }, { character_id: 10, attribute_id: 48 }, 
    { character_id: 10, attribute_id: 51 }, { character_id: 10, attribute_id: 74 },
    
    // Kim Dokja (Omniscient Reader's Viewpoint)
    { character_id: 12, attribute_id: 1 }, { character_id: 12, attribute_id: 3 }, { character_id: 12, attribute_id: 8 }, 
    { character_id: 12, attribute_id: 16 }, { character_id: 12, attribute_id: 44 }, { character_id: 12, attribute_id: 48 }, 
    { character_id: 12, attribute_id: 51 }, { character_id: 12, attribute_id: 74 },
    
    // Yoo Joonghyuk (Omniscient Reader's Viewpoint)
    { character_id: 13, attribute_id: 1 }, { character_id: 13, attribute_id: 10 }, { character_id: 13, attribute_id: 16 }, 
    { character_id: 13, attribute_id: 31 }, { character_id: 13, attribute_id: 44 }, { character_id: 13, attribute_id: 48 }, 
    { character_id: 13, attribute_id: 51 }, { character_id: 13, attribute_id: 74 },
    
    // Gojo Satoru (Jujutsu Kaisen)
    { character_id: 15, attribute_id: 1 }, { character_id: 15, attribute_id: 8 }, { character_id: 15, attribute_id: 17 }, 
    { character_id: 15, attribute_id: 22 }, { character_id: 15, attribute_id: 32 }, { character_id: 15, attribute_id: 44 }, 
    { character_id: 15, attribute_id: 48 }, { character_id: 15, attribute_id: 54 }, { character_id: 15, attribute_id: 55 }, 
    { character_id: 15, attribute_id: 76 },
    
    // Itadori Yuji (Jujutsu Kaisen)
    { character_id: 16, attribute_id: 1 }, { character_id: 16, attribute_id: 3 }, { character_id: 16, attribute_id: 9 }, 
    { character_id: 16, attribute_id: 16 }, { character_id: 16, attribute_id: 21 }, { character_id: 16, attribute_id: 31 }, 
    { character_id: 16, attribute_id: 32 }, { character_id: 16, attribute_id: 44 }, { character_id: 16, attribute_id: 48 }, 
    { character_id: 16, attribute_id: 51 }, { character_id: 16, attribute_id: 76 },
    
    // Eren Yeager (Attack on Titan)
    { character_id: 61, attribute_id: 1 }, { character_id: 61, attribute_id: 3 }, { character_id: 61, attribute_id: 16 }, 
    { character_id: 61, attribute_id: 31 }, { character_id: 61, attribute_id: 44 }, { character_id: 61, attribute_id: 48 }, 
    { character_id: 61, attribute_id: 51 }, { character_id: 61, attribute_id: 76 },
    
    // Mikasa Ackerman (Attack on Titan)
    { character_id: 62, attribute_id: 2 }, { character_id: 62, attribute_id: 16 }, { character_id: 62, attribute_id: 31 }, 
    { character_id: 62, attribute_id: 44 }, { character_id: 62, attribute_id: 48 }, { character_id: 62, attribute_id: 51 }, 
    { character_id: 62, attribute_id: 76 },
    
    // Luffy (One Piece)
    { character_id: 71, attribute_id: 1 }, { character_id: 71, attribute_id: 3 }, { character_id: 71, attribute_id: 9 }, 
    { character_id: 71, attribute_id: 16 }, { character_id: 71, attribute_id: 31 }, { character_id: 71, attribute_id: 44 }, 
    { character_id: 71, attribute_id: 48 }, { character_id: 71, attribute_id: 51 }, { character_id: 71, attribute_id: 76 },
    
    // Naruto (Naruto)
    { character_id: 81, attribute_id: 1 }, { character_id: 81, attribute_id: 3 }, { character_id: 81, attribute_id: 9 }, 
    { character_id: 81, attribute_id: 16 }, { character_id: 81, attribute_id: 21 }, { character_id: 81, attribute_id: 32 }, 
    { character_id: 81, attribute_id: 44 }, { character_id: 81, attribute_id: 48 }, { character_id: 81, attribute_id: 52 }, 
    { character_id: 81, attribute_id: 76 },
    
    // Goku (Dragon Ball)
    { character_id: 91, attribute_id: 1 }, { character_id: 91, attribute_id: 3 }, { character_id: 91, attribute_id: 9 }, 
    { character_id: 91, attribute_id: 17 }, { character_id: 91, attribute_id: 31 }, { character_id: 91, attribute_id: 40 }, 
    { character_id: 91, attribute_id: 44 }, { character_id: 91, attribute_id: 48 }, { character_id: 91, attribute_id: 52 }, 
    { character_id: 91, attribute_id: 76 },
    
    // Tanjiro (Demon Slayer)
    { character_id: 101, attribute_id: 1 }, { character_id: 101, attribute_id: 3 }, { character_id: 101, attribute_id: 9 }, 
    { character_id: 101, attribute_id: 16 }, { character_id: 101, attribute_id: 31 }, { character_id: 101, attribute_id: 44 }, 
    { character_id: 101, attribute_id: 48 }, { character_id: 101, attribute_id: 51 }, { character_id: 101, attribute_id: 76 },
    
    // Deku (My Hero Academia)
    { character_id: 111, attribute_id: 1 }, { character_id: 111, attribute_id: 3 }, { character_id: 111, attribute_id: 9 }, 
    { character_id: 111, attribute_id: 16 }, { character_id: 111, attribute_id: 21 }, { character_id: 111, attribute_id: 32 }, 
    { character_id: 111, attribute_id: 44 }, { character_id: 111, attribute_id: 48 }, { character_id: 111, attribute_id: 51 }, 
    { character_id: 111, attribute_id: 76 },
    
    // Light Yagami (Death Note)
    { character_id: 131, attribute_id: 1 }, { character_id: 131, attribute_id: 3 }, { character_id: 131, attribute_id: 8 }, 
    { character_id: 131, attribute_id: 16 }, { character_id: 131, attribute_id: 21 }, { character_id: 131, attribute_id: 44 }, 
    { character_id: 131, attribute_id: 48 }, { character_id: 131, attribute_id: 51 }, { character_id: 131, attribute_id: 76 },
    
    // Edward Elric (Fullmetal Alchemist)
    { character_id: 141, attribute_id: 1 }, { character_id: 141, attribute_id: 3 }, { character_id: 141, attribute_id: 8 }, 
    { character_id: 141, attribute_id: 16 }, { character_id: 141, attribute_id: 32 }, { character_id: 141, attribute_id: 44 }, 
    { character_id: 141, attribute_id: 48 }, { character_id: 141, attribute_id: 52 }, { character_id: 141, attribute_id: 76 },
    
    // Gon (Hunter x Hunter)
    { character_id: 151, attribute_id: 1 }, { character_id: 151, attribute_id: 3 }, { character_id: 151, attribute_id: 9 }, 
    { character_id: 151, attribute_id: 16 }, { character_id: 151, attribute_id: 44 }, { character_id: 151, attribute_id: 48 }, 
    { character_id: 151, attribute_id: 52 }, { character_id: 151, attribute_id: 76 },
    
    // Ichigo (Bleach)
    { character_id: 161, attribute_id: 1 }, { character_id: 161, attribute_id: 3 }, { character_id: 161, attribute_id: 16 }, 
    { character_id: 161, attribute_id: 32 }, { character_id: 161, attribute_id: 44 }, { character_id: 161, attribute_id: 48 }, 
    { character_id: 161, attribute_id: 52 }, { character_id: 161, attribute_id: 76 },
    
    // Saitama (One Punch Man)
    { character_id: 181, attribute_id: 1 }, { character_id: 181, attribute_id: 3 }, { character_id: 181, attribute_id: 17 }, 
    { character_id: 181, attribute_id: 31 }, { character_id: 181, attribute_id: 40 }, { character_id: 181, attribute_id: 46 }, 
    { character_id: 181, attribute_id: 48 }, { character_id: 181, attribute_id: 51 }, { character_id: 181, attribute_id: 76 },
    
    // Mob (Mob Psycho 100)
    { character_id: 191, attribute_id: 1 }, { character_id: 191, attribute_id: 3 }, { character_id: 191, attribute_id: 8 }, 
    { character_id: 191, attribute_id: 16 }, { character_id: 191, attribute_id: 32 }, { character_id: 191, attribute_id: 44 }, 
    { character_id: 191, attribute_id: 48 }, { character_id: 191, attribute_id: 51 }, { character_id: 191, attribute_id: 76 }
  ],
  
  sessions: {}
};

// Middleware
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: false
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Netlify functions rewrite compatibility: allow calling endpoints without /api prefix
app.use((req, res, next) => {
  if (!req.url.startsWith('/api')) {
    const matchesApi = req.url.match(/^\/(session|character|attributes|health)(\b|\/)/);
    if (matchesApi) {
      req.url = '/api' + req.url;
    }
  }
  next();
});

// Root route for health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Explicit health check endpoint (single definition)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running', timestamp: new Date().toISOString() });
});

// In-memory session management
const sessions = inMemoryDB.sessions;

// Game logic functions
function calculateProbabilities(session) {
  const candidates = [...session.candidates];
  let bestQuestion = null;
  let bestQuestionScore = 0;
  
  // Find attribute that best splits the candidates
  inMemoryDB.attributes.forEach(attr => {
    if (session.askedAttributes.includes(attr.id)) return;
    
    let withAttr = 0;
    candidates.forEach(charId => {
      const hasAttr = inMemoryDB.character_attributes.some(
        ca => ca.character_id === charId && ca.attribute_id === attr.id
      );
      if (hasAttr) withAttr++;
    });
    
    const withoutAttr = candidates.length - withAttr;
    const splitScore = Math.abs(candidates.length / 2 - withAttr);
    
    if (splitScore > bestQuestionScore) {
      bestQuestionScore = splitScore;
      bestQuestion = attr;
    }
  });
  
  return bestQuestion;
}

function filterCandidates(session, attributeId, answer) {
  const newCandidates = [];
  
  session.candidates.forEach(charId => {
    const hasAttribute = inMemoryDB.character_attributes.some(
      ca => ca.character_id === charId && ca.attribute_id === attributeId
    );
    
    if ((answer === 'yes' && hasAttribute) || 
        (answer === 'no' && !hasAttribute) || 
        (answer === 'maybe')) {
      newCandidates.push(charId);
    }
  });
  
  return newCandidates.length > 0 ? newCandidates : session.candidates;
}

// API Routes

// Start a new game session
app.post('/api/session', (req, res) => {
  console.log('POST /api/session called', { body: req.body, headers: req.headers });
  const sessionId = randomUUID();
  
  // Initialize all characters as candidates
  const allCharacterIds = inMemoryDB.characters.map(char => char.id);
  
  sessions[sessionId] = {
    id: sessionId,
    candidates: allCharacterIds,
    askedAttributes: [],
    answers: {},
    startTime: Date.now(),
    guessCount: 0
  };
  
  res.json({
    success: true,
    data: {
      sessionId,
      message: 'New game session started',
      totalCharacters: allCharacterIds.length
    }
  });
});

// Get next question
app.get('/api/session/:sessionId/question', (req, res) => {
  const { sessionId } = req.params;
  const session = sessions[sessionId];
  
  if (!session) {
    return res.status(404).json({
      success: false,
      error: 'Session not found'
    });
  }
  
  // Check if we have few enough candidates to make a guess
  if (session.candidates.length <= 3 && session.guessCount < 3) {
    const character = inMemoryDB.characters.find(c => c.id === session.candidates[0]);
    
    if (character) {
      session.guessCount++;
      return res.json({
        success: true,
        data: {
          type: 'guess',
          questionNumber: session.askedAttributes.length,
          candidatesRemaining: session.candidates.length,
          character: {
            id: character.id,
            name: character.name,
            series: character.series,
            image_url: character.image_url
          }
        }
      });
    }
  }
  
  // If no candidates left, return error
  if (session.candidates.length === 0) {
    return res.json({
      success: false,
      error: 'No characters match your answers. Please start a new game.'
    });
  }
  
  // Calculate best question to ask
  const nextAttribute = calculateProbabilities(session);
  
  if (!nextAttribute) {
    return res.json({
      success: false,
      error: 'No more questions available'
    });
  }
  
  session.askedAttributes.push(nextAttribute.id);
  
  res.json({
    success: true,
    data: {
      type: 'question',
      questionNumber: session.askedAttributes.length,
      candidatesRemaining: session.candidates.length,
      attribute: {
        id: nextAttribute.id,
        name: nextAttribute.name,
        category: nextAttribute.category,
        question: `Is your character ${nextAttribute.name.replaceAll('_', ' ')}?`
      }
    }
  });
});

// Submit answer
app.post('/api/session/:sessionId/answer', (req, res) => {
  const { sessionId } = req.params;
  const { attributeId, answer } = req.body;
  
  console.log('Answer submission:', { sessionId, attributeId, answer, body: req.body });
  
  // Validation
  if (!sessionId) {
    return res.status(400).json({
      success: false,
      error: 'Missing sessionId in URL path'
    });
  }
  
  if (!attributeId) {
    return res.status(400).json({
      success: false,
      error: 'Missing attributeId in request body'
    });
  }
  
  if (!answer) {
    return res.status(400).json({
      success: false,
      error: 'Missing answer in request body'
    });
  }
  
  if (!['yes', 'no', 'maybe'].includes(answer.toLowerCase())) {
    return res.status(400).json({
      success: false,
      error: 'Answer must be yes, no, or maybe'
    });
  }

  const session = sessions[sessionId];
  
  if (!session) {
    return res.status(404).json({
      success: false,
      error: 'Session not found'
    });
  }

  // Convert attributeId to number if it's a string
  const numericAttributeId = parseInt(attributeId);
  
  // Record the answer
  session.answers[numericAttributeId] = answer.toLowerCase();
  
  // Filter candidates based on answer
  session.candidates = filterCandidates(session, numericAttributeId, answer.toLowerCase());
  
  res.json({
    success: true,
    data: {
      remainingCandidates: session.candidates.length,
      questionsAsked: session.askedAttributes.length
    }
  });
});

// Get current guess
app.get('/api/session/:sessionId/guess', (req, res) => {
  const { sessionId } = req.params;
  const session = sessions[sessionId];
  
  if (!session) {
    return res.status(404).json({
      success: false,
      error: 'Session not found'
    });
  }
  
  if (session.candidates.length === 0) {
    return res.json({
      success: false,
      error: 'No candidates match your answers'
    });
  }
  
  const character = inMemoryDB.characters.find(c => c.id === session.candidates[0]);
  
  res.json({
    success: true,
    data: {
      character: {
        id: character.id,
        name: character.name,
        series: character.series,
        image_url: character.image_url
      }
    }
  });
});

// Submit guess feedback
app.post('/api/session/:sessionId/feedback', (req, res) => {
  const { sessionId } = req.params;
  const { isCorrect } = req.body;
  
  if (typeof isCorrect !== 'boolean') {
    return res.status(400).json({
      success: false,
      error: 'Missing required field: isCorrect'
    });
  }

  const session = sessions[sessionId];
  
  if (!session) {
    return res.status(404).json({
      success: false,
      error: 'Session not found'
    });
  }
  
  // In a production system, we would learn from this feedback
  // For now, just acknowledge the feedback
  
  res.json({
    success: true,
    data: {
      message: isCorrect ? 'Great! I guessed correctly!' : 'Thanks for the feedback. I\'ll try to do better next time.'
    }
  });
});

// Add new character
app.post('/api/character', (req, res) => {
  const { character, attributes } = req.body;
  
  // Validation
  if (!character || !character.name || !character.series) {
    return res.status(400).json({
      success: false,
      error: 'Missing required character fields: name, series'
    });
  }

  if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'attributes must be a non-empty array of attribute IDs'
    });
  }

  // Generate a new ID (in a real system, this would be handled by the database)
  const newId = inMemoryDB.characters.length + 1;
  
  // Add character to database
  const newCharacter = {
    id: newId,
    name: character.name,
    series: character.series,
    image_url: character.image_url || 'https://i.imgur.com/default.jpg'
  };
  
  inMemoryDB.characters.push(newCharacter);
  
  // Add character attributes
  attributes.forEach(attributeId => {
    inMemoryDB.character_attributes.push({
      character_id: newId,
      attribute_id: attributeId
    });
  });
  
  res.json({
    success: true,
    data: {
      character: newCharacter,
      message: 'Character added successfully'
    }
  });
});

// Get session info
app.get('/api/session/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const session = sessions[sessionId];
  
  if (!session) {
    return res.status(404).json({
      success: false,
      error: 'Session not found'
    });
  }
  
  res.json({
    success: true,
    data: {
      sessionId: session.id,
      startTime: session.startTime,
      remainingCandidates: session.candidates.length,
      questionsAsked: session.askedAttributes.length
    }
  });
});

// Get all attributes (for character creation)
app.get('/api/attributes', (req, res) => {
  res.json({
    success: true,
    data: inMemoryDB.attributes
  });
});

// Add a generic 404 handler as middleware
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      error: 'API endpoint not found'
    });
  }
  next();
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server if not being imported as a module
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;