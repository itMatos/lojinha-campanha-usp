import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Badge, FAB, Text } from 'react-native-paper';
import { StatusBar } from 'react-native';
import CardItemVenda from '@/components/Vendas/CardItemVenda';
import { ScrollView } from 'react-native';
import { ProdutosType } from '@/types/types';

import * as CampanhaApiService from '@/services/CampanhaApi';

export default function ProdutosVendasScreen() {
    const [produtos, setProdutos] = useState<ProdutosType[]>([]);

    useEffect(() => {
        if (produtos.length === 0) {
            CampanhaApiService.getAllProducts()
                .then((products) => {
                    setProdutos(products);
                })
                .catch((error) => {
                    console.error('Erro ao buscar produtos:', error);
                });
        }
    }, [produtos]);

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            <Appbar.Header mode="center-aligned" elevated>
                {/* <Appbar.BackAction onPress={() => {}} /> */}
                <Appbar.Content title="Vendas" />
                <View style={styles.badgeContainer}>
                    <Appbar.Action icon="cart-outline" onPress={() => {}} />
                    {produtos.length > 0 && <Badge style={styles.badge}>{produtos.length}</Badge>}
                </View>
            </Appbar.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {produtos.length === 0 && (
                        <View>
                            <Text>Carregando produtos para venda...</Text>
                        </View>
                    )}
                    {produtos.map((produto) => (
                        <View key={produto.nome}>
                            <CardItemVenda produtoVenda={produto} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    badgeContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
});
