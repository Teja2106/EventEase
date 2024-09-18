import { Router } from 'express';

const authCheck = Router();

authCheck.get('/auth/check', (req, res) => {
    if(req.isAuthenticated()) {
        return res.json({ authenticated: true, user_id: req.user.user_id });
    } else {
        return res.status(401).json({ authenticated: false });
    }
});

export default authCheck;