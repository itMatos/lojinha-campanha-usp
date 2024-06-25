import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, FAB, Portal, Text, PaperProvider, Button, Modal } from 'react-native-paper';
import { StatusBar } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardItemEstoque from '@/components/CardItemEstoque';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import AdicionarProduto from '@/components/AdicionarProduto';

const vh = Dimensions.get('window').height / 100;

interface ItemEstoqueType {
    id: number;
    produto: {
        id: number;
        nome: string;
        descricao: string;
        preco: number;
    };
    quantidade: number;
}

export default function EstoqueScreen() {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    const [itens, setItens] = useState<ItemEstoqueType[]>([
        {
            id: 1,
            produto: { id: 1, nome: 'Caneca', descricao: '1 Caneca Campanha', preco: 20.0 },
            quantidade: 20,
        },
        {
            id: 2,
            produto: { id: 2, nome: 'Camiseta Azul', descricao: '1 Camiseta Tamanho M', preco: 13.0 },
            quantidade: 15,
        },
        {
            id: 3,
            produto: { id: 3, nome: 'Camiseta laranja', descricao: '1 Camiseta Tamanho P', preco: 13.0 },
            quantidade: 13,
        },
    ]);

    const handleChangeQuantity = (itemId: number, newQuantity: number) => {
        setItens((prevItens) =>
            prevItens.map((item) => (item.id === itemId ? { ...item, quantidade: newQuantity, valorTotal: item.produto.preco * newQuantity } : item))
        );
    };

    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }: { open: boolean }) => setState({ open });

    const { open } = state;

    const [novoProduto, setNovoProduto] = useState<ItemEstoqueType>({
        id: -1,
        produto: { id: -1, nome: '', descricao: '', preco: 0 },
        quantidade: 0,
    });

    return (
        <>
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="white" />

                <Appbar.Header mode="center-aligned" elevated>
                    {/* <Appbar.BackAction onPress={() => {}} /> */}
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
                            onPress: showModal,
                        },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                        }
                    }}
                    fabStyle={styles.fabAction}
                />
            </View>

            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AdicionarProduto />
            </ScrollView>
            </Modal>
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
