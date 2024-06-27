import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, useColorScheme } from 'react-native';
import { TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { ProdutoIndividualType } from '@/types/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const vw = Dimensions.get('window').width / 100;

export default function AdicionarItemCombo({
    itens,
    onAddItem,
    onRemoveItem,
}: {
    itens: ProdutoIndividualType[];
    onAddItem: (itemId: string) => void;
    onRemoveItem: (itemId: string) => void;
}) {
    const [showDropDown, setShowDropDown] = useState(false);
    const [SelectDivision, setSelectDivision] = useState('');
    const [quantidade, setQuantidade] = useState('1');

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
                value={SelectDivision}
                multiSelect={false}
                setValue={setSelectDivision}
                list={itens.map((item) => ({
                    label: item.nome,
                    value: item.id,
                }))}
                inputProps={{
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
            />
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
