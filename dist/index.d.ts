export declare function key(encryption: BigInt, decryption: BigInt, prime: BigInt): {
    encryption: BigInt;
    decryption: BigInt;
    prime: BigInt;
    toString(): string;
};
export type Key = ReturnType<typeof key>;
export declare function keyFromString(keyString: string): {
    encryption: BigInt;
    decryption: BigInt;
    prime: BigInt;
    toString(): string;
};
export declare function shamir3pass(): {
    encrypt: (message: BigInt, key: Key) => bigint;
    decrypt: (cipherText: BigInt, key: Key) => bigint;
    generateKey: (primeBitLength: number) => {
        encryption: BigInt;
        decryption: BigInt;
        prime: BigInt;
        toString(): string;
    };
    randomNBitPrime: (bitLength: number) => bigint;
    generateKeyFromPrime: (prime: BigInt) => {
        encryption: BigInt;
        decryption: BigInt;
        prime: BigInt;
        toString(): string;
    };
};
