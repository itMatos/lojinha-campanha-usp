import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Chip, IconButton, Text } from 'react-native-paper';
import ReactNativeBlobUtil from 'react-native-blob-util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ItemComboType, ProdutoComboType, ProdutoIndividualType, ProdutosType } from '@/types/types';

// interface ItemEstoqueType {
//     id: string;
//     nome: string;
//     descricao?: string | '';
//     preco: number;
//     eh_combo: boolean;
//     quantidade_estoque: number | 0;
//     combo_products?: ItemComboType[];
//     key_img?: string;
// }

interface CardItemEstoqueProps {
    itemEstoque: ProdutosType;
    onChangeQuantity: (itemId: string, newQuantity: number) => void;
}

export default function CardItemEstoque({ itemEstoque, onChangeQuantity }: CardItemEstoqueProps) {
    const [displayImg, setDisplayImg] = useState<any>(null);

    useEffect(() => {
        AsyncStorage.getItem('img').then((r) => {
            if (r) {
                setDisplayImg(r);
            }
        });
    }, []);

    // const handleAddQuantidade = () => {
    //     onChangeQuantity(itemEstoque.id, itemEstoque.quantidade_estoque + 1);
    // };

    // const handleSubtractQuantidade = () => {
    //     if (itemEstoque.quantidade_estoque >= 1) {
    //         onChangeQuantity(itemEstoque.id, itemEstoque.quantidade_estoque - 1);
    //     }
    // };

    const img = itemEstoque.key_img ? displayImg : 'https://picsum.photos/700';

    return (
        <View>
            <Card elevation={1} style={styles.card}>
                <Card.Cover source={{ uri: img }} />
                <Card.Content>
                    <Text variant="titleLarge" style={styles.titleText}>{itemEstoque.nome}</Text>
                    <Text variant="bodyLarge" style={styles.bodyText}>{itemEstoque.descricao}</Text>
                    <Text variant="titleMedium" style={styles.priceText}>{itemEstoque.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                </Card.Content>

                <Card.Actions style={{ flexDirection: 'row' }}>
                    <Button icon="cart-check" mode="contained-tonal" style={styles.buttonQuantidade}>
                        {itemEstoque.eh_combo ? 'combo' : itemEstoque.quantidade_estoque}
                    </Button>
                    <View style={styles.actionButtons}>
                        <Button mode="outlined" onPress={() => console.log('botao de deletar')} style={[styles.actionButton, styles.deleteButton]} textColor="#EC7229">
                            Deletar
                        </Button>

                        <Button mode="contained" onPress={() => console.log('botao de editar')} style={[styles.actionButton, styles.editButton]} textColor='white'>
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
        backgroundColor: '#f6f6ff',
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
