import CardItemCarrinho from '@/components/Vendas/CardItemCarrinho';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Card, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function CarrinhoScreen({ navigation, route }: { navigation: any; route: any }) {
    const { cartItems } = route.params;

    return (
        <LinearGradient colors={['#2E8EC2', '#233E5D']} style={styles.fundo}>
            <View style={{ flex: 1 }}>
                <Appbar.Header mode="center-aligned" elevated style={{backgroundColor: '#3DACE1'}}>
                    <Appbar.BackAction
                        onPress={() =>
                            navigation.navigate({
                                name: 'ProdutosVendasScreen',
                                params: { cartItems: cartItems },
                            })
                        }
                        color='#f6f6ff'
                    />
                    <Appbar.Content title="Carrinho" color="#F6F6FF" titleStyle={styles.titulo}/>
                    {/* <Appbar.Action icon="magnify" onPress={() => console.log("seilaaa")} /> */}
                </Appbar.Header>

                <View style={styles.container}>{cartItems.length === 0 && <Text style={styles.textoVazio} variant="titleLarge">Carrinho vazio</Text>}</View>

                <View>
                    {cartItems.map((item: any, index: any) => {
                        return <CardItemCarrinho key={index} produto={item} onAddToCart={() => {}} />;
                    })}
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
      },
    fundo:{
        flex: 1,
        backgroundColor: "black",
    },
    titulo:{
        fontFamily: 'Milky Nice',
    },
    textoVazio:{
        color: '#f6f6ff', 
        fontFamily: 'Comfortaa'
    }
});
