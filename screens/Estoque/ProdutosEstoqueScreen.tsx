import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, StatusBar, Dimensions, Image } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import CardItemEstoque from '@/components/CardItemEstoque';
import AdicionarProduto from './AdicionarProdutoScreen';

const vh = Dimensions.get('window').height / 100;

interface ItemComboType {
    id: string;
    nome: string;
    quantidade: number | 0;
}
interface ItemEstoqueType {
    id: string;
    nome: string;
    descricao?: string | '';
    preco: number;
    eh_combo: boolean;
    quantidade_estoque: number | 0;
    combo_products?: ItemComboType[];
}

export default function ProdutosEstoqueScreen({ navigation }: { navigation: any }) {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [itens, setItens] = useState<ItemEstoqueType[]>([
        {
            id: '6664576a490582f51482d1c8',
            nome: 'broche laranja',
            preco: 5,
            eh_combo: false,
            combo_products: [],
            quantidade_estoque: 0,
        },
        {
            id: '66645957bb9a1a5ec7f1874f',
            nome: 'combo 2 broches laranja',
            preco: 12,
            eh_combo: true,
            quantidade_estoque: 0,
            combo_products: [
                {
                    id: '66645957bb9a1a5ec7f18750',
                    nome: 'broche laranja',
                    quantidade: 2,
                },
            ],
        },
        {
            id: '667ac28ddd88cc8ad8de6854',
            nome: 'broche rosa',
            preco: 7,
            quantidade_estoque: 0,
            eh_combo: false,
            combo_products: [],
        },
        {
            id: '667c6daf8610658233de73fc',
            nome: 'teste italooooo',
            descricao: 'descricao teste italo',
            preco: 3.14,
            quantidade_estoque: 12,
            eh_combo: false,
            combo_products: [],
        },
    ]);

    const handleChangeQuantity = (itemId: string, newQuantity: number) => {
        setItens((prevItens) =>
            prevItens.map((item) => (item.id === itemId ? { ...item, quantidade: newQuantity, valorTotal: item.preco * newQuantity } : item))
        );
    };

    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }: { open: boolean }) => setState({ open });

    const { open } = state;

    const [novoProduto, setNovoProduto] = useState<ItemEstoqueType>({
        id: '-1',
        nome: '',
        descricao: '',
        preco: 0,
        quantidade_estoque: 0,
        eh_combo: false,
    });

    return (
        <LinearGradient colors={['#2E8EC2', '#233E5D']} style={styles.gradient}>
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" backgroundColor="#3DACE1" />

                <Appbar.Header mode="center-aligned" elevated style={styles.barCima}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain"/>
                    </View>
                    <Appbar.Content title="Estoque" titleStyle={styles.estoque} />
                    <Appbar.Action icon="magnify" onPress={() => {}} color="white" />
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
                            label: 'Combo',
                            onPress: () => navigation.navigate('AdicionarCombo'),
                        },
                        {
                            icon: 'plus-box',
                            label: 'Individual',
                            onPress: () => navigation.navigate('AdicionarProduto'),
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
