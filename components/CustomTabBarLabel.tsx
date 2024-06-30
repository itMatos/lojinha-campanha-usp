import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const CustomTabBarLabel = ({ label, color }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.fonteTexto, { color }]}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fonteTexto: {
        fontFamily: 'Comfortaa',
        fontSize: 14, // Ajuste o tamanho da fonte conforme necessário
        textAlign: 'center',
    },
});

export default CustomTabBarLabel;
