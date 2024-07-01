import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { StyleSheet, SafeAreaView } from 'react-native';
import VendasScreen from '@/screens/VendasScreen';
import HistoricoScreen from '@/screens/HistoricoScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, DefaultTheme, PaperProvider, Surface } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EstoqueTabScreens from '@/screens/Estoque/EstoqueScreens';
import CustomTabBarLabel from '../../components/CustomTabBarLabel';



export default function TabLayout() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            id="(tabs)"
            initialRouteName="Vendas"
            screenOptions={{
                headerShown: false,
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                    style={styles.fundo}
                    navigationState={state}
                    safeAreaInsets={insets}
                    activeColor='#003D5C'
                    inactiveColor='#003D5C'
                    onTabPress={({ route, preventDefault }) => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            navigation.dispatch({
                                ...CommonActions.navigate(route.name, route.params),
                                target: state.key,
                            });
                        }
                    }}
                    renderIcon={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        if (options.tabBarIcon) {
                            return options.tabBarIcon({ focused, color, size: 24 });
                        }

                        return null;
                    }}
                    renderLabel={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.key;

                        return <CustomTabBarLabel label={label.toString()} color={color} />;
                    }}
                />
            )}
        >
            <Tab.Screen
                name="Vendas"
                component={VendasScreen}
                options={{
                    tabBarLabel: 'Vendas',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="cart" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="Estoque"
                component={EstoqueTabScreens}
                options={{
                    tabBarLabel: 'Estoque',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="warehouse" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="Histórico"
                component={HistoricoScreen}
                options={{
                    tabBarLabel: 'Histórico',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="history" size={size} color={color} />;
                    },
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fundo:{
        backgroundColor: '#F6F6FF',
    },
});