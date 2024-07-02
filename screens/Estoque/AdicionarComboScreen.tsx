import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, useColorScheme } from 'react-native';
import { Appbar, Button, Card, Chip, Dialog, PaperProvider, Portal, Text, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from '../../components/ImageViewer';
import { ScrollView } from 'react-native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { Menu, Divider } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AdicionarItemCombo from '@/components/AdicionarItemCombo';
import { ItemComboType, ProdutoComboType, ProdutoIndividualType, ProdutosType } from '@/types/types';
import { getAllProducts, postNewProduct } from '@/services/CampanhaApi';

const vw = Dimensions.get('window').width / 100;
const PlaceholderImage = { uri: './assets/images/icon.png' };

const listaDeProdutos = [
    {
        id: '6664576a490582f51482d1c8',
        nome: 'broche laranja',
        preco: 5,
        eh_combo: false,
        combo_products: [],
        quantidade_estoque: 0,
    } as ProdutoIndividualType,
    {
        id: '66645957bb9a1a5ec7f1874f',
        nome: 'combo 2 broches laranja',
        preco: 12,
        eh_combo: true,
        combo_products: [
            {
                nome: 'broche laranja',
                quantidade: 2,
                id: '66645957bb9a1a5ec7f18750',
            },
        ],
    } as ProdutoComboType,
    {
        id: '667ac28ddd88cc8ad8de6854',
        nome: 'broche rosa',
        preco: 7,
        quantidade_estoque: 0,
        eh_combo: false,
        combo_products: [],
    } as ProdutoIndividualType,
    {
        id: '667c6daf8610658233de73fc',
        nome: 'teste italooooo',
        descricao: 'descricao teste italo',
        preco: 3.14,
        quantidade_estoque: 12,
        eh_combo: false,
        combo_products: [],
    } as ProdutoIndividualType,
];

export default function AdicionarComboScreen({ navigation, route }: { navigation: any; route: any }) {
    const { items }: { items: ProdutosType[] } = route.params;
    // const [items, setItems] = useState<ProdutosType[]>([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const products = await getAllProducts();
    //             setItems(products);
    //         } catch (error) {
    //             console.error('Erro ao buscar produtos:', error);
    //         }
    //     };

    //     fetchProducts();
    // }, []);

    console.log("ITEMS AQUI!! ", items);
    const [produtos, setProdutos] = useState<ProdutosType[]>(items);

    useEffect(() => {
        setProdutos(items);
    }, [items]);

    const [comboNome, setComboNome] = useState('');
    const [comboDescricao, setComboDescricao] = useState('');
    const [comboPreco, setComboPreco] = useState('0');
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [visible, setVisible] = useState(false);
    const [itensDoCombo, setItensDoCombo] = useState<ItemComboType[]>([]);

    const colorScheme = useColorScheme();
    const { theme } = useMaterial3Theme();

    const paperTheme = colorScheme !== 'dark' ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light };

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const handlePrecoChange = (text: string) => {
        text = text.replace('.', '').replace(',', '').replace(/\D/g, '');

        const options = { minimumFractionDigits: 2 };
        const result = new Intl.NumberFormat('pt-BR', options).format(parseFloat(text) / 100);

        result ? setComboPreco(result) : setComboPreco('0,00');
    };

    const handleAdicionarProduto = () => {
        // adicionar endpoint para adicionar produto
        console.log('Adicionar produto');
        console.log('Nome: ' + comboNome);
        console.log('Descrição: ' + comboDescricao);
        console.log('Preço: ' + comboPreco);
    };

    const handleButtonVoltar = () => {
        navigation.navigate('ProdutosEstoque');
        hideDialog();
    };

    const [showDropDown, setShowDropDown] = useState(false);
    const [SelectDivision, setSelectDivision] = useState('');
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);

    const handleAdicionarItemCombo = (nome: string) => {
        console.log("HANDLE ADICIONAR ITEM COMBO ", nome);
        setItensDoCombo((prevItens) => [...prevItens, { nome: nome, quantidade: 1 } as ItemComboType]);
    };

    const handleRemoverItemCombo = (itemId: string) => {
        setItensDoCombo((prevItens) => prevItens.filter((item) => item.nome !== itemId));
        setFormCombo(itensDoCombo.map( (it : ItemComboType) => 
            <AdicionarItemCombo itens={produtos} itemAtual={it} onAddItem={handleAdicionarItemCombo} onRemoveItem={handleRemoverItemCombo} />
        ))
    };

    const handleAdicionarProdutoCombo = async () => {
        const testeId = (Math.random() * (8000 - 1000) + 1000).toString();
        const novoProduto: ProdutoComboType = {
            id: testeId,
            nome: comboNome,
            descricao: comboDescricao,
            quantidade_estoque: 0,
            preco: parseFloat(comboPreco.replace(',', '.')),
            eh_combo: true,
            combo_products: itensDoCombo,
        };

        console.log("NOVO PRODUTO!! ", novoProduto);
        
        try {
            const produtoAdicionado = await postNewProduct(novoProduto);
            console.log("Produto adicionado com sucesso! --> ", produtoAdicionado);
    
            // Atualizar a lista de itens após a adição bem-sucedida
            const newItems = [...items, novoProduto];
            setProdutos(newItems);

        navigation.navigate({
            name: 'ProdutosEstoque'
        });
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        // Trate o erro, por exemplo, exibindo uma mensagem para o usuário
    }
    };

    const [formCombo, setFormCombo] = useState([
        <AdicionarItemCombo itens={produtos} itemAtual={{nome: "", quantidade: 1}} onAddItem={handleAdicionarItemCombo} onRemoveItem={handleRemoverItemCombo} />,
    ]);

    const AdicionarFormCombo = () => {
        setFormCombo([
            ...formCombo,
            <AdicionarItemCombo itens={produtos} itemAtual={{nome: "", quantidade: 1}} onAddItem={handleAdicionarItemCombo} onRemoveItem={handleRemoverItemCombo} />,
        ]);
    };

    const customTextInputTheme = {
        colors: {
            primary: '#2E8EC2', 
            text: 'black',  
            background: 'white', 
        },
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <PaperProvider theme={paperTheme}>
                <View
                    style={{
                        justifyContent: 'space-around',
                    }}
                >
                    <View>
                        <Appbar.Header mode="center-aligned" elevated style={styles.barCima}>
                            <Appbar.BackAction onPress={showDialog} color='white'/>
                            <Appbar.Content title="Adicionar combo" titleStyle={{color: 'white', fontFamily: 'Milky Nice'}}/>
                            {/* <Appbar.Action icon="magnify" onPress={() => console.log("seilaaa")} /> */}
                        </Appbar.Header>
                    </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={styles.infoBox}>
                            <Text variant="titleLarge" style={styles.infoText}>
                        Para adicionar um Combo, os itens que irão compor o combo devem ser adicionados individualmente.
                        </Text>
                    </View>

                            <View style={styles.formContainer}>
                                <View>
                                    <TextInput
                                        mode="outlined"
                                        label="Nome do combo"
                                        value={comboNome}
                                        onChangeText={(text) => setComboNome(text)}
                                        style={styles.input}
                                        theme={customTextInputTheme}
                                    />
                                    <TextInput
                                        mode="outlined"
                                        label="Preço"
                                        value={comboPreco}
                                        onChangeText={(text) => handlePrecoChange(text)}
                                        keyboardType="numeric"
                                        style={styles.input}
                                        theme={customTextInputTheme}
                                    />
                                </View>

                                {formCombo.map((item, index) => (
                                    <View key={index}>
                                        {item}
                                        <Divider style={{ backgroundColor: '#B0B0B0' }} />
                                    </View>
                                ))}

                            <Divider style={{ backgroundColor: '#B0B0B0' }}/>
                            <Button mode="contained" onPress={AdicionarFormCombo} style={{ marginVertical: 20, marginHorizontal: 50 }}>
                                Adicionar outro produto
                            </Button>
                        </View>

                            <View>
                                <Button mode="contained" onPress={handleAdicionarProdutoCombo} style={{marginLeft:95, marginRight:95}} textColor='white' buttonColor='#2196F3'>
                                    Salvar combo
                                </Button>
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
                </View>
            </PaperProvider>
        </ScrollView>
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
        marginLeft: 20,
        marginRight: 20,
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
    barCima: {
        backgroundColor: '#3DACE1',
    },
    dialog: {
        backgroundColor: 'white',
        borderRadius: 3,
    },
    dialog_t: {
        color: 'black',
    },
    infoBox: {
        marginTop: 25,
        marginLeft: 20,
        marginRight:20,
        backgroundColor: '#F6F6FF',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#003D5C',
        borderStyle: 'dashed',  // Borda tracejada
        justifyContent: 'center', // Centraliza os filhos verticalmente
        alignItems: 'center',
    },
    infoText: {
        color: '#003D5C',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'FontParaTexto',
    },
});
