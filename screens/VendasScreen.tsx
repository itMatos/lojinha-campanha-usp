import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { StatusBar } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const vh = Dimensions.get('window').height / 100;

interface ItemType {
    id: number;
    produto: {
        id: number;
        nome: string;
        descricao: string;
        preco: number;
    };
    quantidade: number;
    valorTotal: number;
}

export default function VendasScreen() {
    const [itens, setItens] = React.useState<ItemType[]>([
        {
            id: 1,
            produto: { id: 1, nome: 'Chaveiro', descricao: '1 chaveiro pequeno', preco: 5.0 },
            quantidade: 1,
            valorTotal: 5.0,
        },
        {
            id: 2,
            produto: { id: 2, nome: 'Borracha', descricao: '1 borracha pequena', preco: 2.0 },
            quantidade: 1,
            valorTotal: 2.0,
        },
        {
            id: 3,
            produto: { id: 3, nome: 'Caneta', descricao: '1 caneta azul', preco: 1.0 },
            quantidade: 1,
            valorTotal: 1.0,
        },
    ]);

    const handleChangeQuantity = (itemId: number, newQuantity: number) => {
        setItens((prevItens) =>
            prevItens.map((item) => (item.id === itemId ? { ...item, quantidade: newQuantity, valorTotal: item.produto.preco * newQuantity } : item))
        );
    };

    return (
        <LinearGradient colors={['#2E8EC2', '#233E5D']} style={styles.fundo}>
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="white" />

                <Appbar.Header mode="center-aligned" elevated>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain"/>
                    </View>
                    {/* <Appbar.BackAction onPress={() => {}} /> */}
                    <Appbar.Content title="Vendas" color="#F6F6FF" titleStyle={styles.titulo}/>
                    <Appbar.Action icon="magnify" onPress={() => {}} color="#F6F6FF"/>
                </Appbar.Header>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.listVendas}>
                        {itens.map((item) => (
                            <View key={item.id}></View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    listItems: {
        alignSelf: 'center',
        flex: 1,
    },
    listVendas: {
        paddingBottom: 10 * vh,
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
