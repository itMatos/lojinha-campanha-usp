import CardItemCarrinho from '@/components/Vendas/CardItemCarrinho';
import { ProdutoVendaType } from '@/types/types';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Appbar, Button, Card, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

interface CarrinhoScreenProps {
    navigation: any;
    route: any;
}

const vh = Dimensions.get('window').height / 100;

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

    const totalProducts = allCartItems.reduce((total, item) => total + item.quantidade, 0);

    return (
        <LinearGradient colors={['#2E8EC2', '#233E5D']} style={styles.fundo}>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                }}
            >
                <Appbar.Header mode="center-aligned" elevated style={{ backgroundColor: '#3DACE1' }}>
                    <Appbar.BackAction
                        onPress={() =>
                            navigation.navigate({
                                name: 'ProdutosVendasScreen',
                                params: { cartItemsParams: allCartItems },
                                merge: true,
                            })
                        }
                        color="#f6f6ff"
                    />
                    <Appbar.Content title="Carrinho" color="#F6F6FF" titleStyle={styles.titulo} />
                    {/* <Appbar.Action icon="magnify" onPress={() => console.log("seilaaa")} /> */}
                </Appbar.Header>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            paddingBottom: 30 * vh,
                        }}
                    >
                        <View style={styles.container}>
                            {cartItems.length === 0 && (
                                <Text style={styles.textoVazio} variant="titleLarge">
                                    Carrinho vazio
                                </Text>
                            )}
                        </View>

                        <View>
                            {cartItems.map((item: any, index: any) => {
                                return <CardItemCarrinho key={index} produto={item} onUpdateUnid={handleUpdateUnid} />;
                            })}
                        </View>

                        <View>
                            {cartItems.length > 0 && (
                                <Button
                                    mode="outlined"
                                    labelStyle={styles.fonteButton}
                                    onPress={() =>
                                        navigation.navigate({
                                            name: 'ProdutosVendasScreen',
                                            params: { cartItemsParams: [] },
                                            merge: true,
                                        })
                                    }
                                    style={{
                                        margin: 8,
                                        borderColor: "#f6f6ff",
                                        marginHorizontal:16
                                    }}
                                >
                                    Esvaziar carrinho
                                </Button>
                            )}
                        </View>
                    </View>
                </ScrollView>

                <SafeAreaView>
                    {cartItems.length > 0 && (
                        <Card
                            style={{
                                borderTopRightRadius: 25,
                                borderTopLeftRadius: 25,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                                position: 'absolute',
                                bottom: -10,
                                marginHorizontal: 10,
                            }}
                        >
                            <Card.Content>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        padding: 10,
                                    }}
                                >
                                    <Text style={styles.fonteTexto} variant="titleLarge">Quantidade</Text>
                                    <Text style={styles.fonteTexto} variant="titleLarge">{totalProducts}</Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        padding: 10,
                                    }}
                                >
                                    <Text style={styles.fonteTexto} variant="titleLarge">Total</Text>
                                    <Text style={styles.fonteTexto} variant="titleLarge">
                                        {allCartItems
                                            .reduce((total, item) => total + item.preco * item.quantidade, 0)
                                            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </Text>
                                </View>
                            </Card.Content>
                            <Card.Actions>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        padding: 10,
                                    }}
                                >
                                    <Button
                                        style={{ flex: 1 }}
                                        mode="contained"
                                        buttonColor='#EC7229'
                                        labelStyle={styles.fonteButton}
                                        onPress={() => {
                                            navigation.navigate({
                                                name: 'PagamentoScreen',
                                                params: { cartItemsParams: allCartItems },
                                                merge: true,
                                            });
                                        }}
                                    >
                                        Ir para o pagamento
                                    </Button>
                                </View>
                            </Card.Actions>
                        </Card>
                    )}
                </SafeAreaView>
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
    fundo: {
        flex: 1,
        backgroundColor: 'black',
    },
    titulo: {
        fontFamily: 'Milky Nice',
    },
    textoVazio: {
        color: '#f6f6ff',
        fontFamily: 'FontParaTexto',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    fonteTexto:{
        fontFamily: 'FontParaTexto',
        color: '#003D5C',
    },
    fonteButton: {
        fontFamily: 'FontParaTexto',
        color: '#f6f6ff',
    },
});
