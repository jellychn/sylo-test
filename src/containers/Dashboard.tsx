import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './Dashboard.styles';
import axios from 'axios';

import { AppContext } from '../providers/AppProvider';
import { rootUrl } from '../utils/config';

import TrackerCard from '../components/dashboard/TrackerCard';
import TimeControls from '../components/common/TimeControls';
import Loader from '../components/common/Loader';
import Header from '../components/dashboard/Header';

const Dashboard = ({}) => {
    const [tokens, setTokens] = useState<any>([]);
    const [q, setQ] = useState<string>('');
    const [search, setSearch] = useState<boolean>(false);
    const [tokensFeatched, setTokensFeatched] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        getTokens();
    }, []);

    const getTokens = async () => {
        let url:string = '';
        if (q.length > 0) {
            url = `${rootUrl}/all?take=50&blockchain=ethereum&search=${q}&has_history_only=true`;
        } else {
            url = `${rootUrl}/all`;
        }

        axios.get(url).then(res => {
            setTokens(res.data);
            setTokensFeatched(true);
        }).catch(err => {setError(true)});
    }

    if (tokensFeatched) {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <View style={ styles.container }>
                        <Header 
                            darkTheme={ context.darkTheme } 
                            toggleTheme={ context.toggleTheme } 
                            q={ q } 
                            search={ search } 
                            setQ={ setQ } 
                            getTokens={ getTokens }
                            setSearch={ setSearch }
                        />
                        <TimeControls updatePeriod={ context.updatePeriod } period={ context.period } darkTheme={ context.darkTheme }/>
                        <ScrollView>
                            {tokens.map((data:any, index:number) => {
                                return <TrackerCard 
                                    key={ data.id } 
                                    index={ index } 
                                    data={ data } 
                                    period={ context.period }
                                    featchData={ context.featchData }
                                    dataFeatched={ context.dataFeatched }
                                    darkTheme={ context.darkTheme } 
                                    changePage={ context.changePage }
                                    />
                            })}
                        </ScrollView>
                    </View>
                )}
            </AppContext.Consumer>
        )
    } else {
        return <Loader/>
    }
}

export default Dashboard;
