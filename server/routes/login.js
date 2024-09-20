import { Router } from "express";
import passport from "passport";

const login = Router();

login.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            return res.status(500).json({ error: 'Internal server error.' });
        }

        if(!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        req.logIn(user, (err) => {
            if(err) {
                return res.status(500).json({ error: 'Error logging in user.' });
            }
            return res.status(200).json({ success: 'Login successful.' });
        })
    })(req, res, next);
});

export default login;