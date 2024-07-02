import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Menu, Text } from 'react-native-paper';

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
            <Card elevation={1} style={styles.card}>
                {/* <Card.Cover source={{ uri: 'https://i.postimg.cc/7ZdzqFMv/undraw-dev-productivity-umsq.png' }} /> */}
                <Card.Content>
                    <Text style={styles.fonteTexto} variant="titleLarge">
                        {produto.nome}
                    </Text>
                    <Text style={styles.fonteTexto} variant="bodyMedium">
                        Quantidade: {produto.quantidade}
                    </Text>
                    <Text style={styles.fonteTexto} variant="bodyMedium">
                        Subtotal: {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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
                    <View>
                        <Button
                            mode="contained"
                            buttonColor="#EC7229"
                            labelStyle={styles.fonteButtom}
                            onPress={() => {}}
                        >
                            Finalizar
                        </Button>
                    </View>
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
    card: {
        margin: 8,
        marginHorizontal: 16,
        backgroundColor: '#f6f6ff',
    },
    chip: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        verticalAlign: 'middle',
    },
    itemText: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
    },
    fonteTexto: {
        fontFamily: 'FontParaTexto',
        color: '#003D5C',
    },
    fonteButtom: {
        fontFamily: 'FontParaTexto',
        color: '#f6f6ff',
    },
});
