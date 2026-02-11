require('dotenv').config();
const { pool } = require('./index');

const initDatabase = async () => {
  const client = await pool.connect();

  try {
    console.log('Initializing database...');

    // Create profiles table
    await client.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        age INTEGER NOT NULL CHECK (age >= 3 AND age <= 18),
        gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female')),
        ethnicity VARCHAR(50),
        zip_code VARCHAR(10) NOT NULL,
        state VARCHAR(2) NOT NULL,
        current_height_inches INTEGER NOT NULL,
        estimated_adult_height_inches INTEGER,
        father_height_inches INTEGER,
        mother_height_inches INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Created profiles table');

    // Create user_settings table (for weights and preferences)
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_settings (
        id SERIAL PRIMARY KEY,
        user_identifier VARCHAR(255) UNIQUE NOT NULL,
        active_profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
        weights JSONB DEFAULT '{"funFactor": 50, "skillFocus": 50, "competition": 50, "opportunity": 50, "accessibility": 50}',
        compare_list TEXT[] DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Created user_settings table');

    // Create updated_at trigger function
    await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Create triggers for updated_at
    await client.query(`
      DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
      CREATE TRIGGER update_profiles_updated_at
        BEFORE UPDATE ON profiles
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);

    await client.query(`
      DROP TRIGGER IF EXISTS update_user_settings_updated_at ON user_settings;
      CREATE TRIGGER update_user_settings_updated_at
        BEFORE UPDATE ON user_settings
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);

    console.log('Created triggers');
    console.log('Database initialization complete!');

  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
};

initDatabase().catch(console.error);
