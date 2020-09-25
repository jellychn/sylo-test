import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from '../../containers/TokenInfo.styles';
import Icon from 'react-native-vector-icons/dist/EvilIcons';

const header = ({darkTheme, changePage, tokenData, toggleTheme}) => {
    return (
        <View style={styles.header}>
            <Icon name='chevron-left' 
                size={60} style={[styles.icon, {color: (darkTheme) ? '#F6F6F6' : '#495162'}]} 
                onPress={() => changePage(false)}
            />
            <View style={styles.headerInfo}>
                <Image style={styles.symbol} source={{uri: (darkTheme) ? tokenData.icon_address_dark : tokenData.icon_address}}/>
                <Text style={[styles.name, {color: (darkTheme) ? '#F6F6F6' : '#495162'}]} onPress={() => toggleTheme()}>
                    {tokenData.name}
                </Text>
            </View>
        </View>
    )
}

export default header;