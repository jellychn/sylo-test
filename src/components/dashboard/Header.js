import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../../containers/Dashboard.styles';
import Icon from 'react-native-vector-icons/dist/EvilIcons';

const Header = ({darkTheme, toggleTheme, q, search, setQ, getTokens, setSearch}) => {
    return (
        <View style={styles.header}>
            <View style={[styles.title, {display: (search) ? 'none' : 'flex'}]}>
                <Text style={[styles.text, {color: (darkTheme) ? '#F6F6F6' : '#495162'}]} onPress={() => toggleTheme()}>
                    Tracker
                </Text>
            </View>
            <TextInput value={q}
                style={[
                    styles.searchBar, 
                    {borderColor: (darkTheme) ? '#161616' : '#F6F6F6', 
                    display: (search) ? 'flex' : 'none', color: (darkTheme) ? '#F6F6F6' : '#495162'}
                ]}
                onChangeText={text => setQ(text)}
                onSubmitEditing={() => getTokens()}
            />
            <Icon name='search' size={30} style={[styles.icon, {color: (darkTheme) ? '#F6F6F6' : '#495162'}]} onPress={() => setSearch(!search)}/>
        </View>
    )
}

export default Header;