import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const AddRecordScreen = ({ navigation }) => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [preco, setPreco] = useState("");

    const handleAddRecord = async () => {
        try {
            await addDoc(collection(db, "records"), {
                nome,
                descricao,
                categoria,
                preco: parseFloat(preco),
                createdAt: serverTimestamp(),
            });
            alert("Registro adicionado com sucesso!");
            navigation.goBack(); 
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
            />
            <TextInput
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                style={styles.input}
            />
            <TextInput
                placeholder="Categoria"
                value={categoria}
                onChangeText={setCategoria}
                style={styles.input}
            />
            <TextInput
                placeholder="Preço"
                value={preco}
                keyboardType="numeric"
                onChangeText={setPreco}
                style={styles.input}
            />
            <Button title="Salvar" onPress={handleAddRecord} color="#d59ed8" />
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
        borderColor: '#d59ed8', // Borda rosa claro
        color: '#000',
    },
    btns: {
        color: '#d59ed8'
    }
});

export default AddRecordScreen;
