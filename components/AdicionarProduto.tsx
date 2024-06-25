import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, FAB, Portal, Button, TextInput, Text } from 'react-native-paper';
import { Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from './ImageViewer';

const vw = Dimensions.get('window').width / 100;
const PlaceholderImage = {uri: './assets/images/icon.png' };

export default function AdicionarProduto() {
    const [produtoNome, setProdutoNome] = useState('');
    const [produtoDescricao, setProdutoDescricao] = useState('');
    const [produtoPreco, setProdutoPreco] = useState('0,00');
    const [selectedImage, setSelectedImage] = useState<string>('');

    const handlePrecoChange = (text: string) => {
        text = text.replace('.', '').replace(',', '').replace(/\D/g, '');

        const options = { minimumFractionDigits: 2 };
        const result = new Intl.NumberFormat('pt-BR', options).format(parseFloat(text) / 100);

        result ? setProdutoPreco(result) : setProdutoPreco('0,00');
    };

    const handleAdicionarProduto = () => {
        // adicionar endpoint para adicionar produto
        console.log('Adicionar produto');
        console.log("Nome: " + produtoNome);
        console.log("Descrição: " + produtoDescricao);
        console.log("Preço: " + produtoPreco);        
    };

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };

    return (
            <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.container}>
                    <Appbar.Header style={styles.appBar} mode="center-aligned">
                        <Appbar.Content title="Adicionar produto" />
                    </Appbar.Header>

                    <View style={styles.formContainer}>
                        <TextInput
                            label="Nome"
                            value={produtoNome}
                            onChangeText={(text) => setProdutoNome(text)}
                            style={{ margin: 10 }}
                            mode="outlined"
                        />
                        <TextInput
                            label="Descrição"
                            value={produtoDescricao}
                            onChangeText={(text) => setProdutoDescricao(text)}
                            style={{ margin: 10 }}
                            mode="outlined"
                        />
                        <TextInput
                            label="Preço"
                            value={produtoPreco}
                            onChangeText={(text) => handlePrecoChange(text)}
                            keyboardType="numeric"
                            style={{ margin: 10 }}
                            mode="outlined"
                        />
                    </View>
                    <View style={styles.container}>
                        <Button onPress={pickImageAsync}>Choose a photo</Button>
                        <View style={styles.imageContainer}>
                            <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonAction}>
                        <Button mode="contained" onPress={() => handleAdicionarProduto} disabled>
                            Adicionar
                        </Button>
                    </View>
                    <View style={styles.buttonAction} >
                        <Button mode="outlined" onPress={() => console.log("cancelar")}>
                            Cancelar
                        </Button>
                    </View>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: '100%',
    },
    formContainer: {
        padding: 20,
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white',
    },
    appBar: {
        backgroundColor: 'white',
        margin: 20,
    },
    buttonsContainer: {
        alignItems: 'center',
        // position: 'absolute',
        // bottom: 0,
        width: '100%',
    },
    buttonAction: {
        margin: 10,
        width: 40 * vw,
    },
    imageContainer: {
        borderRadius: 2,
        marginBottom: 16,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    footerContainer: {
        alignItems: 'center',
    },
});
