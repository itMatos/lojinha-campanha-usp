import CardItemCarrinho from '@/components/Vendas/CardItemCarrinho';
import { ProdutoVendaType } from '@/types/types';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Card, Text } from 'react-native-paper';

interface CarrinhoScreenProps {
    navigation: any;
    route: any;
}

export default function CarrinhoScreen({ navigation, route }: CarrinhoScreenProps) {
    const { cartItems } = route.params;
    const [allCartItems, setAllCartItems] = useState<ProdutoVendaType[]>(cartItems);

    useEffect(() => {
        setAllCartItems(cartItems);
    }, [cartItems]);

    const handleUpdateUnid = (itemNome: string, quantidade: number) => {
        const updatedCartItems = allCartItems.map((item) => (item.nome === itemNome ? { ...item, quantidade } : item));
        setAllCartItems(updatedCartItems);
    };

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header mode="center-aligned" elevated>
                <Appbar.BackAction
                    onPress={() =>
                        navigation.navigate({
                            name: 'ProdutosVendasScreen',
                            params: { cartItemsParams: allCartItems },
                            merge: true,
                        })
                    }
                />
                <Appbar.Content title="Carrinho" />
                {/* <Appbar.Action icon="magnify" onPress={() => console.log("seilaaa")} /> */}
            </Appbar.Header>

            <View>{cartItems.length === 0 && <Text variant="titleLarge">Carrinho vazio</Text>}</View>

            <View>
                {cartItems.map((item: any, index: any) => {
                    return <CardItemCarrinho key={index} produto={item} onUpdateUnid={handleUpdateUnid} />;
                })}
            </View>
        </View>
    );
}
