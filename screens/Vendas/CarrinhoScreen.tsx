import CardItemCarrinho from '@/components/Vendas/CardItemCarrinho';
import { ProdutoVendaType } from '@/types/types';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Appbar, Button, Card, Text } from 'react-native-paper';

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
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}
        >
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        paddingBottom: 30 * vh,
                    }}
                >
                    <View>{cartItems.length === 0 && <Text variant="titleLarge">Carrinho vazio</Text>}</View>

                    <View>
                        {cartItems.map((item: any, index: any) => {
                            return <CardItemCarrinho key={index} produto={item} onUpdateUnid={handleUpdateUnid} />;
                        })}
                    </View>

                    <View>
                        {cartItems.length > 0 && (
                            <Button
                                mode="outlined"
                                onPress={() =>
                                    navigation.navigate({
                                        name: 'ProdutosVendasScreen',
                                        params: { cartItemsParams: [] },
                                        merge: true,
                                    })
                                }
                                style={{
                                    margin: 10,
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
                                <Text variant="titleLarge">Quantidade</Text>
                                <Text variant="titleLarge">{totalProducts}</Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    padding: 10,
                                }}
                            >
                                <Text variant="titleLarge">Total</Text>
                                <Text variant="titleLarge">
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
    );
}
