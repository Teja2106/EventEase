import bcrypt from 'bcrypt';

const hashedPassword = async (plainPassword) => {
    try {
        const saltRounds = 13;
        const salt = await bcrypt.genSalt(saltRounds);

        const finalPassword = await bcrypt.hash(plainPassword, salt);
        return finalPassword;
    } catch(error) {
        console.error('Error hashing password: ', error);
    }
}

export default hashedPassword;