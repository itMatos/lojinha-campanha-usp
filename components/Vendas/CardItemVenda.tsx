import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Chip, IconButton, Text } from 'react-native-paper';
import { ProdutosType } from '@/types/types';

interface CardItemVendaProps {
    produtoVenda: ProdutosType;
    // onChangeQuantity: (itemId: string, newQuantity: number) => void;
    onAddToCart: (itemId: string) => void;
}

export default function CardItemVenda({ produtoVenda, onAddToCart }: CardItemVendaProps) {
    return (
        <View>
            <Card elevation={1} style={styles.card}>
                <Card.Cover source={{ uri: 'https://i.postimg.cc/7ZdzqFMv/undraw-dev-productivity-umsq.png' }} />
                <Card.Content>
                    <Text variant="titleLarge">{produtoVenda.nome}</Text>
                    <Text variant="bodyMedium">{produtoVenda.descricao}</Text>
                    <Text variant="bodyMedium">{produtoVenda.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                </Card.Content>

                <Card.Actions>
                    <View>
                        <Button
                            mode="contained"
                            onPress={() => {
                                onAddToCart(produtoVenda.nome);
                            }}
                        >
                            Adicionar ao carrinho
                        </Button>
                    </View>
                </Card.Actions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        marginHorizontal: 40,
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
});
