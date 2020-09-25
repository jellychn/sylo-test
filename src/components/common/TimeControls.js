import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './TimeControls.styles';

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

export default TimeControls;