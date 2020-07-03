import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import { ListItem, Icon, Overlay, Input, Button } from 'react-native-elements';
import { database } from '../configs/firebase';


const TodoScreen = ({ navigation, route }) => {
    const {current, next} = route.params;
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [visible, setVisible] = useState(false);
    const table = 'task';
    


    const toggleOverlay = () => {
        setVisible(!visible);
        setTitle();
      };

    const addItem = async () => {
       try {
        database. collection(table).add({
            title: title,
            status: current
        });

        setVisible(false);

       } catch (error) {
         alert(error.message);
           
       }
    }

    const removeItem = async (id) => {
        try {
         database. collection(table).doc(id).delete();
        } catch (error) {
          alert(error.message);
            
        }
     }

     const updateItem = async (id) => {
        try {
         database. collection(table).doc(id).update({
             status: next
         })
        } catch (error) {
          alert(error.message);
            
        }
     }

    useEffect(() => {
        database
         .collection(table)
         .where('status', '==', current)
         .onSnapshot((query) => {
            const items = [];
            query.forEach((doc) => {
                items.push({ ...doc.data(), id: doc.id });
            });
            setData(items);
        });
    }, []);
    
    const renderItem = ({ item }) => (
    <ListItem bottomDivider
     title={item.title} 
     rightElement={
     <View style={{ flexDirection: 'row'}}>
       <Icon color="red" reverse name="delete" size={18} onPress={() => removeItem(item.id)} />
       
       {next && (
       <Icon color="green" reverse name="arrow-forward" size={18} onPress={() => updateItem(item.id)} />  
       )}
    </View>} 
    />
    );
    return (
        <View style={StyleSheet.container}>
            <FlatList data={data} renderItem={renderItem} />
            <Icon onPress={toggleOverlay} name="add" color="#f05" reverse containerStyle={styles.fab} />
           
            <Overlay overlayStyle={styles.overlayStyle} isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.title}>Cadastrar a tarefa</Text>
        <Input value={title} onChangeText={setTitle} placeholder="Escreva sua tarefa" />
        <Button title="Adicionar" onPress={addItem}></Button>
        </Overlay>
        </View>
    );
};

export default TodoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        right: 20,
        marginTop: 600,
    },
    overlayStyle : {
        width: 300
    },
    title : {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: "bold"
    }
});