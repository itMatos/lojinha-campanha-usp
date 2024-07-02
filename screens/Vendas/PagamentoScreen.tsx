import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Appbar, Button, Dialog, Portal, Text, ActivityIndicator } from 'react-native-paper';
import { postNewSale } from '@/services/CampanhaApi';
import { ProdutoVendaType, SaleType } from '@/types/types';
import { LinearGradient } from 'expo-linear-gradient';

const min = (x: number, y: number) => {
    return x < y ? x : y;
};

const vw = min(Dimensions.get('window').width, Dimensions.get('window').height) / 100;

export default function PagamentoScreen({ navigation, route }: { navigation: any; route: any }) {
    const { cartItemsParams } = route.params;
    const produtos: ProdutoVendaType[] = cartItemsParams;
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const precoTotal: number = cartItemsParams.reduce((acc: number, item: any) => {
        return acc + item.preco * item.quantidade;
    }, 0);

    const handleFinalizarVenda = async () => {
        setLoading(true);
        const novaVenda: SaleType = {
            produtos: produtos,
            preco_total: precoTotal,
        };

        console.log('Nova venda:', novaVenda);

        try {
            await postNewSale(novaVenda);

            navigation.navigate({
                name: 'ProdutosVendasScreen',
                params: { cartItemsParams: [] },
                merge: true,
            });
        } catch (error) {
            console.error('Tente novamente. Erro ao finalizar venda:', error);
        } finally {
            setLoading(false);
            hideDialog();
        }
    };

    return (
        <LinearGradient colors={['#2E8EC2', '#233E5D']} style={styles.fundo}>
            <View style={styles.container}>
                <Appbar.Header mode="center-aligned" elevated style={{backgroundColor: '#3DACE1'}}>
                    <Appbar.Content title="Pagamento" color="#F6F6FF" titleStyle={styles.titulo}/>
                </Appbar.Header>
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <Image style={styles.qrcode} source={require('@/assets/images/pix-qrcode.png')} />
                    </View>
                    <View>
                        <View>
                            <Text variant="bodyLarge" style={styles.texto}>
                                Aponte para o QR Code
                            </Text>
                        </View>

                        <View>
                            <Text variant="displaySmall" style={styles.texto}>
                                Valor Total:
                            </Text>
                            <Text variant="displayLarge" style={styles.texto}>
                                R$ {precoTotal.toFixed(2)}
                            </Text>
                        </View>

                        <View>
                            <Button buttonColor="#EC7229" labelStyle={styles.texto} mode="contained" onPress={showDialog} style={{ margin: 20 }}>
                                Finalizar Venda
                            </Button>
                        </View>

                        <View>
                            <Portal>
                                <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
                                    <View>{loading && <ActivityIndicator />}</View>
                                    <View>
                                        {!loading && (
                                            <>
                                                <Dialog.Title style={styles.dialog_t}>Deseja finalizar a venda?</Dialog.Title>
                                                <Dialog.Content>
                                                    <Text style={styles.dialog_t} variant="bodyLarge">
                                                        Ao finalizar a venda, os dados serão salvos no histórico e você
                                                        retornará para a tela inicial de Vendas.
                                                    </Text>
                                                </Dialog.Content>
                                                <Dialog.Actions>
                                                    <Button onPress={() => handleFinalizarVenda()} textColor="#EC7229">
                                                        Sim, desejo finalizar venda
                                                    </Button>
                                                    <Button
                                                        onPress={hideDialog}
                                                        buttonColor="#2E8EC2"
                                                        textColor="#f6f6ff"
                                                        style={{ borderRadius: 5 }}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                </Dialog.Actions>
                                            </>
                                        )}
                                    </View>
                                </Dialog>
                            </Portal>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    qrcode: {
        width: 90 * vw,
        height: 90 * vw,
    },
    dialog: {
        backgroundColor: '#f6f6ff',
        borderRadius: 32,
    },
    dialog_t: {
        fontFamily: 'FontParaTexto',
        color: '#003D5C',
        textAlign: 'center',
    },
    fundo:{
        flex: 1,
        backgroundColor: "black",
    },
    titulo:{
        fontFamily: 'Milky Nice',
    },
    texto:{
        fontFamily: 'FontParaTexto',
        color: '#f6f6ff',
        textAlign: 'center'
    },
});
