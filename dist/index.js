import * as bigintCryptoUtils from 'bigint-crypto-utils';
export function key(encryption, decryption, prime) {
    return {
        encryption,
        decryption,
        prime,
        toString() {
            const encryption = this.encryption.toString(16);
            const decryption = this.decryption.toString(16);
            const prime = this.prime.toString(16);
            return JSON.stringify({ encryption, decryption, prime });
        },
    };
}
export function keyFromString(keyString) {
    const { encryption, decryption, prime } = JSON.parse(keyString);
    return key(BigInt('0x' + encryption), BigInt('0x' + decryption), BigInt('0x' + prime));
}
export function shamir3pass() {
    function generateKeyFromPrime(prime) {
        const primeBitsLength = (prime.toString(16).length / 2) * 8;
        const primeMinusOne = prime.valueOf() - 1n;
        while (true) {
            const bigInt = randomBigInt(primeBitsLength);
            const gcd = bigintCryptoUtils.gcd(bigInt.valueOf(), primeMinusOne.valueOf());
            if (gcd === 1n) {
                const mi = bigintCryptoUtils.modInv(bigInt.valueOf(), primeMinusOne.valueOf());
                return key(bigInt, mi, prime);
            }
        }
    }
    function randomNBitPrime(bitLength) {
        return bigintCryptoUtils.primeSync(bitLength);
    }
    function generateKey(primeBitLength) {
        return generateKeyFromPrime(randomNBitPrime(primeBitLength));
    }
    function randomBigInt(bitLength) {
        const twoToThe47th = 2n ** BigInt(bitLength - 1);
        const size = 2n ** BigInt(bitLength) - 1n - twoToThe47th;
        const random = bigintCryptoUtils.randBetween(size, 0n) + twoToThe47th;
        return random;
    }
    function encrypt(message, key) {
        return bigintCryptoUtils.modPow(message.valueOf(), key.encryption.valueOf(), key.prime.valueOf());
    }
    function decrypt(cipherText, key) {
        return bigintCryptoUtils.modPow(cipherText.valueOf(), key.decryption.valueOf(), key.prime.valueOf());
    }
    return {
        encrypt,
        decrypt,
        generateKey,
        randomNBitPrime,
        generateKeyFromPrime,
    };
}
