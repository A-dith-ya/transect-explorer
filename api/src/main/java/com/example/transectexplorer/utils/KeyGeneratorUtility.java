package com.example.transectexplorer.utils;

import java.security.KeyPair;
import java.security.KeyPairGenerator;

public class KeyGeneratorUtility {

    public static KeyPair generateRsaKey() {
        KeyPair keyPair;

        try {
            // Get an instance of KeyPairGenerator for RSA.
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            // Initialize the KeyPairGenerator to create key pairs of 2048 bits.
            keyPairGenerator.initialize(2048);
            // Generate the key pair.
            keyPair = keyPairGenerator.generateKeyPair();
        } catch (Exception e) {
            // If key pair generation fails, throw an IllegalStateException.
            throw new IllegalStateException();
        }

        return keyPair;
    }
}
