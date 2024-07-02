import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Chip, IconButton, Text } from 'react-native-paper';
import ReactNativeBlobUtil from 'react-native-blob-util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ItemComboType, ProdutoComboType, ProdutoIndividualType, ProdutosType, SaleType } from '@/types/types';
import { deleteProduct } from '@/services/CampanhaApi';
import AtualizarProdutoScreen from '@/screens/Estoque/AtualizarProdutoScreen';
import AtualizarComboScreen from '@/screens/Estoque/AtualizarComboScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


interface CardHistoricoProps {
    navigation: any;
    venda: SaleType;
}

export default function CardHistorico({navigation, venda }: CardHistoricoProps) {

    function formatDateString(dateString: string): string {
        // Cria um novo objeto Date a partir da string fornecida
        const date = new Date(dateString);
    
        // Formata o dia, mês e ano
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses são indexados a partir de 0
        const year = date.getFullYear();
    
        // Formata as horas, minutos e segundos
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        // Constrói a string formatada
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    } 

    return (
        <>
            <View>
                <Card elevation={1} style={styles.card}>
                    <Card.Content>
                        <Text variant="titleLarge" style={styles.titleText}>{"VENDA - " + formatDateString(venda.data_hora || "")}</Text>
                        <Text variant="titleLarge" style={styles.titleText}>{venda.preco_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                        <View>
                            {venda.produtos.map((produto, index) => (
                                <View key={index}>
                                    <Text variant="titleMedium" style={styles.priceText}>{`(${produto.quantidade}) ${produto.nome}`}</Text>
                                    <Text variant="titleMedium" style={styles.priceText}>{produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                                </View>
                            ))}
                        </View>
                    </Card.Content>
                </Card>
            </View>
        </>
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
