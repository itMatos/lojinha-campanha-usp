import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { StyleSheet, SafeAreaView } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import VendasScreen from '@/screens/VendasScreen';
import EstoqueScreen from '@/screens/EstoqueScreen';
import HistoricoScreen from '@/screens/HistoricoScreen';

const IndexScreen = () => {
    return <VendasScreen />;
};
const renderEstoqueScreen = () => {
    return <EstoqueScreen />;
};
const renderHistoricoScreen = () => {
    return <HistoricoScreen />;
};

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {
            key: 'vendas',
            title: 'Vendas',
            focusedIcon: 'cart-outline',
        },
        {
            key: 'estoque',
            title: 'Estoque',
            focusedIcon: 'warehouse',
        },
        {
            key: 'historico',
            title: 'Histórico',
            focusedIcon: 'history',
        },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        vendas: IndexScreen,
        estoque: renderEstoqueScreen,
        historico: renderHistoricoScreen,
    });

    return (
        <SafeAreaView style={styles.container}>
            <BottomNavigation
                navigationState={{ index, routes: routes as { key: string }[] }}
                onIndexChange={(newIndex) => {
                    setIndex(newIndex);
                }}
                renderScene={renderScene}
                activeColor={Colors[colorScheme ?? 'light'].tint}
                barStyle={{ backgroundColor: Colors[colorScheme ?? 'light'].tabIconDefault }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
