import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

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
        if (itemVenda.quantidade > 0) {
            onChangeQuantity(itemVenda.id, itemVenda.quantidade - 1);
        }
    };

    return (
        <View>
            <Card elevation={1} style={styles.card}>
                <Card.Cover source={{ uri: 'https://i.postimg.cc/7ZdzqFMv/undraw-dev-productivity-umsq.png' }} />
                <Card.Content>
                    <Text variant="titleLarge" style={styles.fonteTexto}>{itemVenda.produto.nome}</Text>
                    <Text variant="bodyMedium" style={styles.fonteTexto}>{itemVenda.produto.descricao}</Text>
                    <Text variant="bodyMedium" style={styles.fonteTexto}>{itemVenda.produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                </Card.Content>
                <Card.Actions>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={handleSubtractQuantidade} disabled={itemVenda.quantidade === 0} style={[styles.button, itemVenda.quantidade === 0 && styles.disabledButton]}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <View style={styles.quantity}>
                            <Text style={styles.quantityText}>{itemVenda.quantidade}</Text>
                        </View>
                        <View style={styles.divider} />
                        <TouchableOpacity onPress={handleAddQuantidade} style={styles.button}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
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
        backgroundColor: '#f6f6ff'
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F89625',
        borderRadius: 50,
        padding: 5,
    },
    button: {
        backgroundColor: '#F89625',
        padding: 10,
        borderRadius: 50,
    },
    disabledButton: {
        backgroundColor: '#F89625',
    },
    buttonText: {
        color: '#F6F6FF',
        fontSize: 20,
    },
    quantity: {
        paddingHorizontal: 20,
    },
    quantityText: {
        fontSize: 20,
        color: '#F6F6FF',
    },
    divider: {
        width: 10,
        height: '100%',
        backgroundColor: '#F6F6FF',
        color: '#F6F6FF',
        overlayColor: '#F6F6FF',
    },
    fonteTexto: {
        fontFamily: 'Comfortaa',
        color: '#003D5C'
    },
});
