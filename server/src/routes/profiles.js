const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Get all profiles for a user
router.get('/', async (req, res, next) => {
  try {
    const userIdentifier = req.headers['x-user-identifier'] || 'default';

    const result = await db.query(
      `SELECT
        id, name, age, gender, ethnicity,
        zip_code as "zipCode",
        state,
        current_height_inches as "currentHeightInches",
        estimated_adult_height_inches as "estimatedAdultHeightInches",
        father_height_inches as "fatherHeightInches",
        mother_height_inches as "motherHeightInches",
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM profiles
      ORDER BY created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// Get a single profile by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      `SELECT
        id, name, age, gender, ethnicity,
        zip_code as "zipCode",
        state,
        current_height_inches as "currentHeightInches",
        estimated_adult_height_inches as "estimatedAdultHeightInches",
        father_height_inches as "fatherHeightInches",
        mother_height_inches as "motherHeightInches",
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM profiles
      WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Create a new profile
router.post('/', async (req, res, next) => {
  try {
    const {
      id = uuidv4(),
      name,
      age,
      gender,
      ethnicity,
      zipCode,
      state,
      currentHeightInches,
      estimatedAdultHeightInches,
      parentHeights
    } = req.body;

    // Validation
    if (!name || !age || !gender || !zipCode || !state || !currentHeightInches) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await db.query(
      `INSERT INTO profiles (
        id, name, age, gender, ethnicity, zip_code, state,
        current_height_inches, estimated_adult_height_inches,
        father_height_inches, mother_height_inches
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING
        id, name, age, gender, ethnicity,
        zip_code as "zipCode",
        state,
        current_height_inches as "currentHeightInches",
        estimated_adult_height_inches as "estimatedAdultHeightInches",
        father_height_inches as "fatherHeightInches",
        mother_height_inches as "motherHeightInches"`,
      [
        id,
        name,
        age,
        gender,
        ethnicity || null,
        zipCode,
        state,
        currentHeightInches,
        estimatedAdultHeightInches || null,
        parentHeights?.fatherInches || null,
        parentHeights?.motherInches || null
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Profile with this ID already exists' });
    }
    next(error);
  }
});

// Update a profile
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      age,
      gender,
      ethnicity,
      zipCode,
      state,
      currentHeightInches,
      estimatedAdultHeightInches,
      parentHeights
    } = req.body;

    const result = await db.query(
      `UPDATE profiles SET
        name = COALESCE($1, name),
        age = COALESCE($2, age),
        gender = COALESCE($3, gender),
        ethnicity = $4,
        zip_code = COALESCE($5, zip_code),
        state = COALESCE($6, state),
        current_height_inches = COALESCE($7, current_height_inches),
        estimated_adult_height_inches = $8,
        father_height_inches = $9,
        mother_height_inches = $10
      WHERE id = $11
      RETURNING
        id, name, age, gender, ethnicity,
        zip_code as "zipCode",
        state,
        current_height_inches as "currentHeightInches",
        estimated_adult_height_inches as "estimatedAdultHeightInches",
        father_height_inches as "fatherHeightInches",
        mother_height_inches as "motherHeightInches"`,
      [
        name,
        age,
        gender,
        ethnicity || null,
        zipCode,
        state,
        currentHeightInches,
        estimatedAdultHeightInches || null,
        parentHeights?.fatherInches || null,
        parentHeights?.motherInches || null,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Delete a profile
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      'DELETE FROM profiles WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ message: 'Profile deleted', id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
