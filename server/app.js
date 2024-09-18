import express from 'express';
import pool from './db/db.js';
import index from './routes/index.js';
import signup from './routes/signup.js';
import login from './routes/login.js';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import authCheck from './middleware/authCheck.js';

const app = express();
const port = process.env.PORT;

const pgStore = connectPgSimple(session);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: new pgStore({
        pool: pool,
        tableName: 'session',
    }),
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 5,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async function (username, password, done) {
    try {
        const result = await pool.query('SELECT username, user_pwd FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return done(null, false, { message: 'User Not found.' });
        }

        const user = result.rows[0];
        const validatePassword = await bcrypt.compare(password, user.user_pwd);
        if (!validatePassword) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user)
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
        if(result.rows.length > 0) {
            done(null, result.rows[0]);
        } else {
            done(new Error('User not found.'), null);
        }
    } catch(error) {
        done(error, null);
    }
})

pool.connect();

app.use(index);
app.use(login);
app.use(signup);
app.use(authCheck);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});