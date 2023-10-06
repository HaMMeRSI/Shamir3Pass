export declare function key(encryption: bigint, decryption: bigint, prime: bigint): {
    encryption: bigint;
    decryption: bigint;
    prime: bigint;
    toString(): string;
};
export type Key = ReturnType<typeof key>;
export declare function keyFromString(keyString: string): {
    encryption: bigint;
    decryption: bigint;
    prime: bigint;
    toString(): string;
};
export declare function shamir3pass(): {
    encrypt: (message: bigint, key: Key) => bigint;
    decrypt: (cipherText: bigint, key: Key) => bigint;
    generateKey: (primeBitLength: number) => {
        encryption: bigint;
        decryption: bigint;
        prime: bigint;
        toString(): string;
    };
    randomNBitPrime: (bitLength: number) => bigint;
    generateKeyFromPrime: (prime: bigint) => {
        encryption: bigint;
        decryption: bigint;
        prime: bigint;
        toString(): string;
    };
};
