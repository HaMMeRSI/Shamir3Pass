# Shamir three-pass protocol
Implementation of the Shamir three pass protocol encryption function in TypeScript.

A rewrite in TS from this [Repo](https://github.com/sorribas/shamir3pass)

DISCLAIMER: This package has not been thoroughly tested.

The Shamir three-pass protocol encryption function is commutative, which means that if two or more keys are generated based on the same large prime number, encryption, and decryption can be done in any order for the different keys. This means that an exchange like the following one is possible.

[Three-pass protocol Wiki](https://en.wikipedia.org/wiki/Three-pass_protocol)
