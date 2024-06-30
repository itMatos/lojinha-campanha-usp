import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

interface ItemComboType {
    id: string;
    nome: string;
    quantidade: number | 0;
}
interface ItemEstoqueType {
    id: string;
    nome: string;
    descricao?: string | '';
    preco: number;
    eh_combo: boolean;
    quantidade_estoque: number | 0;
    combo_products?: ItemComboType[];
}

interface CardItemEstoqueProps {
    itemEstoque: ItemEstoqueType;
    onChangeQuantity: (itemId: string, newQuantity: number) => void;
}

export default function CardItemEstoque({ itemEstoque, onChangeQuantity }: CardItemEstoqueProps) {
    const handleAddQuantidade = () => {
        onChangeQuantity(itemEstoque.id, itemEstoque.quantidade_estoque + 1);
    };

    const handleSubtractQuantidade = () => {
        if (itemEstoque.quantidade_estoque > 1) {
            onChangeQuantity(itemEstoque.id, itemEstoque.quantidade_estoque - 1);
        }
    };

    return (
        <View>
            <Card elevation={1} style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: 'https://picsum.photos/700' }} style={styles.image} />
                </View>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.titleText}>{itemEstoque.nome}</Text>
                    <Text variant="bodyLarge" style={styles.bodyText}>{itemEstoque.descricao}</Text>
                    <Text variant="titleMedium" style={styles.priceText}>{itemEstoque.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                </Card.Content>

                <Card.Actions style={{ flexDirection: 'row' }}>
                    <Button icon="cart-check" mode="contained-tonal" style={styles.buttonQuantidade}>
                        {itemEstoque.quantidade_estoque}
                    </Button>
                    <View style={styles.actionButtons}>
                        <Button
                            mode="outlined"
                            onPress={() => console.log('botao de deletar')}
                            style={[styles.actionButton, styles.deleteButton]}
                            textColor="#EC7229"
                        >
                            Deletar
                        </Button>

                        <Button
                            mode="contained"
                            onPress={() => console.log('botao de editar')}
                            style={[styles.actionButton, styles.editButton]}
                            textColor='white'
                        >
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
        backgroundColor: '#FEF9F6',
        borderRadius: 15,
        overflow: 'hidden',
    },
    imageContainer: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
    },
    titleText: {
        color: '#003D5C',
        paddingTop: 8,
        fontFamily: 'FontParaTexto',
        fontSize: 23,
    },
    bodyText: {
        color: '#003D5C',
        fontFamily: 'FontParaTexto',
        fontSize: 15,
    },
    priceText: {
        color: '#003D5C', 
        fontFamily: 'FontParaTexto',
        fontSize: 15,
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
        backgroundColor: '#3DACE1',
    },
    actionButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    actionButton: {
        margin: 3,
    },
    deleteButton: {
        borderColor: '#EC7229',
    },
    editButton: {
        backgroundColor: '#EC7229',
    },
});
