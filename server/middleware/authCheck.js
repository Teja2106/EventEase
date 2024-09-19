import { Router } from 'express';

const authCheck = Router();

authCheck.get('/auth/check', (req, res) => {
    if(req.isAuthenticated()) {
        return res.json({ authenticated: true, user_id: req.user.user_id }); //add req.user.full_name req.user.username req.user.college_name req.user.email req.user.user_pwd
    } else {
        return res.status(401).json({ authenticated: false });
    }
});

export default authCheck;