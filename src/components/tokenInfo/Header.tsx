import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from '../../containers/TokenInfo.styles';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import PropTypes from 'prop-types';

type HeaderProps = {
    darkTheme: boolean,
    changePage: Function,
    tokenData: any,
    toggleTheme: Function
}

const Header = ({darkTheme, changePage, tokenData, toggleTheme}: HeaderProps) => {
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

export default Header;

Header.protoTypes = {
    darkTheme: PropTypes.bool.isRequired,
    changePage: PropTypes.func.isRequired,
    tokenData: PropTypes.any.isRequired,
    toggleTheme: PropTypes.func.isRequired
}