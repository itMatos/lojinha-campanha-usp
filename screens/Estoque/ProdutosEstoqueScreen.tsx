import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { StatusBar } from 'react-native';
import CardItemEstoque from '@/components/CardItemEstoque';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { ItemComboType, ProdutoComboType, ProdutoIndividualType, ProdutosType } from '@/types/types';

const vh = Dimensions.get('window').height / 100;

export default function ProdutosEstoqueScreen({ navigation, route }: { navigation: any; route: any }) {
    const { items }: { items: ProdutosType[] } = route.params;
    const [itens, setItens] = useState<ProdutosType[]>(items);
    console.log('testando tela de produtos do estoque', items);

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
                            onPress: () => navigation.navigate('AdicionarCombo'),
                        },
                        {
                            icon: 'plus-box',
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
