import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

export default function CarrinhoScreen({ navigation, route }: { navigation: any; route: any }) {
    const { cartItems } = route.params;

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header mode="center-aligned" elevated>
                <Appbar.BackAction
                    onPress={() =>
                        navigation.navigate({
                            name: 'ProdutosVendasScreen',
                            params: { cartItems: cartItems },
                        })
                    }
                />
                <Appbar.Content title="Carrinho" />
                {/* <Appbar.Action icon="magnify" onPress={() => console.log("seilaaa")} /> */}
            </Appbar.Header>

            <View>{cartItems.length === 0 && <Text variant="titleLarge">Carrinho vazio</Text>}</View>

            <View>
                {cartItems.map((item: any, index: any) => {
                    return (
                        <View key={index}>
                            <Text>{item.nome}</Text>
                            <Text>{item.preco}</Text>
                            <Text>{item.quantidade}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}
