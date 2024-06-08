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
}

interface CardItemEstoqueProps {
    itemEstoque: ItemType;
    onChangeQuantity: (itemId: number, newQuantity: number) => void;
}

export default function CardItemEstoque({ itemEstoque, onChangeQuantity }: CardItemEstoqueProps) {
    const handleAddQuantidade = () => {
        onChangeQuantity(itemEstoque.id, itemEstoque.quantidade + 1);
    };

    const handleSubtractQuantidade = () => {
        if (itemEstoque.quantidade > 1) {
            onChangeQuantity(itemEstoque.id, itemEstoque.quantidade - 1);
        }
    };

    return (
        <View>
            <Card elevation={1} style={styles.card}>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Content>
                    <Text variant="titleLarge">{itemEstoque.produto.nome}</Text>
                    <Text variant="bodyMedium">{itemEstoque.produto.descricao}</Text>
                    <Text variant="bodyMedium">{itemEstoque.produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                </Card.Content>

                <Card.Actions style={{ flexDirection: 'row' }}>
                    <Button icon="cart-check" mode="contained-tonal" style={styles.buttonQuantidade}>
                        {itemEstoque.quantidade}
                    </Button>
                    <View style={styles.actionButtons}>
                        <Button mode="outlined" onPress={() => console.log('botao de deletar')} style={{ margin: 3 }}>
                            Deletar
                        </Button>

                        <Button mode="contained" onPress={() => console.log('botao de editar')} style={{ margin: 3 }}>
                            Editar
                        </Button>
                    </View>
                </Card.Actions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'space-between',
        marginHorizontal: 40,
        marginVertical: 10,
    },
    chip: {
        flex: 0.3,
    },
    cardActions: {
        padding: 10,
    },
    buttonQuantidade: {
        flex: 0.1,
        margin: 0,
    },
    actionButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});
