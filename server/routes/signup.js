import { Router } from 'express';
import pool from '../db/db.js';
import validateEmail from '../middleware/validateEmail.js';
import hashedPassword from '../middleware/hashedPassword.js';
import uniqueIdGenerator from '../middleware/uinqueIdGenerator.js';

const signup = Router();

signup.post('/auth/post', async (req, res) => {
    const { full_name, email, password } = req.body;
    const validEmail = await validateEmail(email);
    const user_pwd = await hashedPassword(password);
    const user_uuid = uniqueIdGenerator(email);
    try {
        if(validEmail.valid) {
            await pool.query('INSERT INTO users (uuid, full_name, email, user_pwd) VALUES ($1, $2, $3, $4)', [user_uuid, full_name, email, user_pwd]);
            res.status(201).json({ message: 'User added.' });
        } else {
            res.status(401).json({ message: 'Unauthorized user.' });
        }
    } catch(err) {
        res.status(500).json({ message: 'Internal Server Error.' });
        console.log('Unable to add user: ', err);
    }
});

export default signup;