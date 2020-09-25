import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../containers/TokenInfo.styles';

const Infomation = ({darkTheme, tokenData, tokenRate}) => {
    return (
        <View style={styles.tokenContainer}>
            <Text style={[styles.infomation, {color: (darkTheme) ? '#F6F6F6' : '#495162'}]}>
                Information
            </Text>
            <View style={styles.informationDataWrapper}>
                <View>
                    <Text style={[styles.infomationData, {color: (darkTheme ? '#646464' : '#8A96AA')}]}>
                        Symbol:
                    </Text>
                    <Text style={[styles.infomationData, {color: (darkTheme ? '#646464' : '#8A96AA')}]}>
                        Market Cap:
                    </Text>
                    <Text style={[styles.infomationData, {color: (darkTheme ? '#646464' : '#8A96AA')}]}>
                        24h Volume:
                    </Text>
                </View>

                <View>
                    <Text style={[styles.infomationData, {color: (darkTheme ? '#646464' : '#8A96AA')}]}>
                        {tokenData.symbol}
                    </Text>
                    <Text style={[styles.infomationData, {color: (darkTheme ? '#646464' : '#8A96AA')}]}>
                        {`$${Number(tokenRate.market_cap).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ${tokenRate.fiat_symbol}`}
                    </Text>
                    <Text style={[styles.infomationData, {color: (darkTheme ? '#646464' : '#8A96AA')}]}>
                        {`$${Number(tokenRate.volume_24h).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ${tokenRate.fiat_symbol}`}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Infomation;