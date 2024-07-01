import React from 'react';
import { Image, StyleSheet, Platform, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function HistoricoScreen() {
    return (
        <LinearGradient colors={['#2E8EC2', '#233E5D']} style={styles.fundo}>
            <Appbar.Header mode="center-aligned" elevated style={{backgroundColor: '#3DACE1'}}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain"/>
                </View>
                {/* <Appbar.BackAction onPress={() => {}} /> */}
                <View style={styles.titleContainer}>
                    <Text style={styles.titulo}>Histórico</Text>
                </View>
                <Appbar.Content title="" color='#F6F6FF' titleStyle={styles.titulo}/>
                <Appbar.Action icon="calendar" color='#F6F6FF' onPress={() => {}} />
                <Appbar.Action icon="magnify" color='#F6F6FF' onPress={() => {}} />
            </Appbar.Header>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        position: 'absolute',
        left: '39%',
        right: '39%',
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    fundo:{
        flex: 1,
        backgroundColor: "black",
    },
    titulo:{
        fontFamily: 'Milky Nice',
        color: '#F6F6FF',
        fontSize: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    logo: {
        width: 40,
        height: 40,
    },
});
