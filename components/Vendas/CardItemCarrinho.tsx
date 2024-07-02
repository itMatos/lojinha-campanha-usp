import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Menu, Text, TextInput } from 'react-native-paper';

import { ProdutoVendaType, ProdutosType } from '@/types/types';
import DropDown from 'react-native-paper-dropdown';

interface CardItemCarrinhoProps {
    produto: ProdutoVendaType;
    onUpdateUnid: (itemNome: string, quantidade: number) => void;
}

export default function CardItemCarrinho({ produto, onUpdateUnid }: CardItemCarrinhoProps) {
    const subtotal = produto.preco * produto.quantidade;

    const [selectedUnid, setSelectedUnid] = useState(produto.quantidade);
    const [showMenu, setShowMenu] = useState(false);
    const [subtotalProduto, setSubtotalProduto] = useState(subtotal);

    const qtdMaximaProdutos = (maxValue: number) => {
        return Array.from({ length: maxValue }, (_, index) => index + 1);
    };

    const handleSelectedUnid = (qtd: number) => {
        setSelectedUnid(qtd);
        setShowMenu(false);
        setSubtotalProduto(produto.preco * qtd);
        onUpdateUnid(produto.nome, qtd);
    };

    return (
        <View>
            <Card elevation={1} style={{ margin: 10 }}>
                {/* <Card.Cover source={{ uri: 'https://i.postimg.cc/7ZdzqFMv/undraw-dev-productivity-umsq.png' }} /> */}
                <Card.Content>
                    <Text variant="titleLarge">{produto.nome}</Text>
                    <Text variant="bodyMedium">
                        Subtotal: {subtotalProduto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Text>
                </Card.Content>

                <Card.Actions>
                    <Button
                        mode="outlined"
                        onPress={() => {}}
                        style={{
                            margin: 5,
                        }}
                    >
                        Remover
                    </Button>

                    <Menu
                        visible={showMenu}
                        onDismiss={() => setShowMenu(false)}
                        anchor={
                            <Button mode="contained" onPress={() => setShowMenu(true)}>
                                {selectedUnid ? `${selectedUnid} unid.` : `${produto.quantidade} unid.`}
                            </Button>
                        }
                    >
                        {qtdMaximaProdutos(10).map((item) => (
                            <Menu.Item key={item} onPress={() => handleSelectedUnid(item)} title={`${item} unid.`} />
                        ))}
                    </Menu>
                </Card.Actions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    dropDownContainer: {
        flex: 1,
        marginLeft: 8,
    },
    dropDownStyle: {
        borderColor: '#322b7c',
        borderWidth: 0.7,
        borderRadius: 4,
        borderStyle: 'solid',
    },
    buttonWrapper: {
        flex: 1,
        alignItems: 'flex-end',
    },
});
