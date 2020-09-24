import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const TimeControls = ({darkTheme, period, updatePeriod}) => {
    const [times] = useState(['all', 'year', 'month', 'week','day']);

    const controls = times.map((time, index) => {
        if (darkTheme) {
            return <Text style={ (time==period) ? styles.textFocus : styles.textNormalDark} key={ index } onPress={() => updatePeriod(time)}>{ time }</Text>
        } else {
            return <Text style={ (time==period) ? styles.textFocus : styles.textNormal} key={ index } onPress={() => updatePeriod(time)}>{ time }</Text>
        }
    });

    return <View style={styles.timeControlsContainer}>{ controls }</View>
}

const styles = StyleSheet.create({
    timeControlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 16,
    },
    textNormal: {
        color: '#8A96AA',
        fontFamily: 'RawlineMedium',
        fontSize: 15,
        lineHeight: 21,
    },
    textFocus: {
        color: '#F15A29',
        fontFamily: 'RawlineMedium',
        fontSize: 15,
        lineHeight: 21,
    },
    textNormalDark: {
        color: '#646464',
        fontFamily: 'RawlineMedium',
        fontSize: 15,
        lineHeight: 21,
    }
});

export default TimeControls;