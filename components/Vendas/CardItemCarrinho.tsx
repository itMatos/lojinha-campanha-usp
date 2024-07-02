import React from 'react';
import { View } from 'react-native';
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
            <Card elevation={1}>
                {/* <Card.Cover source={{ uri: 'https://i.postimg.cc/7ZdzqFMv/undraw-dev-productivity-umsq.png' }} /> */}
                <Card.Content>
                    <Text variant="titleLarge">{produto.nome}</Text>
                    <Text variant="bodyMedium">Quantidade: {produto.quantidade}</Text>
                    <Text variant="bodyMedium">Subtotal: {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                </Card.Content>

                <Card.Actions>
                    <View>
                        <Button
                            mode="contained"
                            onPress={() => {
                                onAddToCart(produto.nome);
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
