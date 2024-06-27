import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProdutosEstoqueScreen from './ProdutosEstoqueScreen';
import AdicionarProdutoScreen from './AdicionarProdutoScreen';
import AdicionarComboScreen from './AdicionarComboScreen';
import { ItemComboType, ProdutoComboType, ProdutoIndividualType, ProdutosType } from '@/types/types';

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

export default function EstoqueTabScreens({ navigation }: { navigation: any }) {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProdutosEstoque"
                component={ProdutosEstoqueScreen}
                options={{ headerShown: false }}
                initialParams={{
                    items: listaDeProdutos,
                }}
            />
            <Stack.Screen name="AdicionarProduto" component={AdicionarProdutoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AdicionarCombo" component={AdicionarComboScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
