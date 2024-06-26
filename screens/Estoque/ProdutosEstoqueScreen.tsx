import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { StatusBar } from 'react-native';
import CardItemEstoque from '@/components/CardItemEstoque';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import AdicionarProduto from './AdicionarProdutoScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
    const containerStyle = { backgroundColor: 'white', padding: 20 };

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
        <>
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="white" />

                <Appbar.Header mode="center-aligned" elevated>
                    {/* <Appbar.BackAction onPress={() => navigation.navigate('ProdutosEstoque')} /> */}
                    <Appbar.Content title="Estoque" />
                    <Appbar.Action icon="magnify" onPress={() => {}} />
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
                            onPress: () => console.log('Pressed produto'),
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
        </>
    );
}

const styles = StyleSheet.create({
    listItems: {
        alignSelf: 'center',
        flex: 1,
    },
    fabAction: {
        borderRadius: 50, // Make the button completely round
    },
    listEstoque: {
        paddingBottom: 10 * vh,
    },
});
