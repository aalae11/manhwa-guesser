const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
  constructor() {
    const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../database/manhwa_akinator.db');
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error connecting to database:', err.message);
      } else {
        console.log('Connected to SQLite database');
      }
    });
  }

  // Get all characters
  async getAllCharacters() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM characters', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // Get character by ID
  async getCharacterById(id) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM characters WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  // Get all attributes
  async getAllAttributes() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM attributes ORDER BY priority DESC, id ASC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // Get character attributes
  async getCharacterAttributes(characterId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT ca.*, a.name as attribute_name, a.question
        FROM character_attributes ca
        JOIN attributes a ON ca.attribute_id = a.id
        WHERE ca.character_id = ?
      `;
      this.db.all(query, [characterId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // Get characters by attribute values
  async getCharactersByAttributes(attributeAnswers) {
    if (attributeAnswers.length === 0) {
      return this.getAllCharacters();
    }

    const placeholders = attributeAnswers.map(() => '(?, ?)').join(', ');
    const values = attributeAnswers.flatMap(answer => [answer.attributeId, answer.value]);

    const query = `
      SELECT DISTINCT c.*, 
        COUNT(CASE WHEN ca.value = ? THEN 1 END) as matches,
        COUNT(*) as total_answers
      FROM characters c
      LEFT JOIN character_attributes ca ON c.id = ca.character_id
      LEFT JOIN attributes a ON ca.attribute_id = a.id
      WHERE (ca.attribute_id, ca.value) IN (VALUES ${placeholders})
      GROUP BY c.id
      ORDER BY matches DESC, total_answers DESC
    `;

    return new Promise((resolve, reject) => {
      this.db.all(query, [attributeAnswers[0].value, ...values], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // Add new character
  async addCharacter(character) {
    const { name, manhwa_title, description, image_url } = character;
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO characters (name, manhwa_title, description, image_url) VALUES (?, ?, ?, ?)';
      this.db.run(query, [name, manhwa_title, description, image_url], function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      });
    });
  }

  // Add character attribute
  async addCharacterAttribute(characterId, attributeId, value) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT OR REPLACE INTO character_attributes (character_id, attribute_id, value) VALUES (?, ?, ?)';
      this.db.run(query, [characterId, attributeId, value], function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      });
    });
  }

  // Search characters by name
  async searchCharacters(searchTerm) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM characters 
        WHERE name LIKE ? OR manhwa_title LIKE ?
        ORDER BY name ASC
      `;
      const searchPattern = `%${searchTerm}%`;
      this.db.all(query, [searchPattern, searchPattern], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // Get unused attributes for character
  async getUnusedAttributes(characterId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM attributes
        WHERE id NOT IN (
          SELECT attribute_id FROM character_attributes WHERE character_id = ?
        )
        ORDER BY priority DESC, id ASC
      `;
      this.db.all(query, [characterId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  close() {
    this.db.close();
  }
}

module.exports = Database;