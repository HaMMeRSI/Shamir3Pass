export declare class Key {
    readonly encryption: BigInt;
    readonly decryption: BigInt;
    readonly prime: BigInt;
    constructor(encryption: BigInt, decryption: BigInt, prime: BigInt);
    toString(): string;
}
export declare function shamir3pass(): {
    encrypt: (message: BigInt, key: Key) => bigint;
    decrypt: (cipherText: BigInt, key: Key) => bigint;
    generateKey: (primeBitLength: number) => Key;
    randomNBitPrime: (bitLength: number) => bigint;
    generateKeyFromPrime: (prime: BigInt) => Key;
};
