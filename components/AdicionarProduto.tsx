import React, { useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'react-native';
import { Appbar, FAB, Portal, Text, PaperProvider, Button, Modal, TextInput } from 'react-native-paper';

export default function AdicionarProduto() {
    const [produtoNome, setProdutoNome] = useState('');
    const [produtoDescricao, setProdutoDescricao] = useState('');

    return (
        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <TextInput
                    label="Nome"
                    value={produtoNome}
                    onChangeText={(text) => setProdutoNome(text)}
                    placeholder="Caneca"
                    style={{ width: 150, margin: 10 }}
                    autoFocus
                />
                <TextInput
                    label="Descrição"
                    value={produtoDescricao}
                    onChangeText={(text) => setProdutoDescricao(text)}
                    placeholder="1 Caneca 300ml"
                    style={{ width: 150, margin: 10 }}
                />
            </View>
        </View>
    );
}
