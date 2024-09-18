import { Router } from 'express';

const index = Router();

index.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

export default index;