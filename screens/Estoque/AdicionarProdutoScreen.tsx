import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, useColorScheme } from 'react-native';
import { Appbar, Button, Dialog, PaperProvider, Portal, Text, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from '../../components/ImageViewer';
import { ScrollView } from 'react-native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { ItemComboType, ProdutoComboType, ProdutoIndividualType, ProdutosType } from '@/types/types';

const vw = Dimensions.get('window').width / 100;
const PlaceholderImage = { uri: './assets/images/icon.png' };

export default function AdicionarProdutoScreen({ navigation, route }: { navigation: any; route: any }) {
    const { items }: { items: ProdutosType[] } = route.params;
    const [produtoNome, setProdutoNome] = useState('');
    const [produtoDescricao, setProdutoDescricao] = useState('');
    const [produtoPreco, setProdutoPreco] = useState('0,00');
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [visible, setVisible] = useState(false);
    const [quantidadeProduto, setQuantidadeProduto] = useState('0');

    const [itens, setItens] = useState<ProdutosType[]>(items);

    console.log('isso vem de params', items);

    const colorScheme = useColorScheme();
    const { theme } = useMaterial3Theme();

    const paperTheme = colorScheme !== 'dark' ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light };

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const handlePrecoChange = (text: string) => {
        text = text.replace('.', '').replace(',', '').replace(/\D/g, '');

        const options = { minimumFractionDigits: 2 };
        const result = new Intl.NumberFormat('pt-BR', options).format(parseFloat(text) / 100);

        result ? setProdutoPreco(result) : setProdutoPreco('0,00');
    };

    const handleAdicionarProdutoIndividual = () => {
        // adicionar endpoint para adicionar produto
        const testeId = (Math.random() * (8000 - 1000) + 1000).toString();
        const novoProduto: ProdutoIndividualType = {
            id: testeId,
            nome: produtoNome,
            descricao: produtoDescricao,
            preco: parseFloat(produtoPreco.replace(',', '.')),
            eh_combo: false,
            quantidade_estoque: parseInt(quantidadeProduto),
        };
        console.log('Novo produto:', novoProduto);
        const newItems = [...items, novoProduto];
        setItens(newItems);
        console.log('Novos itens:', newItems);

        navigation.navigate({
            name: 'ProdutosEstoque',
            params: {
                items: newItems,
            },
            merge: true,
        });
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
                    <Appbar.Content title="Adicionar produto" />
                    {/* <Appbar.Action icon="magnify" onPress={() => console.log("seilaaa")} /> */}
                </Appbar.Header>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.container}>
                            <View style={styles.formContainer}>
                                <TextInput
                                    label="Nome"
                                    value={produtoNome}
                                    onChangeText={(text) => setProdutoNome(text)}
                                    style={{ margin: 10 }}
                                    mode="outlined"
                                />
                                <TextInput
                                    label="Descrição"
                                    value={produtoDescricao}
                                    onChangeText={(text) => setProdutoDescricao(text)}
                                    style={{ margin: 10 }}
                                    mode="outlined"
                                />
                                <TextInput
                                    label="Preço"
                                    value={produtoPreco}
                                    onChangeText={(text) => handlePrecoChange(text)}
                                    keyboardType="numeric"
                                    style={{ margin: 10 }}
                                    mode="outlined"
                                />
                                <TextInput
                                    label="Quantidade em estoque"
                                    value={quantidadeProduto}
                                    onChangeText={(text) => setQuantidadeProduto(text)}
                                    keyboardType="numeric"
                                    style={{ margin: 10 }}
                                    mode="outlined"
                                />
                            </View>
                            <View style={styles.container}>
                                <Button onPress={pickImageAsync}>Choose a photo</Button>
                                <View style={styles.imageContainer}>
                                    <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonAction}>
                                <Button mode="contained" onPress={handleAdicionarProdutoIndividual}>
                                    Adicionar
                                </Button>
                            </View>
                            <View style={styles.buttonAction}>
                                <Button mode="outlined" onPress={showDialog}>
                                    Voltar
                                </Button>
                            </View>
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
                </ScrollView>
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
