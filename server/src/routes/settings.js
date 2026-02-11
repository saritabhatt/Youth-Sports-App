const express = require('express');
const router = express.Router();
const db = require('../db');

// Helper to get or create user settings
const getOrCreateSettings = async (userIdentifier) => {
  let result = await db.query(
    'SELECT * FROM user_settings WHERE user_identifier = $1',
    [userIdentifier]
  );

  if (result.rows.length === 0) {
    result = await db.query(
      `INSERT INTO user_settings (user_identifier)
       VALUES ($1)
       RETURNING *`,
      [userIdentifier]
    );
  }

  return result.rows[0];
};

// Get all settings for a user
router.get('/', async (req, res, next) => {
  try {
    const userIdentifier = req.headers['x-user-identifier'] || 'default';
    const settings = await getOrCreateSettings(userIdentifier);

    res.json({
      activeProfileId: settings.active_profile_id,
      weights: settings.weights,
      compareList: settings.compare_list || []
    });
  } catch (error) {
    next(error);
  }
});

// Update active profile
router.put('/active-profile', async (req, res, next) => {
  try {
    const userIdentifier = req.headers['x-user-identifier'] || 'default';
    const { profileId } = req.body;

    await getOrCreateSettings(userIdentifier);

    const result = await db.query(
      `UPDATE user_settings
       SET active_profile_id = $1
       WHERE user_identifier = $2
       RETURNING active_profile_id as "activeProfileId"`,
      [profileId || null, userIdentifier]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Update weights
router.put('/weights', async (req, res, next) => {
  try {
    const userIdentifier = req.headers['x-user-identifier'] || 'default';
    const { weights } = req.body;

    if (!weights) {
      return res.status(400).json({ error: 'Weights are required' });
    }

    await getOrCreateSettings(userIdentifier);

    const result = await db.query(
      `UPDATE user_settings
       SET weights = $1
       WHERE user_identifier = $2
       RETURNING weights`,
      [JSON.stringify(weights), userIdentifier]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Get compare list
router.get('/compare', async (req, res, next) => {
  try {
    const userIdentifier = req.headers['x-user-identifier'] || 'default';
    const settings = await getOrCreateSettings(userIdentifier);

    res.json({ compareList: settings.compare_list || [] });
  } catch (error) {
    next(error);
  }
});

// Update compare list
router.put('/compare', async (req, res, next) => {
  try {
    const userIdentifier = req.headers['x-user-identifier'] || 'default';
    const { compareList } = req.body;

    if (!Array.isArray(compareList)) {
      return res.status(400).json({ error: 'compareList must be an array' });
    }

    await getOrCreateSettings(userIdentifier);

    const result = await db.query(
      `UPDATE user_settings
       SET compare_list = $1
       WHERE user_identifier = $2
       RETURNING compare_list as "compareList"`,
      [compareList, userIdentifier]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Add to compare list
router.post('/compare/:sportId', async (req, res, next) => {
  try {
    const userIdentifier = req.headers['x-user-identifier'] || 'default';
    const { sportId } = req.params;

    await getOrCreateSettings(userIdentifier);

    const result = await db.query(
      `UPDATE user_settings
       SET compare_list = array_append(
         array_remove(compare_list, $1),
         $1
       )
       WHERE user_identifier = $2
       AND array_length(compare_list, 1) < 4 OR compare_list IS NULL
       RETURNING compare_list as "compareList"`,
      [sportId, userIdentifier]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Compare list is full (max 4)' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Remove from compare list
router.delete('/compare/:sportId', async (req, res, next) => {
  try {
    const userIdentifier = req.headers['x-user-identifier'] || 'default';
    const { sportId } = req.params;

    await getOrCreateSettings(userIdentifier);

    const result = await db.query(
      `UPDATE user_settings
       SET compare_list = array_remove(compare_list, $1)
       WHERE user_identifier = $2
       RETURNING compare_list as "compareList"`,
      [sportId, userIdentifier]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Clear compare list
router.delete('/compare', async (req, res, next) => {
  try {
    const userIdentifier = req.headers['x-user-identifier'] || 'default';

    await getOrCreateSettings(userIdentifier);

    const result = await db.query(
      `UPDATE user_settings
       SET compare_list = '{}'
       WHERE user_identifier = $1
       RETURNING compare_list as "compareList"`,
      [userIdentifier]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
