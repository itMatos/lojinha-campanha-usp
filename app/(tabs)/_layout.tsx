import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { StyleSheet, SafeAreaView } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import VendasScreen from '@/screens/VendasScreen';
import EstoqueScreen from '@/screens/EstoqueScreen';
import HistoricoScreen from '@/screens/HistoricoScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

const RenderVendasScreen = () => {
    return <VendasScreen />;
};
const RenderEstoqueScreen = () => {
    return <EstoqueScreen />;
};
const RenderHistoricoScreen = () => {
    return <HistoricoScreen />;
};

const Tab = createMaterialBottomTabNavigator();

export default function TabLayout() {
    const colorScheme = useColorScheme();
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Vendas"
                component={RenderVendasScreen}
                options={{
                    tabBarLabel: 'Vendas',
                    tabBarIcon: 'cart-outline',
                }}
            />
            <Tab.Screen
                name="Estoque"
                component={RenderEstoqueScreen}
                options={{
                    tabBarLabel: 'Estoque',
                    tabBarIcon: 'warehouse',
                }}
            />
            <Tab.Screen
                name="Histórico"
                component={RenderEstoqueScreen}
                options={{
                    tabBarIcon: 'history',
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
