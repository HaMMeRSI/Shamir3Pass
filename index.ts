import * as bigintCryptoUtils from 'bigint-crypto-utils';

export class Key {
    constructor(
        readonly encryption: BigInt,
        readonly decryption: BigInt,
        readonly prime: BigInt
    ) {}

    toString() {
        return `encryption=${this.encryption}\ndecryption=${this.decryption}\nPrime=${this.prime}`;
    }
}

export function shamir3pass() {
    function generateKeyFromPrime(prime: BigInt) {
        const primeBitsLength = (prime.toString(16).length / 2) * 8;
        const primeMinusOne: BigInt = prime.valueOf() - 1n;

        while (true) {
            const bigInt = randomBigInt(primeBitsLength);
            const gcd = bigintCryptoUtils.gcd(bigInt.valueOf(), primeMinusOne.valueOf());

            if (gcd === 1n) {
                const mi = bigintCryptoUtils.modInv(bigInt.valueOf(), primeMinusOne.valueOf());
                return new Key(bigInt, mi, prime);
            }
        }
    }

    function randomNBitPrime(bitLength: number) {
        return bigintCryptoUtils.primeSync(bitLength);
    }

    function generateKey(primeBitLength: number) {
        return generateKeyFromPrime(randomNBitPrime(primeBitLength));
    }

    function randomBigInt(bitLength: number) {
        const twoToThe47th = 2n ** BigInt(bitLength - 1);
        const size = 2n ** BigInt(bitLength) - 1n - twoToThe47th;
        const random = bigintCryptoUtils.randBetween(size, 0n) + twoToThe47th;

        return random;
    }

    function encrypt(message: BigInt, key: Key) {
        return bigintCryptoUtils.modPow(message.valueOf(), key.encryption.valueOf(), key.prime.valueOf());
    }

    function decrypt(cipherText: BigInt, key: Key) {
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
