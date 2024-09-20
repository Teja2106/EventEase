import { Router } from "express";
import pool from "../db/db.js";
import { check, validationResult } from "express-validator";

const checkUsername = Router();

const validateUsername = [
    check('username').trim().notEmpty().escape()
]

checkUsername.get('/check/:username', validateUsername, async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { username } = req.params;

    try {
        const result = await pool.query('SELECT COUNT(*) FROM users WHERE username = $1', [username]);
        const itExists = result.rows[0].count > 0;
        res.status(200).json({ exists: itExists });
    } catch(err) {
        console.log('Error querying the database: ', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

export default checkUsername;