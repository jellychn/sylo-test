import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../containers/TokenInfo.styles';
import { AreaChart } from 'react-native-svg-charts';
import { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import * as shape from 'd3-shape';
import PropTypes from 'prop-types';

type GraphProps = {
    darkTheme: boolean,
    tokenRate: any,
    currentTokenRate: any,
    graphData: any,
    gradient: number,
    percentage: number
}

const Graph = ({ darkTheme, tokenRate, currentTokenRate, graphData, gradient, percentage }: GraphProps) => {
    const Line = ({ line }: any) => (
        <Path
            key={'line'}
            d={line}
            stroke={'#F15A29'}
            fill={'none'}
            strokeWidth={'2'}
            strokeOpacity={'0.6'}
        />
    )
    return (
        <View style={ [styles.graphContainer, {borderColor: (darkTheme) ? '#161616' : '#F6F6F6'}] }>
            <View style={ styles.tokenInfo }>
                <Text style={ [styles.rate, {color: (darkTheme) ? '#F6F6F6' : '#495162'}] }>
                    { `$${Number(tokenRate.rate).toFixed(4)}` }
                </Text>
                <Text style={ styles.percentage }>
                    { `${Number(percentage).toFixed(2)}% ($${Number(currentTokenRate).toFixed(20).match(/^-?\d*\.?0*\d{0,2}/)[0]})` }
                </Text>
            </View>

            <AreaChart
                style={ styles.graph }
                data={ graphData }
                contentInset={ { top: 0, bottom: 20 } }
                curve={ shape.curveNatural }
                svg={{
                    stroke: '#F15A29',
                    strokeOpacity: '0.6',
                    strokeWidth: '0',
                    strokeLinejoin: 'round',
                    strokeLinecap: 'round',
                    fill: "url(#gradient)",
                }}>

                <Defs key={ 'gradient' }>
                    <LinearGradient id={ 'gradient' } x1='0%' y1={gradient / 100} x2='0%' y2='0%' gradient-units="userSpaceOnUse">
                        <Stop offset="100%" stopColor="#F15A29" stopOpacity="0.2" />
                        {darkTheme
                        ? <Stop offset="0%" stopColor="#000000" stopOpacity="1" />
                        : <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                        }
                    </LinearGradient>
                </Defs>
                <Line/>
            </AreaChart>
        </View>
    )
}

export default Graph;

Graph.propTypes = {
    darkTheme: PropTypes.bool.isRequired,
    tokenRate: PropTypes.any.isRequired,
    currentTokenRate: PropTypes.number.isRequired,
    graphData: PropTypes.any.isRequired,
    gradient: PropTypes.number.isRequired,
    percentage: PropTypes.number.isRequired  
}