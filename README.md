# Shamir three-pass protocol
Implementation of the Shamir three pass protocol encryption function in TypeScript.

A rewrite in TS from this [Repo](https://github.com/sorribas/shamir3pass)

DISCLAIMER: This package has not been thoroughly tested.

The Shamir three-pass protocol encryption function is commutative, which means that if two or more keys are generated based on the same large prime number, encryption, and decryption can be done in any order for the different keys. This means that an exchange like the following one is possible.

[Three-pass protocol Wiki](https://en.wikipedia.org/wiki/Three-pass_protocol)

# Usage
```ts
import { shamir3pass } from "shamir3pass";

function toHex(str) {
	return str.split("").map((char) => char.charCodeAt(0).toString(16));
}
function fromHex(hex) {
	return Buffer.from(hex, "hex").toString();
}

function commutativeEncryption(message: string) {
	const { encrypt, decrypt, randomNBitPrime, generateKeyFromPrime } = shamir3pass();

	const hexMessage = toHex(message);
	const biMessage = BigInt("0x" + hexMessage.join(""));

	const messageBits = hexMessage.length * 8;

	const prime = randomNBitPrime(messageBits);
	const [aliceKey, bobKey] = [generateKeyFromPrime(prime), generateKeyFromPrime(prime)];

	const aliceToBob = encrypt(biMessage, aliceKey);

	// Bob encrypts the ciphertext with his key and sends it back to Alice
	const bobToAlice = encrypt(aliceToBob, bobKey);

	// Alice decrypts the ciphertext with her key and send it to bob
	const aliceToBobDecrypted = decrypt(bobToAlice, aliceKey);

	// Bob decrypts the message with his key and recovers the original message
	const decrypted = decrypt(aliceToBobDecrypted, bobKey);

	return fromHex(decrypted.toString(16));
}

const message = commutativeEncryption("Hello World");
console.log(message);
```