import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import ProdutosEstoqueScreen from './ProdutosEstoqueScreen';
import AdicionarProdutoScreen from './AdicionarProdutoScreen';
import AdicionarComboScreen from './AdicionarComboScreen';

const Stack = createNativeStackNavigator();

export default function EstoqueTabScreens({ navigation }: { navigation: any }) {
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#2E8EC2', '#233E5D']} style={styles.gradient}>
                <Stack.Navigator >
                    <Stack.Screen name="ProdutosEstoque" component={ProdutosEstoqueScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="AdicionarProduto" component={AdicionarProdutoScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="AdicionarCombo" component={AdicionarComboScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
});
