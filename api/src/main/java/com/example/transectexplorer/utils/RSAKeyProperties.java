package com.example.transectexplorer.utils;

import java.security.KeyPair;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import org.springframework.stereotype.Component;

@Component
public class RSAKeyProperties {

    private RSAPublicKey publicKey;
    private RSAPrivateKey privateKey;

    public RSAKeyProperties() {
        // Generate an RSA key pair using the KeyGeneratorUtility.
        KeyPair pair = KeyGeneratorUtility.generateRsaKey();
        // Extract the public key from the key pair and cast it to RSAPublicKey.
        this.publicKey = (RSAPublicKey) pair.getPublic();
        // Extract the private key from the key pair and cast it to RSAPrivateKey.
        this.privateKey = (RSAPrivateKey) pair.getPrivate();
    }

    public RSAPublicKey getPublicKey() {
        return this.publicKey;
    }

    public void setPublicKey(RSAPublicKey publicKey) {
        this.publicKey = publicKey;
    }

    public RSAPrivateKey getPrivateKey() {
        return this.privateKey;
    }

    public void setPrivateKey(RSAPrivateKey privateKey) {
        this.privateKey = privateKey;
    }
}