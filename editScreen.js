import React, { useEffect, useState } from "react"; 
import { View, TextInput, Button, StyleSheet } from "react-native";
import { db } from "./firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [preco, setPreco] = useState("");

    useEffect(() => {
        const fetchRecord = async () => {
            const docRef = doc(db, "records", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const { nome, descricao, categoria, preco, imagemUrl } = docSnap.data();
                setNome(nome);
                setDescricao(descricao);
                setCategoria(categoria);
                setPreco(preco.toString());
            }
        };

        fetchRecord();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const docRef = doc(db, "records", id);
            await updateDoc(docRef, {
                nome,
                descricao,
                categoria,
                preco: parseFloat(preco), 
                imagemUrl
            });
            alert("Registro atualizado com sucesso!");
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
            <Button title="Salvar Alterações" onPress={handleUpdate} color="#d59ed8" />
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
        backgroundColor: '#ffffff', // Fundo branco input
        borderColor: '#d59ed8', // Borda rosa claro
        color: '#000',
    },
    btns: {
        color: '#d59ed8'
    }
});

export default EditScreen;
