import { Router } from "express";
import passport from "passport";

const login = Router();

login.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            return res.status(500).json({ message: 'Internal server error.' });
        }

        if(!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        req.logIn(user, (err) => {
            if(err) {
                return res.status(500).json({ message: 'Error logging in user.' });
            }

            return res.status(200).json({ message: 'Login successful.' });
        })
    });
});

export default login;