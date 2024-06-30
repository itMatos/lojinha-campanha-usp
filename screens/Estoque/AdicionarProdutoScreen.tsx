import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, useColorScheme } from 'react-native';
import { Appbar, Button, Dialog, PaperProvider, Portal, Text, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import ImageViewer from '../../components/ImageViewer';
import { ScrollView } from 'react-native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

const vw = Dimensions.get('window').width / 100;
const PlaceholderImage = { uri: './assets/images/icon.png' };

export default function AdicionarProdutoScreen({ navigation }: { navigation: any }) {
    const [produtoNome, setProdutoNome] = useState('');
    const [produtoDescricao, setProdutoDescricao] = useState('');
    const [produtoPreco, setProdutoPreco] = useState('0,00');
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [visible, setVisible] = useState(false);

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

    const handleAdicionarProduto = () => {
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

    const customTextInputTheme = {
        colors: {
            primary: '#2E8EC2',  // Cor azul quando focado
            text: 'black',    // Cor do texto cinza
            background: 'white', // Cor de fundo
        },
    };

    return (
        <PaperProvider theme={paperTheme}>
                <Appbar.Header mode="center-aligned" elevated style={styles.barCima}>
                    <Appbar.BackAction onPress={showDialog} color='white'/>
                    <Appbar.Content title="Adicionar produto" titleStyle={{color: 'white', fontFamily: 'Milky Nice'}}/>
                </Appbar.Header>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.container}>
                            <View style={styles.formContainer}>
                                <TextInput
                                    label="Nome"
                                    value={produtoNome}
                                    onChangeText={(text) => setProdutoNome(text)}
                                    style={{ margin: 10 , backgroundColor: 'white'}}
                                    mode="outlined"
                                    theme={customTextInputTheme}
                                />
                                <TextInput
                                    label="Descrição"
                                    value={produtoDescricao}
                                    onChangeText={(text) => setProdutoDescricao(text)}
                                    style={{ margin: 10,backgroundColor: 'white' }}
                                    mode="outlined"
                                    theme={customTextInputTheme}
                                />
                                <TextInput
                                    label="Preço"
                                    value={produtoPreco}
                                    onChangeText={(text) => handlePrecoChange(text)}
                                    keyboardType="numeric"
                                    style={{ margin: 10 ,backgroundColor: 'white'}}
                                    mode="outlined"
                                    theme={customTextInputTheme}
                                />
                            </View>
                            <View style={styles.container}>
                                <Button onPress={pickImageAsync} textColor='white' buttonColor='#2196F3' style={{ marginLeft:80, marginRight: 80, marginBottom: 10, }}>Choose a photo</Button>
                                <View style={styles.imageContainer}>
                                    <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonAction}>
                                <Button mode="contained" onPress={() => handleAdicionarProduto()} buttonColor='#2196F3' textColor='white' style={{marginLeft:20, marginRight:20}}>
                                    Adicionar
                                </Button>
                            </View>
                            <View style={styles.buttonAction}>
                                <Button mode="outlined" onPress={showDialog} textColor='#2196F3' style={{ borderColor: '#2196F3',marginLeft:20, marginRight:20}}>
                                    Voltar
                                </Button>
                            </View>
                        </View>

                        <View>
                            <Portal>
                                <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
                                    <Dialog.Title style={styles.dialog_t}>Deseja voltar para a tela de estoque?</Dialog.Title>
                                    <Dialog.Content>
                                        <Text style={styles.dialog_t} variant="bodyMedium">Ao voltar, seu progresso será perdido.</Text>
                                    </Dialog.Content>
                                    <Dialog.Actions>
                                        <Button onPress={() => handleButtonVoltar()} textColor="#EC7229">Sim, desejo voltar</Button>
                                        <Button onPress={hideDialog} buttonColor="#2196F3" textColor="white" style={{ borderRadius: 5}}>Cancelar</Button>
                                    </Dialog.Actions>
                                </Dialog>
                            </Portal>
                        </View>
                    </View>
                </ScrollView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingRight: 20,
        paddingLeft: 20,
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
    barCima: {
        backgroundColor: '#3DACE1'
    },
    dialog: {
        backgroundColor: 'white',
        borderRadius: 3,
    },
    dialog_t: {
        color: 'black',
    },
});
