import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Appbar, Button, Dialog, Portal, Text } from 'react-native-paper';
import * as CampanhaApiService from '@/services/CampanhaApi';
import { postNewSale } from '@/services/CampanhaApi';
import { ProdutoVendaType, SaleType } from '@/types/types';

const vw = Dimensions.get('window').width / 100;

export default function PagamentoScreen({ navigation, route }: { navigation: any; route: any }) {
    const { cartItemsParams } = route.params;
    const produtos: ProdutoVendaType[] = cartItemsParams;

    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const precoTotal: number = cartItemsParams.reduce((acc: number, item: any) => {
        return acc + item.preco * item.quantidade;
    }, 0);

    const handleFinalizarVenda = async () => {
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
        }
    };

    return (
        <View>
            <Appbar.Header mode="center-aligned" elevated>
                <Appbar.Content title="Pagamento" />
            </Appbar.Header>
            <View
                style={{
                    alignItems: 'center',
                }}
            >
                <Image style={styles.qrcode} source={require('@/assets/images/pix-qrcode.png')} />
            </View>
            <View>
                <View>
                    <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
                        Aponte para o QR Code
                    </Text>
                </View>

                <View>
                    <Text variant="displaySmall" style={{ textAlign: 'center' }}>
                        Valor Total:
                    </Text>
                    <Text variant="displayLarge" style={{ textAlign: 'center' }}>
                        R$ {precoTotal.toFixed(2)}
                    </Text>
                </View>

                <View>
                    <Button mode="contained" onPress={showDialog} style={{ margin: 20 }}>
                        Finalizar Venda
                    </Button>
                </View>

                <View>
                    <Portal>
                        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
                            <Dialog.Title style={styles.dialog_t}>Deseja finalizar a venda?</Dialog.Title>
                            <Dialog.Content>
                                <Text style={styles.dialog_t} variant="bodyLarge">
                                    Ao finalizar a venda, os dados serão salvos no histórico e você retornará para a
                                    tela inicial de Vendas.
                                </Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={() => handleFinalizarVenda()} textColor="#EC7229">
                                    Sim, desejo finalizar venda
                                </Button>
                                <Button
                                    onPress={hideDialog}
                                    buttonColor="#2196F3"
                                    textColor="white"
                                    style={{ borderRadius: 5 }}
                                >
                                    Cancelar
                                </Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    qrcode: {
        width: 90 * vw,
        height: 90 * vw,
    },
    dialog: {
        backgroundColor: 'white',
        borderRadius: 3,
    },
    dialog_t: {
        color: 'black',
    },
});
