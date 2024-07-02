import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Appbar, Badge, FAB, Text } from 'react-native-paper';
import { StatusBar } from 'react-native';
import CardItemVenda from '@/components/Vendas/CardItemVenda';
import { ScrollView } from 'react-native';
import { ProdutosType, ProdutoVendaType } from '@/types/types';
import { LinearGradient } from 'expo-linear-gradient';

import * as CampanhaApiService from '@/services/CampanhaApi';

export default function ProdutosVendasScreen({ navigation, route }: { navigation: any; route: any }) {
    const [produtos, setProdutos] = useState<ProdutosType[]>([]);
    const [cartItems, setCartItems] = useState<ProdutoVendaType[]>([]);

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

    const handleAddProductToCart = (itemId: string) => {
        const itemInCart = cartItems.find((item) => item.nome === itemId);

        if (itemInCart) {
            const updatedCartItems = cartItems.map((item) => (item.nome === itemId ? { ...item, quantidade: item.quantidade + 1 } : item));
            setCartItems(updatedCartItems);
        } else {
            const produto = produtos.find((produto) => produto.nome === itemId);

            if (produto) {
                setCartItems([...cartItems, { nome: produto.nome, preco: produto.preco, quantidade: 1 }]);
            }
        }

        console.log('Adicionando item ao carrinho:', itemId);
    };

    const totalProducts = cartItems.reduce((total, item) => total + item.quantidade, 0);

    return (
        <LinearGradient colors={['#2E8EC2', '#233E5D']} style={styles.fundo}>
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="white" />

                <Appbar.Header mode="center-aligned" elevated style={{backgroundColor: '#3DACE1'}}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain"/>
                    </View>
                    {/* <Appbar.BackAction onPress={() => {}} /> */}
                    <Appbar.Content title="Vendas" color="#F6F6FF" titleStyle={styles.titulo}/>
                    <View style={styles.badgeContainer}>
                        <Appbar.Action
                            icon="cart-outline"
                            color="#f6f6ff"
                            
                            onPress={() =>
                                navigation.navigate({
                                    name: 'CarrinhoVendas',
                                    params: { cartItems: cartItems },
                                })
                            }
                        />
                        {totalProducts > 0 && <Badge style={styles.badge}>{totalProducts}</Badge>}
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
                                <CardItemVenda produtoVenda={produto} onAddToCart={handleAddProductToCart} />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
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
    fundo:{
        flex: 1,
        backgroundColor: "black",
    },
    titulo:{
        fontFamily: 'Milky Nice',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    logo: {
        width: 40,
        height: 40,
    },
});
