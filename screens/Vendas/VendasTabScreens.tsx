import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProdutosVendasScreen from './ProdutosVendasScreen';
import { ProdutoVendaType, ProdutosType } from '@/types/types';
import * as CampanhaApiService from '@/services/CampanhaApi';
import CarrinhoScreen from './CarrinhoScreen';
import PagamentoScreen from './PagamentoScreen';

export default function VendasTabScreens({ navigation }: { navigation: any }) {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProdutosVendasScreen"
                component={ProdutosVendasScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="CarrinhoScreen" component={CarrinhoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PagamentoScreen" component={PagamentoScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
