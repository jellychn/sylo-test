import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Loader = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.loader}>LOADING</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loader: {
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'RawlineSemiBold',
        textAlignVertical: 'center',
        flex: 1
    }
});

export default Loader;