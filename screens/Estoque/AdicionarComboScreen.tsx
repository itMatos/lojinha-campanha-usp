import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, useColorScheme } from 'react-native';
import { Appbar, Button, Chip, Dialog, PaperProvider, Portal, Text, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from '../../components/ImageViewer';
import { ScrollView } from 'react-native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { Menu, Divider } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const vw = Dimensions.get('window').width / 100;
const PlaceholderImage = { uri: './assets/images/icon.png' };

export default function AdicionarComboScreen({ navigation }: { navigation: any }) {
    const [produtoNome, setProdutoNome] = useState('');
    const [produtoDescricao, setProdutoDescricao] = useState('');
    const [produtoPreco, setProdutoPreco] = useState('0');
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

    const [showDropDown, setShowDropDown] = useState(false);
    const [SelectDivision, setSelectDivision] = useState('');
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);

    const itens = [
        {
            id: '6664576a490582f51482d1c8',
            nome: 'broche laranja',
            preco: 5,
            eh_combo: false,
            combo_products: [],
            quantidade_estoque: 0,
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
    ];

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
        <PaperProvider theme={paperTheme}>
            <View
                style={{
                    justifyContent: 'space-around',
                }}
            >
                <View>
                    <Appbar.Header mode="center-aligned" elevated>
                        <Appbar.BackAction onPress={showDialog} />
                        <Appbar.Content title="Adicionar combo" />
                        {/* <Appbar.Action icon="magnify" onPress={() => console.log("seilaaa")} /> */}
                    </Appbar.Header>
                </View>
                {/* <ScrollView showsVerticalScrollIndicator={false}> */}

                <View>
                    {/* <PaperProvider>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                paddingTop: 25,
                                width: '80%',
                            }}
                        >
                            <Menu
                                visible={visibleMenu}
                                onDismiss={closeMenu}
                                anchor={
                                    <Chip onPress={openMenu} style={{ width: '80%', justifyContent: 'center' }}>
                                        Selecione o item aaaaaaaaaaa
                                    </Chip>
                                }
                                style={{ width: '80%', justifyContent: 'center', marginTop: -25 }}
                            >
                                <Menu.Item onPress={() => {}} title="Item 1" />
                                <Menu.Item onPress={() => {}} title="Item 2" />
                                <Divider />
                                <Menu.Item onPress={() => {}} title="Item 3" />
                            </Menu>
                        </View>
                    </PaperProvider> */}

                    <Text variant="titleLarge" style={{ margin: 20 }}>
                        Para adicionar um Combo, os itens que irão compor o compb devem ser adicionados individualmente para aparecer na listagem.
                    </Text>

                    <View style={styles.formContainer}>
                        <View>
                            <TextInput
                                mode="outlined"
                                label="Nome do combo"
                                value={produtoNome}
                                onChangeText={(text) => setProdutoNome(text)}
                                style={styles.input}
                            />
                        </View>

                        <DropDown
                            label={'Selecione o produto'}
                            mode={'outlined'}
                            dropDownStyle={{
                                borderColor: '#322b7c',
                                borderWidth: 0.7,
                                borderRadius: 4,
                                borderStyle: 'solid',
                                backgroundColor: 'white',
                                justifyContent: 'space-around',
                                width: '100%',
                            }}
                            visible={showDropDown}
                            showDropDown={() => setShowDropDown(true)}
                            onDismiss={() => setShowDropDown(false)}
                            //onBlur={() => setShowDropDown(false)} // Add this line
                            value={SelectDivision}
                            multiSelect={false}
                            setValue={setSelectDivision}
                            list={itens.map((item) => ({
                                label: item.nome,
                                value: item.id,
                            }))}
                            inputProps={{
                                right: () => <Icon name="chevron-down" size={15} color={'black'} />,
                            }}
                        />
                        <TextInput
                            label="Quantidade"
                            value={produtoPreco}
                            onChangeText={(text) => handlePrecoChange(text)}
                            keyboardType="numeric"
                            mode="outlined"
                            style={{ marginTop: 10 }}
                        />
                    </View>

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
                </View>
                {/* </ScrollView> */}
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
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
