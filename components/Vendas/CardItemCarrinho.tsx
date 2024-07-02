import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import { ProdutoVendaType, ProdutosType } from '@/types/types';

interface CardItemCarrinhoProps {
    produto: ProdutoVendaType;
    onAddToCart: (itemId: string) => void;
}

export default function CardItemCarrinho({ produto, onAddToCart }: CardItemCarrinhoProps) {
    const subtotal = produto.preco * produto.quantidade;

    return (
        <View>
            <Card elevation={1} style={styles.card}>
                {/* <Card.Cover source={{ uri: 'https://i.postimg.cc/7ZdzqFMv/undraw-dev-productivity-umsq.png' }} /> */}
                <Card.Content>
                    <Text style={styles.fonteTexto} variant="titleLarge">{produto.nome}</Text>
                    <Text style={styles.fonteTexto} variant="bodyMedium">Quantidade: {produto.quantidade}</Text>
                    <Text style={styles.fonteTexto} variant="bodyMedium">Subtotal: {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                </Card.Content>

                <Card.Actions>
                    <View>
                        <Button
                            mode="contained"
                            buttonColor='#EC7229'
                            labelStyle={styles.fonteButtom}
                            onPress={() => {
                                onAddToCart(produto.nome);
                            }}
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
    card: {
        margin: 8,
        marginHorizontal: 16,
        backgroundColor: "#f6f6ff",
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
        color: '#003D5C'
    },
    fonteButtom: {
        fontFamily: 'FontParaTexto',
        color: '#f6f6ff'
    },
});