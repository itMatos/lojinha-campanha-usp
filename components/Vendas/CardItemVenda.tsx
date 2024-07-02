import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Chip, IconButton, Text } from 'react-native-paper';
import { ProdutosType } from '@/types/types';

interface ItemType {
    id: number;
    produto: {
        id: number;
        nome: string;
        descricao: string;
        preco: number;
    };
    quantidade: number;
    valorTotal: number;
}

interface CardItemVendaProps {
    produtoVenda: ProdutosType;
    // onChangeQuantity: (itemId: string, newQuantity: number) => void;
}

export default function CardItemVenda({ produtoVenda }: CardItemVendaProps) {
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
                        {/* <Chip mode="flat" disabled style={styles.chip}>
                            <IconButton
                                icon="minus-circle"
                                iconColor={'blue'}
                                size={30}
                                disabled={produtoVenda.quantidade === 1}
                                onPress={handleSubtractQuantidade}
                            />
                            <View>
                                <Text variant="titleMedium" style={styles.itemText}>
                                    {itemVenda.quantidade}
                                </Text>
                            </View>
                            <IconButton icon="plus-circle" iconColor={'blue'} size={30} onPress={handleAddQuantidade} />
                        </Chip> */}
                        <Button mode="contained" onPress={() => {}}>
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
