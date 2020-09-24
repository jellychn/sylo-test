import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import axios from 'axios'; 
import { AreaChart } from 'react-native-svg-charts';
import {
    Defs,
    LinearGradient,
    Stop,
    Path
  } from 'react-native-svg';
import * as shape from 'd3-shape';
import Icon from 'react-native-vector-icons/dist/EvilIcons';

import { AppContext } from '../providers/AppProvider';
import config from '../config';
import TimeControls from '../components/TimeControls';

class TokenInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tokenRate: [], 
            tokenData: [],
            currentTokenRate: 0,
            percentage: 0,
            graphData: []
        };
    }

    componentDidMount () {
        this.getTokenData();
    }

    componentDidUpdate () {
        if (this.props.featchData) {
            this.getTokenData();
            this.props.dataFeatched();
        }
    }

    getTokenData = () => {
        axios.get(`${config.rootUrl}/asset/id/${this.props.tokenId}`).then(res => {
            this.setState({tokenData: res.data});
        }).catch(err => {console.log(err);});

        axios.get(`${config.rootUrl}/asset/id/${this.props.tokenId}/rate?fiat=NZD&period=${this.props.period}&type=historic&has_history_only=true`).then(res => {
            let graphData = [];
            let max = 0;
            let min = Infinity;
            for (let i=0;i<res.data.history.length;i++) {
                graphData.push(res.data.history[i].rate);
                if (res.data.history[i].rate > max) {
                    max = res.data.history[i].rate;
                }

                if (res.data.history[i].rate < min) {
                    min = res.data.history[i].rate;
                }
            }
            this.setState({
                tokenRate: res.data, 
                graphData: graphData, 
                currentTokenRate: res.data.history[0].rate - res.data.rate,
                percentage: (res.data.history[0].rate - res.data.rate) / res.data.rate * 100,
                gradient: 100 - (min/max) * 100
            });
        }).catch(err => {console.log(err);});
    }

    render () {
        const Line = ({ line }) => (
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
            <AppContext.Consumer>
                {(context) => (
                    <View>
                        <View style={styles.header}>
                            <Icon name='chevron-left' 
                                size={60} style={[styles.icon, {color: (context.state.darkTheme) ? '#F6F6F6' : '#495162'}]} 
                                onPress={() => context.changePage(false)}/>
                            <View style={styles.headerInfo}>
                                <Image style={styles.symbol} source={{uri: (context.state.darkTheme) ? this.state.tokenData.icon_address_dark : this.state.tokenData.icon_address}}/>
                                <Text style={[styles.name, {color: (context.state.darkTheme) ? '#F6F6F6' : '#495162'}]} onPress={() => context.toggleTheme()}>
                                    {this.state.tokenData.name}
                                </Text>
                            </View>
                        </View>

                        <TimeControls updatePeriod={context.updatePeriod} period={this.props.period} darkTheme={context.state.darkTheme}/>

                        <View style={[styles.graphContainer, {borderColor: (context.state.darkTheme) ? '#161616' : '#F6F6F6'}]}>
                            <View style={styles.tokenInfo}>
                                <Text style={[styles.rate, {color: (context.state.darkTheme) ? '#F6F6F6' : '#495162'}]}>
                                    {`$${Number(this.state.tokenRate.rate).toFixed(4)}`}
                                </Text>
                                <Text style={styles.percentage}>
                                    {`${Number(this.state.percentage).toFixed(2)}% ($${Number(this.state.currentTokenRate).toFixed(20).match(/^-?\d*\.?0*\d{0,2}/)[0]})`}
                                </Text>
                            </View>

                            <AreaChart
                                style={styles.graph}
                                data={ this.state.graphData }
                                contentInset={ { top: 0, bottom: 20 } }
                                curve={shape.curveNatural}
                                svg={{
                                    stroke: '#F15A29',
                                    strokeOpacity: '0.6',
                                    strokeWidth: '0',
                                    strokeLinejoin: 'round',
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round',
                                    fill: "url(#gradient)",
                                }}>
                                {context.state.darkTheme
                                ?<Defs key={'gradient'} style={styles.linearGradient}>
                                    <LinearGradient id={'gradient'} x1='0%' y1={this.state.gradient / 100} x2='0%' y2='0%' gradient-units="userSpaceOnUse" style={styles.linearGradient}>
                                        <Stop offset="100%" stopColor="#F15A29" stopOpacity="0.2" />
                                        <Stop offset="0%" stopColor="#000000" stopOpacity="1" />
                                    </LinearGradient>
                                </Defs>
                                :<Defs key={'gradient'}>
                                    <LinearGradient id={'gradient'} x1='0%' y1={this.state.gradient / 100} x2='0%' y2='0%' gradient-units="userSpaceOnUse" style={styles.linearGradient}>
                                        <Stop offset="100%" stopColor="#F15A29" stopOpacity="0.2" />
                                        <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                                    </LinearGradient>
                                </Defs>
                                }
                                <Line/>
                            </AreaChart>
                        </View>

                        <View style={styles.tokenContainer}>
                            <Text style={[styles.infomation, {color: (context.state.darkTheme) ? '#F6F6F6' : '#495162'}]}>
                                Information
                            </Text>
                            <View style={styles.informationDataWrapper}>
                                <View>
                                    <Text style={[styles.infomationData, {color: (context.state.darkTheme ? '#646464' : '#8A96AA')}]}>
                                        Symbol:
                                    </Text>
                                    <Text style={[styles.infomationData, {color: (context.state.darkTheme ? '#646464' : '#8A96AA')}]}>
                                        Market Cap:
                                    </Text>
                                    <Text style={[styles.infomationData, {color: (context.state.darkTheme ? '#646464' : '#8A96AA')}]}>
                                        24h Volume:
                                    </Text>
                                </View>

                                <View>
                                    <Text style={[styles.infomationData, {color: (context.state.darkTheme ? '#646464' : '#8A96AA')}]}>
                                        {this.state.tokenData.symbol}
                                    </Text>
                                    <Text style={[styles.infomationData, {color: (context.state.darkTheme ? '#646464' : '#8A96AA')}]}>
                                        {`$${Number(this.state.tokenRate.market_cap).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ${this.state.tokenRate.fiat_symbol}`}
                                    </Text>
                                    <Text style={[styles.infomationData, {color: (context.state.darkTheme ? '#646464' : '#8A96AA')}]}>
                                        {`$${Number(this.state.tokenRate.volume_24h).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ${this.state.tokenRate.fiat_symbol}`}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </AppContext.Consumer>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        marginTop: 19,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 24,
        paddingTop: 19,
    },
    symbol: {
        width: 30,
        height: 30,
        marginRight: 12,
    },
    name: {
        textAlignVertical: 'center',
        fontSize: 18,
    },
    icon: {
        position: 'absolute',
        alignSelf: 'center',
    },
    headerInfo: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    graphContainer: {
        borderWidth: 2,
        borderColor: '#F6F6F6',
        borderStyle: 'solid',
        borderRadius: 15,
        marginTop: 8,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 31,
        overflow: 'hidden'
    },
    tokenInfo: {
        paddingTop: 12,
        paddingBottom: 13,
    },
    rate: {
        fontFamily: 'RawlineSemiBold',
        fontSize: 18,
        textAlign: 'center',
    },
    percentage: {
        fontFamily: 'RawlineSemiBold',
        fontSize: 12,
        color: '#33BB5D',
        textAlign: 'center',
    },
    graph: {
        height: 117
    },
    tokenContainer: {
        marginLeft: 34,
        marginRight: 34,
    },
    infomation: {
        fontFamily: 'RawlineMedium',
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 12,
        marginLeft: 47.35,
        marginRight: 47.35
    },
    informationDataWrapper: {
        flexDirection: 'row'
    },
    infomationData: {
        fontFamily: 'RawlineMedium',
        fontSize: 15,
        color: '#8A96AA',
        marginRight: 15,
        marginBottom: 6,
        marginTop: 6,
    }
});

export default TokenInfo;