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
    const [items, setItems] = useState<ProdutosType[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getAllProducts();
                setItems(products);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProducts();
    }, []);

    const [produtos, setProdutos] = useState<ProdutosType[]>(items);
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

    const handleAdicionarItemCombo = (itemId: string) => {
        setItensDoCombo((prevItens) => [...prevItens, { id: itemId, quantidade: 1 } as ItemComboType]);
    };

    const handleRemoverItemCombo = (itemId: string) => {
        setItensDoCombo((prevItens) => prevItens.filter((item) => item.id !== itemId));
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
        
        try {
            const produtoAdicionado = await postNewProduct(novoProduto);
            console.log("Produto adicionado com sucesso! --> ", produtoAdicionado);
    
            // Atualizar a lista de itens após a adição bem-sucedida
            const newItems = [...items, novoProduto];
            setProdutos(newItems);

        navigation.navigate({
            name: 'ProdutosEstoque',
            params: {
                items: newItems,
            },
            merge: true,
        });
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        // Trate o erro, por exemplo, exibindo uma mensagem para o usuário
    }
    };

    const [formCombo, setFormCombo] = useState([
        <AdicionarItemCombo itens={items} onAddItem={handleAdicionarItemCombo} onRemoveItem={handleRemoverItemCombo} />,
    ]);

    const AdicionarFormCombo = () => {
        setFormCombo([
            ...formCombo,
            <AdicionarItemCombo itens={items} onAddItem={handleAdicionarItemCombo} onRemoveItem={handleRemoverItemCombo} />,
        ]);
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
                        <Appbar.Header mode="center-aligned" elevated>
                            <Appbar.BackAction onPress={showDialog} />
                            <Appbar.Content title="Adicionar combo" />
                            {/* <Appbar.Action icon="magnify" onPress={() => console.log("seilaaa")} /> */}
                        </Appbar.Header>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <Text variant="titleLarge" style={{ margin: 20 }}>
                                Para adicionar um Combo, os itens que irão compor o combo devem ser adicionados individualmente.
                            </Text>

                            <View style={styles.formContainer}>
                                <View>
                                    <TextInput
                                        mode="outlined"
                                        label="Nome do combo"
                                        value={comboNome}
                                        onChangeText={(text) => setComboNome(text)}
                                        style={styles.input}
                                    />
                                    <TextInput
                                        mode="outlined"
                                        label="Preço"
                                        value={comboPreco}
                                        onChangeText={(text) => handlePrecoChange(text)}
                                        keyboardType="numeric"
                                        style={styles.input}
                                    />
                                </View>

                                {formCombo.map((item, index) => (
                                    <View key={index}>
                                        {item}
                                        <Divider />
                                    </View>
                                ))}

                                <Divider />
                                <Button mode="contained" onPress={AdicionarFormCombo} style={{ marginVertical: 20, marginHorizontal: 50 }}>
                                    Adicionar outro produto
                                </Button>
                            </View>

                            <View>
                                <Button mode="contained" onPress={handleAdicionarProdutoCombo} style={{ margin: 20 }}>
                                    Salvar combo
                                </Button>
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
