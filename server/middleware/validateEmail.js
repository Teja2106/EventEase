import approvedDomains from "./approvedDomains.js";

const validateEmail = async (email) => {
    if(!validator.isEmail(email)) {
        return { valid: false, message: 'Invalid email format.' };
    }

    const domain = email.split('@')[1];

    if(!approvedDomains.includes(domain)) {
        return { valid: false, message: 'Email domain not allowed.' };
    }

    return { valid: true, message: 'Email is valid.' };
}

export default validateEmail;