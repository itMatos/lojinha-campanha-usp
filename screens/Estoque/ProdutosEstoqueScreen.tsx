import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { StatusBar } from 'react-native';
import CardItemEstoque from '@/components/CardItemEstoque';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { ItemComboType, ProdutoComboType, ProdutoIndividualType, ProdutosType } from '@/types/types';
import { LinearGradient } from 'expo-linear-gradient';

import { getAllProducts } from '@/services/CampanhaApi';
const vh = Dimensions.get('window').height / 100;

export default function ProdutosEstoqueScreen({ navigation, route }: { navigation: any; route: any }) {
    const [items, setItems] = useState<ProdutosType[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getAllProducts();
                setItems(products);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProducts();
    }, []);

    console.warn(items);
    const [itens, setItens] = useState<ProdutosType[]>(items);

    const handleChangeQuantity = (itemId: string, newQuantity: number) => {
        setItens((prevItens) =>
            prevItens.map((item) => (item.id === itemId ? { ...item, quantidade: newQuantity, valorTotal: item.preco * newQuantity } : item))
        );
    };

    const [state, setState] = useState({ open: false });

    const onStateChange = ({ open }: { open: boolean }) => setState({ open });

    const { open } = state;

    useEffect(() => {
        setItens(items);
    }, [items]);

    return (
        <>
        <LinearGradient colors={['#2E8EC2', '#233E5D']} style={styles.gradient}>
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="#3DACE1" />

                <Appbar.Header mode="center-aligned" elevated style={styles.barCima}>
                    {/* <Appbar.BackAction onPress={() => navigation.navigate('ProdutosEstoque')} /> */}
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain"/>
                    </View>
                    <Appbar.Content title="Estoque" titleStyle={styles.estoque} />
                    <Appbar.Action icon="magnify" onPress={() => {}} color="white"/>
                </Appbar.Header>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.listEstoque}>
                        {itens.map((item) => (
                            <View key={item.id}>
                                <CardItemEstoque itemEstoque={item} onChangeQuantity={handleChangeQuantity} />
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <FAB.Group
                    open={open}
                    visible
                    icon={open ? 'plus-circle' : 'plus'}
                    actions={[
                        {
                            icon: 'shape-plus',
                            color: '#2E8EC2',
                            label: 'Combo',
                            onPress: () =>
                                navigation.navigate({
                                    name: 'AdicionarCombo',
                                    params: { items: itens },
                                    merge: true,
                                }),
                        },
                        {
                            icon: 'plus-box',
                            color: '#2E8EC2',
                            label: 'Individual',
                            onPress: () =>
                                navigation.navigate({
                                    name: 'AdicionarProduto',
                                    params: { items: itens },
                                    merge: true,
                                }),
                        },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something
                        }
                    }}
                    fabStyle={styles.fabAction}
                />
            </View>
            </LinearGradient>
        </>
        
    );
}

const styles = StyleSheet.create({
    listItems: {
        alignSelf: 'center',
        flex: 1,
    },
    fabAction: {
        borderRadius: 50,
        backgroundColor: '#2196F3',
    },
    listEstoque: {
        paddingBottom: 10 * vh,
    },
    gradient: {
        flex: 1,
    },
    barCima: {
        backgroundColor: '#3DACE1',
    },
    estoque: {
        color: 'white',
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