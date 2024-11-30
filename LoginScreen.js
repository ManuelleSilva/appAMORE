import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate("Home");
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
            <Button title="Entrar" onPress={handleLogin} color="#d59ed8" />
            <Text onPress={() => navigation.navigate("Register")} style={styles.link}>
                Criar conta
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
        backgroundColor: '#ffffff', 
        borderColor: '#d59ed8', // Borda rosa claro
        color: '#000', 
    },
    link: {
        color: "#d59ed8",
        marginTop: 15,
        textAlign: "center",
        fontSize: 14,
    }
});

export default LoginScreen;
