import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Usuário registrado com sucesso!");
            navigation.navigate("Login");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Registrar" onPress={handleRegister} color="#d59ed8" />
            <Text onPress={() => navigation.navigate("Login")} style={styles.link}>
                Já tem uma conta? Faça login.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: "center", 
        padding: 20,
        backgroundColor: '#f8f3e8', // Creme para o fundo
    },
    input: { 
        borderWidth: 1, 
        padding: 10, 
        marginBottom: 10, 
        borderRadius: 5,
        backgroundColor: '#ffffff', // Fundo branco para os campos de input
        borderColor: '#d59ed8',
        color: '#000', 
    },
    link: {
        color: "#d59ed8", 
        marginTop: 15,
        textAlign: "center",
        fontSize: 14,
    }
});

export default RegisterScreen;
