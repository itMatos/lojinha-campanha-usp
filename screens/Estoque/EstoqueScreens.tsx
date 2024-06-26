import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProdutosEstoqueScreen from './ProdutosEstoqueScreen';
import AdicionarProdutoScreen from './AdicionarProdutoScreen';

export default function EstoqueTabScreens({ navigation }: { navigation: any }) {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProdutosEstoque" component={ProdutosEstoqueScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AdicionarProduto" component={AdicionarProdutoScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
