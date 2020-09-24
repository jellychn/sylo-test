import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';


import config from '../config';


class TrackerCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            tokenData: [],
            tokenRate: [],
            currentTokenRate: 0,
            percentage: '',
            graphData: [],
        };
        this._isMounted = false;
    }

    componentDidMount () {
        this.getTokenData();
        this._isMounted = true;
    }

    componentDidUpdate () {
        if (this.props.featchData) {
            this.getTokenData();
            this.props.dataFeatched();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
     }

    getTokenData = () => {
        axios.get(`${config.rootUrl}/asset/id/${this.props.data.id}`).then(res => {
            this._isMounted && this.setState({tokenData: res.data});
        }).catch(err => {console.log(err);});

        axios.get(`${config.rootUrl}/asset/id/${this.props.data.id}/rate?fiat=NZD&period=${this.props.period}&type=historic`).then(res => {
            let graphData = [];
            for (let i=0;i<res.data.history.length;i++) {
                graphData.push(res.data.history[i].rate);
            }
            this._isMounted && this.setState({
                tokenRate: res.data, 
                graphData: graphData, 
                currentTokenRate: res.data.history[0].rate - res.data.rate,
                percentage: (res.data.history[0].rate - res.data.rate) / res.data.rate * 100
            });
        }).catch(err => {console.log(err);});
    }

    render () {
        return (
            <TouchableOpacity 
                key={this.props.index} 
                style={[styles.trackerCard, 
                {borderColor: (this.props.darkTheme) ? '#161616' : '#F6F6F6'}]} 
                onPress={() => this.props.changePage(true, this.props.data.id)}>

                <View style={styles.trackerInfo}>
                    <Image style={styles.symbol} source={{uri: (this.props.darkTheme) ? this.props.data.icon_address_dark : this.props.data.icon_address}}/>
                    <Text style={[styles.name, {color: (this.props.darkTheme) ? '#F6F6F6' : '#495162'}]}>{this.props.data.name}</Text>
                    <View style={styles.reateInfo}>
                        <Text style={[styles.rate, {color: (this.props.darkTheme) ? '#F6F6F6' : '#495162'}]}>
                            {`$${Number(this.state.tokenRate.rate).toFixed(4)}`}
                        </Text>
                        <Text style={styles.percentage}>
                            {`${Number(this.state.percentage).toFixed(2)}% ($${Number(this.state.currentTokenRate).toFixed(20).match(/^-?\d*\.?0*\d{0,2}/)[0]})`}
                        </Text>
                    </View>
                </View>
                
                <View>
                    <LineChart
                        style={styles.graph}
                        data={ this.state.graphData }
                        contentInset={ { top: 2, bottom: 20 } }
                        curve={shape.curveNatural}
                        svg={{
                            stroke: '#F15A29',
                            strokeOpacity: '0.6',
                            strokeWidth: '3',
                            strokeLinejoin: 'round',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            fill:"none"
                        }}>
                    </LineChart>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    trackerCard: {
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 15,
        marginRight: 16,
        marginTop: 16,
        marginLeft: 16,
        alignSelf: "stretch",
    },
    trackerInfo: {
        paddingTop: 11,
        paddingLeft: 11,
        paddingRight: 11,
        paddingBottom: 11,
        flexDirection: 'row',
        flex: 1,
    },
    symbol: {
        width: 36,
        height: 36,
    },
    name: {
        fontFamily: 'RawlineSemiBold',
        fontSize: 15,
        paddingLeft: 12,
        textAlignVertical: 'center',
    },
    reateInfo: {
        flex: 1,
    },
    rate: {
        fontFamily: 'RawlineSemiBold',
        fontSize: 15,
        textAlign: 'right',
    },
    percentage: {
        color: '#33BB5D',
        fontFamily: 'RawlineSemiBold',
        textAlign: 'right',
        fontSize: 12,
    },
    graph: {
        height: 84,
    }
});

export default TrackerCard;