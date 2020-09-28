import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';

import { AppContext } from '../providers/AppProvider';
import {rootUrl} from '../utils/config';
import {calculateTokenGraphValues} from '../utils/common-functions';

import TimeControls from '../components/common/TimeControls';
import Loader from '../components/common/Loader';
import Header from '../components/tokenInfo/Header';
import Graph from '../components/tokenInfo/Graph';
import Information from '../components/tokenInfo/Infomation';

type TokenInfoProps = {
    tokenId: string,
    period: string, 
    featchData: boolean, 
    dataFeatched: Function
}

const TokenInfo = ({ tokenId, period, featchData, dataFeatched }: TokenInfoProps) => {
    const [tokenRate, setTokenRate] = useState<Array<any>>([]);
    const [tokenData, setTokenData] = useState<Array<any>>([]);
    const [currentTokenRate, setCurrentTokenRate] = useState<number>(0);
    const [percentage, setPercentage] = useState<number>(0);
    const [graphData, setGraphData] = useState<Array<any>>([]);
    const [gradient, setGradient] = useState<number>(0);
    const [tokenRateLoaded, setTokenRateLoaded] = useState<boolean>(false);
    const [tokenDataLoaded, setTokenDataLoaded] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        getTokenData();
        getTokenRate();
    }, []);

    useEffect(() => {
        if (featchData) {
            dataFeatched();
            getTokenData();
            getTokenRate();
        }
    });

    const getTokenData = async () => {
        const url:string = `${ rootUrl }/asset/id/${ tokenId }`;
        axios.get(url).then(res => {
            setTokenData(res.data);
            setTokenDataLoaded(true);
        }).catch(err => {
            setError(true);
        });
    }

    const getTokenRate = () => {
        const url:string = `${ rootUrl }/asset/id/${tokenId}/rate?fiat=NZD&period=${period}&type=historic&has_history_only=true`;
        axios.get(url).then(res => {
            const calculatedValues = calculateTokenGraphValues(res.data);

            setTokenRate(res.data);
            setGraphData(calculatedValues.graphData);
            setCurrentTokenRate(calculatedValues.currentTokenRate);
            setPercentage(calculatedValues.percentage);
            setGradient(calculatedValues.gradient);
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
                            darkTheme={ context.darkTheme } 
                            changePage= {context.changePage } 
                            tokenData={ tokenData } 
                            toggleTheme={ context.toggleTheme }
                        />
                        <TimeControls 
                            updatePeriod={ context.updatePeriod } 
                            period={ context.period } 
                            darkTheme={ context.darkTheme }
                        />
                        <Graph 
                            darkTheme={ context.darkTheme } 
                            tokenRate={ tokenRate } 
                            currentTokenRate={ currentTokenRate } 
                            graphData={ graphData } 
                            gradient={ gradient }
                            percentage={ percentage }
                        />
                        <Information 
                            darkTheme={ context.darkTheme } 
                            tokenData={ tokenData } 
                            tokenRate={ tokenRate }
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

TokenInfo.propTypes = {
    tokenId: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired, 
    featchData: PropTypes.bool.isRequired, 
    dataFeatched: PropTypes.func.isRequired
}