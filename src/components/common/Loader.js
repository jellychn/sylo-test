import React from 'react';
import { View, Text } from 'react-native';
import styles from './Loader.styles';

import { AppContext } from '../../providers/AppProvider';

const Loader = () => {
    return (
        <AppContext.Consumer>
            {(context) => (
                <View style={styles.container}>
                    <Text style={[styles.loader, {color: context.state.darkTheme ? '#F15A29':'#000000'}]}>LOADING</Text>
                </View>
            )}
        </AppContext.Consumer>
    )
};

export default Loader;