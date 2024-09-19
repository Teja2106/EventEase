import pkg from 'pg';

const {Pool} = pkg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT,
});

pool.on('connect', () => {
    console.log('Connected to the database.');
});

export default pool;