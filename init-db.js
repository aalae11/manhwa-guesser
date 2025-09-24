const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'manhwa_akinator.db');
const schemaPath = path.join(__dirname, 'schema.sql');

// Remove existing database
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('Removed existing database');
}

// Create new database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error creating database:', err.message);
    return;
  }
  console.log('Connected to SQLite database');
});

// Read and execute schema
const schema = fs.readFileSync(schemaPath, 'utf8');
const statements = schema.split(';').filter(stmt => stmt.trim());

// Execute each statement
const executeStatements = async () => {
  for (const statement of statements) {
    if (statement.trim()) {
      await new Promise((resolve, reject) => {
        db.run(statement, (err) => {
          if (err) {
            console.error('Error executing statement:', err.message);
            console.error('Statement:', statement.substring(0, 100) + '...');
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  }
};

executeStatements()
  .then(() => {
    console.log('Database initialized successfully');
    console.log(`Database created at: ${dbPath}`);
    
    // Verify data
    db.all('SELECT COUNT(*) as count FROM characters', (err, rows) => {
      if (!err) {
        console.log(`Characters loaded: ${rows[0].count}`);
      }
    });
    
    db.all('SELECT COUNT(*) as count FROM attributes', (err, rows) => {
      if (!err) {
        console.log(`Attributes loaded: ${rows[0].count}`);
      }
    });
    
    db.close();
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    db.close();
    process.exit(1);
  });