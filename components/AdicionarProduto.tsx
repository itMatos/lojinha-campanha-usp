import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'react-native';
import { Appbar, FAB, Portal, Button, TextInput } from 'react-native-paper';
import { Dimensions } from 'react-native';

const vw = Dimensions.get('window').width / 100;

export default function AdicionarProduto() {
    const [produtoNome, setProdutoNome] = useState('');
    const [produtoDescricao, setProdutoDescricao] = useState('');
    const [produtoPreco, setProdutoPreco] = useState('');

    const handlePrecoChange = (text: string) => {
        let cleanedText = text.replace(/[^0-9,.]/g, '');

        // Replace commas with dots
        cleanedText = cleanedText.replace(',', '.');

        // Convert to number, fix to two decimal places, then back to string
        let formattedPreco = parseFloat(cleanedText).toFixed(2);

        // Format with commas for thousands
        const parts = formattedPreco.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        formattedPreco = parts.join(',');

        setProdutoPreco(formattedPreco);
    };

    const handleAdicionarProduto = () => {
        console.log('Adicionar produto');
    };

    return (
        <KeyboardAvoidingView>
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
                            placeholder="Caneca"
                            style={{ margin: 10 }}
                            mode="outlined"
                        />
                        <TextInput
                            label="Descrição"
                            value={produtoDescricao}
                            onChangeText={(text) => setProdutoDescricao(text)}
                            placeholder="1 Caneca 300ml"
                            style={{ margin: 10 }}
                            mode="outlined"
                        />
                        <TextInput
                            label="Preço"
                            value={produtoPreco}
                            onChangeText={(text) => handlePrecoChange(text)}
                            keyboardType="numeric"
                            placeholder="0,00" // Initial placeholder format
                            style={{ margin: 10 }}
                            mode="outlined"
                        />
                    </View>

                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonAction}>
                            <Button mode="contained" onPress={() => console.log('Pressed')} disabled>
                                Adicionar
                            </Button>
                        </View>
                        <View style={styles.buttonAction}>
                            <Button mode="outlined" onPress={() => console.log('Pressed')}>
                                Cancelar
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonAction: {
        margin: 10,
        width: 40 * vw,
    },
});
