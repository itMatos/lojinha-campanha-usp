import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { ItemComboType, ProdutoIndividualType, ProdutosType } from '@/types/types';
import { Button } from 'react-native-paper';

const vw = Dimensions.get('window').width / 100;

export default function AtualizarItemCombo({
    itens,
    itemAtual,
    onAddItem,
    onRemoveItem,
}: {
    itens: ProdutosType[];
    itemAtual: ItemComboType;
    onAddItem: (itemId: string) => void;
    onRemoveItem: (itemId: string) => void;
}) {
    console.log("RECEBI ITENS AQUI", itens, "item atual: " , itemAtual);

    const [showDropDown, setShowDropDown] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(itemAtual.nome);
    const [quantidade, setQuantidade] = useState(itemAtual.quantidade.toString());

    const filteredList = itens
        .filter((item) => !item.eh_combo)
        .map((item) => ({
            label: item.nome,
            value: item.nome,
        }));

    filteredList.forEach((item) => {
        console.log("item: ", item.label, item.value);
    });

    const handleSelectedValue = (value : string) => {
        setSelectedProduct(value);
        onAddItem(value);
        setShowDropDown(false);
    }

    const customTextInputTheme = {
        colors: {
            primary: '#2E8EC2', 
            text: 'black',  
             background: 'white', 
        },
    };

    return (
        <View style={styles.formContainer}> 
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
                value={selectedProduct}
                multiSelect={false}
                // setValue={setSelectedProduct}       
                setValue={handleSelectedValue}
                list={filteredList}
                inputProps={{
                    style: { backgroundColor: 'white' },
                    right: <TextInput.Icon icon="chevron-down" />, // Assuming this is a valid icon name
                }}
                />
            <TextInput
                label="Quantidade"
                value={quantidade}
                onChangeText={(text) => setQuantidade(text)}
                keyboardType="numeric"
                mode="outlined"
                style={{ marginTop: 10 }}
                theme={customTextInputTheme}
            />
            <Button icon="trash-can" mode="contained-tonal" style={styles.buttonQuantidade} onPress={() => onRemoveItem(selectedProduct)}>
                Remover
            </Button>
        </View>
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
    buttonQuantidade: {
        flex: 0.1,
        margin: 0,
        backgroundColor: '#3DACE1',
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
