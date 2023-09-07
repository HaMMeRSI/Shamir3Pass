import * as bigintCryptoUtils from 'bigint-crypto-utils';
export class Key {
    constructor(encryption, decryption, prime) {
        Object.defineProperty(this, "encryption", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: encryption
        });
        Object.defineProperty(this, "decryption", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: decryption
        });
        Object.defineProperty(this, "prime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: prime
        });
    }
    toString() {
        return `encryption=${this.encryption}\ndecryption=${this.decryption}\nPrime=${this.prime}`;
    }
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
                return new Key(bigInt, mi, prime);
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