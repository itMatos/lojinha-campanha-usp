import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, useColorScheme } from 'react-native';
import { Appbar, Button, Dialog, PaperProvider, Portal, Text, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from '../../components/ImageViewer';
import { ScrollView } from 'react-native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { Menu, Divider } from 'react-native-paper';

const vw = Dimensions.get('window').width / 100;
const PlaceholderImage = { uri: './assets/images/icon.png' };

export default function AdicionarComboScreen({ navigation }: { navigation: any }) {
    const [produtoNome, setProdutoNome] = useState('');
    const [produtoDescricao, setProdutoDescricao] = useState('');
    const [produtoPreco, setProdutoPreco] = useState('0,00');
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [visible, setVisible] = useState(false);
    const [visibleMenu, setVisibleMenu] = useState(false);

    const colorScheme = useColorScheme();
    const { theme } = useMaterial3Theme();

    const paperTheme = colorScheme !== 'dark' ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light };

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const openMenu = () => setVisibleMenu(true);

    const closeMenu = () => setVisibleMenu(false);

    const handlePrecoChange = (text: string) => {
        text = text.replace('.', '').replace(',', '').replace(/\D/g, '');

        const options = { minimumFractionDigits: 2 };
        const result = new Intl.NumberFormat('pt-BR', options).format(parseFloat(text) / 100);

        result ? setProdutoPreco(result) : setProdutoPreco('0,00');
    };

    const handleAdicionarProduto = () => {
        // adicionar endpoint para adicionar produto
        console.log('Adicionar produto');
        console.log('Nome: ' + produtoNome);
        console.log('Descrição: ' + produtoDescricao);
        console.log('Preço: ' + produtoPreco);
    };

    const handleButtonVoltar = () => {
        navigation.navigate('ProdutosEstoque');
        hideDialog();
    };

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };

    return (
        <>
            <PaperProvider theme={paperTheme}>
                <Appbar.Header mode="center-aligned" elevated>
                    <Appbar.BackAction onPress={showDialog} />
                    <Appbar.Content title="Adicionar combo" />
                    {/* <Appbar.Action icon="magnify" onPress={() => console.log("seilaaa")} /> */}
                </Appbar.Header>
                {/* <ScrollView showsVerticalScrollIndicator={false}> */}

                <PaperProvider>
                    <View
                        style={{
                            paddingTop: 50,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <View>
                            <Menu
                                visible={visibleMenu}
                                onDismiss={closeMenu}
                                anchor={<Button onPress={openMenu}>Selecione o item</Button>}
                                style={{ width: '90%' }}
                            >
                                <Menu.Item onPress={() => {}} title="Item 1" />
                                <Menu.Item onPress={() => {}} title="Item 2" />
                                <Divider />
                                <Menu.Item onPress={() => {}} title="Item 3" />
                            </Menu>
                        </View>
                    </View>
                </PaperProvider>

                <View>
                    <Portal>
                        <Dialog visible={visible} onDismiss={hideDialog}>
                            <Dialog.Title>Deseja voltar para a tela de estoque?</Dialog.Title>
                            <Dialog.Content>
                                <Text variant="bodyMedium">Ao voltar, seu progresso será perdido.</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={() => handleButtonVoltar()}>Sim, desejo voltar</Button>
                                <Button onPress={hideDialog}>Cancelar</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
                {/* </ScrollView> */}
            </PaperProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: '100%',
    },
    formContainer: {
        padding: 20,
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white',
    },
    appBar: {
        backgroundColor: 'white',
        margin: 20,
    },
    buttonsContainer: {
        alignItems: 'center',
        // position: 'absolute',
        // bottom: 0,
        width: '100%',
    },
    buttonAction: {
        margin: 10,
        width: 40 * vw,
    },
    imageContainer: {
        borderRadius: 2,
        marginBottom: 16,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    footerContainer: {
        alignItems: 'center',
    },
});
