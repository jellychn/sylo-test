import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './TrackerCard.styles';
import axios from 'axios';
import { LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import PropTypes from 'prop-types';

import { rootUrl } from '../../utils/config';
import { calculateTokenGraphValues } from '../../utils/common-functions';

type TrackerCardProps = {
    data: any,
    period: string,
    featchData: boolean,
    dataFeatched: Function,
    index: number,
    darkTheme: boolean,
    changePage: Function,
}

type TrackerCardState = {
    tokenRate: any,
    currentTokenRate: number,
    percentage: number,
    graphData: any,
    error: boolean
}

class TrackerCard extends React.Component<TrackerCardProps, TrackerCardState> {
    static propTypes = {
        data: PropTypes.any.isRequired,
        period: PropTypes.string.isRequired,
        featchData: PropTypes.bool.isRequired,
        dataFeatched: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        darkTheme: PropTypes.bool.isRequired,
        changePage: PropTypes.func.isRequired
    }
    _isMounted: boolean;
    constructor(props:any) {
        super(props);
        this.state = { 
            tokenRate: [],
            currentTokenRate: 0,
            percentage: 0,
            graphData: [],
            error: false
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
        const url:string = `${rootUrl}/asset/id/${this.props.data.id}/rate?fiat=NZD&period=${this.props.period}&type=historic`;
        axios.get(url).then(res => {
            const calculatedValues = calculateTokenGraphValues(res.data);

            this._isMounted && this.setState({
                tokenRate: res.data, 
                graphData: calculatedValues.graphData, 
                currentTokenRate: calculatedValues.currentTokenRate,
                percentage: calculatedValues.percentage
            });
        }).catch(err => { this.setState({error:true}) });
    }

    render () {
        return (
            <TouchableOpacity 
                key={ this.props.index } 
                style={ [styles.trackerCard, {borderColor: (this.props.darkTheme) ? '#161616' : '#F6F6F6'}] } 
                onPress={ () => this.props.changePage(true, this.props.data.id) }>

                <View style={ styles.trackerInfo }>
                    <Image style={ styles.symbol } source={ {uri: (this.props.darkTheme) ? this.props.data.icon_address_dark : this.props.data.icon_address} }/>
                    <Text style={ [styles.name, {color: (this.props.darkTheme) ? '#F6F6F6' : '#495162'}] }>
                        {this.props.data.name}
                    </Text>
                    <View style={ styles.reateInfo }>
                        <Text style={ [styles.rate, {color: (this.props.darkTheme) ? '#F6F6F6' : '#495162'}] }>
                            { `$${Number(this.state.tokenRate.rate).toFixed(4)}` }
                        </Text>
                        <Text style={ styles.percentage }>
                            { `${Number(this.state.percentage).toFixed(2)}% ($${Number(this.state.currentTokenRate).toFixed(20).match(/^-?\d*\.?0*\d{0,2}/)[0]})` }
                        </Text>
                    </View>
                </View>
                
                <View>
                    <LineChart
                        style={ styles.graph }
                        data={ this.state.graphData }
                        contentInset={ { top: 2, bottom: 20 } }
                        curve={ shape.curveNatural }
                        svg={{
                            stroke: '#F15A29',
                            strokeOpacity: '0.6',
                            strokeWidth: '3',
                            strokeLinejoin: 'round',
                            strokeLinecap: 'round',
                            fill:"none"
                        }}>
                    </LineChart>
                </View>
            </TouchableOpacity>
        )
    }
}

export default TrackerCard;