import bcrypt, { hash } from 'bcrypt';

const hashedPassword = async (plainPassword) => {
    try {
        const saltRounds = 13;
        const hashPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashPassword;
    } catch(err) {
        console.log('Error hashing password: ', err);
    }
}

export default hashedPassword;