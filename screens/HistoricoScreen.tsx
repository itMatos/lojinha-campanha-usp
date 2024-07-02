import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Image } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { StatusBar } from 'react-native';
import CardItemEstoque from '@/components/CardItemEstoque';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { ItemComboType, ProdutoComboType, ProdutoIndividualType, SaleType } from '@/types/types';
import { LinearGradient } from 'expo-linear-gradient';
import { getAllVendas } from '@/services/CampanhaApi';
import CardHistorico from '@/components/CardHistorico';

const vh = Dimensions.get('window').height / 100;

export default function HistoricoScreen({ navigation, route }: { navigation: any; route: any }) {
    const [vendas, setVendas] = useState<SaleType[]>([]);

    
    const fetchProducts = async () => {
        try {
            const allVendas = await getAllVendas();
            setVendas(allVendas);
        } catch (error) {
            console.error('Erro ao buscar vendas:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProducts();
            console.log("vendas: ", vendas[0]);
        }, [])
    );


    return (
        <>
        <LinearGradient colors={['#2E8EC2', '#233E5D']} style={styles.gradient}>
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="#3DACE1" />

                <Appbar.Header mode="center-aligned" elevated style={styles.barCima}>
                    {/* <Appbar.BackAction onPress={() => navigation.navigate('ProdutosEstoque')} /> */}
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain"/>
                    </View>
                    <Appbar.Content title="Histórico" titleStyle={styles.estoque} />
                    <Appbar.Action icon="magnify" onPress={() => {}} color="white"/>
                </Appbar.Header>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.listEstoque}>
                        {vendas.map((venda) => (
                            <View key={venda.data_hora}>
                                <CardHistorico navigation={navigation} venda={venda} />
                            </View>
                        ))}
                    </View>
                </ScrollView>
                </View>
            </LinearGradient>
        </>
    );
};

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