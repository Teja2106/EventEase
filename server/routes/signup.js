import { Router } from 'express';
import pool from '../db/db.js';
import hashedPassword from '../middleware/hashedPassword.js';
import uniqueIdGenerator from '../middleware/uinqueIdGenerator.js';
import approvedDomains from '../middleware/approvedDomains.js';
import { body, validationResult } from 'express-validator';

const signup = Router();

const validateInputs = [
    body('full_name').trim().notEmpty().isLength({ min: 1, max: 20 }).escape(),
    body('username').trim().notEmpty().isLength({ min: 1, max: 15 }).escape(),
    body('college_name').trim().notEmpty().escape(),
    body('email').trim().notEmpty().isEmail().escape().custom((value) => {
        const domain = value.split('@')[1];
        if(!approvedDomains.includes(domain)) {
            return false;
        }
        return true;
    }),
    body('password').trim().notEmpty().escape()
]

signup.post('/auth/signup', async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { full_name, username, college_name, email, password } = req.body;
    const user_pwd = await hashedPassword(password);
    const user_id = uniqueIdGenerator(email);

    try {
        const { rowCount } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if(rowCount > 0) {
            return res.status(409).json({ error: 'Email already in use.' });
        }

        await pool.query('INSERT INTO users (user_id, full_name, username, college_name, email, user_pwd) VALUES ($1, $2, $3, $4, $5, $6)', [user_id, full_name, username, college_name, email, user_pwd]);
        res.status(201).json({ message: 'User added successfully.' });
    } catch(err) {
        res.status(500).json({ message: 'Internal Server Error.' });
        console.log('Unable to add user: ', err);
    }
});

export default signup;