import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';

import { AppContext } from '../providers/AppProvider';
import {rootUrl} from '../utils/config';

import TimeControls from '../components/common/TimeControls';
import Loader from '../components/common/Loader';
import Header from '../components/tokenInfo/Header';
import Graph from '../components/tokenInfo/Graph';
import Information from '../components/tokenInfo/Infomation';


const TokenInfo = ({tokenId, period, featchData, dataFeatched}) => {
    const [tokenRate, setTokenRate] = useState([]);
    const [tokenData, setTokenData] = useState([]);
    const [currentTokenRate, setCurrentTokenRate] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [graphData, setGraphData] = useState([]);
    const [gradient, setGradient] = useState([]);
    const [tokenRateLoaded, setTokenRateLoaded] = useState(false);
    const [tokenDataLoaded, setTokenDataLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        getTokenData();
    }, []);

    useEffect(() => {
        if (featchData) {
            dataFeatched();
            getTokenData();
        }
    });

    getTokenData = () => {
        axios.get(`${rootUrl}/asset/id/${tokenId}`).then(res => {
            setTokenData(res.data);
            setTokenDataLoaded(true);
        }).catch(err => {
            setError(true);
        });

        axios.get(`${rootUrl}/asset/id/${tokenId}/rate?fiat=NZD&period=${period}&type=historic&has_history_only=true`).then(res => {
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
            setTokenRate(res.data);
            setGraphData(graphData);
            setCurrentTokenRate(res.data.history[0].rate - res.data.rate);
            setPercentage((res.data.history[0].rate - res.data.rate) / res.data.rate * 100);
            setGradient(100 - (min/max) * 100);
            setTokenRateLoaded(true);
        }).catch(err => {
            setError(true);
        });
    }

    if (tokenDataLoaded && tokenRateLoaded) {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <View>
                        <Header 
                            darkTheme={context.state.darkTheme} 
                            changePage={context.changePage} 
                            tokenData={tokenData} 
                            toggleTheme={context.toggleTheme}
                        />
                        <TimeControls 
                            updatePeriod={context.updatePeriod} 
                            period={context.state.period} 
                            darkTheme={context.state.darkTheme}
                        />
                        <Graph 
                            darkTheme={context.state.darkTheme} 
                            tokenRate={tokenRate} 
                            currentTokenRate={currentTokenRate} 
                            graphData={graphData} 
                            gradient={gradient}
                            percentage={percentage}
                        />
                        <Information 
                            darkTheme={context.state.darkTheme} 
                            tokenData={tokenData} 
                            tokenRate={tokenRate}
                        />
                    </View>
                )}
            </AppContext.Consumer>
        )
    } else {
        return <Loader/>
    }
}

export default TokenInfo;