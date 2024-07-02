import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProdutosVendasScreen from './ProdutosVendasScreen';

export default function VendasTabScreens({ navigation }: { navigation: any }) {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProdutosVendasScreen" component={ProdutosVendasScreen} options={{ headerShown: false }} />
            {/* <Stack.Screen name="AdicionarProduto" component={AdicionarProdutoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AdicionarCombo" component={AdicionarComboScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="CarrinhoVendas" component={ProdutosVendasScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
