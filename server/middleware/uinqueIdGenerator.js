import crypto from 'crypto';

const uniqueIdGenerator = (text) => {
    const hash = crypto.createHash('sha256');
    hash.update(text);

    const fullHash = hash.digest('hex');

    return fullHash.substring(0, 6);
}

export default uniqueIdGenerator;