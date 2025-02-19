const pool = require("../config/database");

const createTables = async () => {
    try {
        console.log("🚀 Running database migration...");

        await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          password TEXT NOT NULL
      );
    `);
        console.log("✅ Users table created!");

        await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          is_complete BOOLEAN DEFAULT FALSE,
          user_id INT REFERENCES users(id) ON DELETE CASCADE
      );
    `);
        console.log("✅ Tasks table created!");

        console.log("🎉 Migration completed successfully!");
    } catch (error) {
        console.error("❌ Error creating tables:", error.message);
    } finally {
        if (pool.end) {
            await pool.end();
            console.log("🔌 Database connection closed.");
        }
    }
};

createTables();
