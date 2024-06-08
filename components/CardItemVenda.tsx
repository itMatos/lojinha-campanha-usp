import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Chip, IconButton, Text } from 'react-native-paper';

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
    itemVenda: ItemType;
    onChangeQuantity: (itemId: number, newQuantity: number) => void;
}

export default function CardItemVenda({ itemVenda, onChangeQuantity }: CardItemVendaProps) {
    const handleAddQuantidade = () => {
        onChangeQuantity(itemVenda.id, itemVenda.quantidade + 1);
    };

    const handleSubtractQuantidade = () => {
        if (itemVenda.quantidade > 1) {
            onChangeQuantity(itemVenda.id, itemVenda.quantidade - 1);
        }
    };
    return (
        <View>
            <Card elevation={1} style={styles.card}>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Content>
                    <Text variant="titleLarge">{itemVenda.produto.nome}</Text>
                    <Text variant="bodyMedium">{itemVenda.produto.descricao}</Text>
                    <Text variant="bodyMedium">{itemVenda.produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                </Card.Content>

                <Card.Actions>
                    <View>
                        <Chip mode="flat" disabled style={styles.chip}>
                            <IconButton
                                icon="minus-circle"
                                iconColor={'blue'}
                                size={30}
                                disabled={itemVenda.quantidade === 1}
                                onPress={handleSubtractQuantidade}
                            />
                            <View>
                                <Text variant="titleMedium" style={styles.itemText}>
                                    {itemVenda.quantidade}
                                </Text>
                            </View>
                            <IconButton icon="plus-circle" iconColor={'blue'} size={30} onPress={handleAddQuantidade} />
                        </Chip>
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
