import React, { useEffect, useState } from "react"; 
import { View, FlatList, Text, Button, StyleSheet } from "react-native";
import { db } from "./firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
    const [records, setRecords] = useState([]);

    const fetchRecords = async () => {
        const querySnapshot = await getDocs(collection(db, "records"));
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setRecords(data);
    };

    useEffect(() => {
        fetchRecords(); 

        const unsubscribe = navigation.addListener('focus', () => {
            fetchRecords(); 
        });

        // Cleanup listener
        return unsubscribe;
    }, [navigation]);

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "records", id));
        setRecords(records.filter((item) => item.id !== id));
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={records}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.record}>
                        <Text style={styles.text}>Nome: {item.nome}</Text>
                        <Text style={styles.text}>Descrição: {item.descricao}</Text>
                        <Text style={styles.text}>Categoria: {item.categoria}</Text>
                        <Text style={styles.text}>Preço: R$ {item.preco}</Text>
                        <Text style={styles.text}>Data: {new Date(item.createdAt.seconds * 1000).toLocaleDateString('pt-BR')}</Text>
                        <Button 
                            title="Editar"
                            onPress={() => navigation.navigate("Edit", { id: item.id })}
                            color="#d59ed8" 
                        />
                        <Button 
                            title="Excluir" 
                            onPress={() => handleDelete(item.id)} 
                            color="#d59ed8" 
                        />
                    </View>
                )}
            />
            <Button 
                title="Adicionar Registro" 
                onPress={() => navigation.navigate("Add", { fetchRecords })}
                color="#d59ed8" 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20,
        backgroundColor: '#f8f3e8', // Creme para o fundo
    },
    record: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        marginBottom: 10,
        backgroundColor: '#ffffff', // Fundo branco para cada registro
        borderRadius: 8,
    },
    text: {
        fontSize: 16,
        color: '#000',
    },
    btns: {
        color: '#d59ed8',
    }
});

export default HomeScreen;
