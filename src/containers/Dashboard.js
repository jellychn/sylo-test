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
    const [tokens, setTokens] = useState([]);
    const [q, setQ] = useState('');
    const [search, setSearch] = useState(false);
    const [tokensFeatched, setTokensFeatched] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        getTokens();
    }, []);

    getTokens = async () => {
        let url = '';
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
                    <View style={styles.container}>
                        <Header 
                            darkTheme={context.state.darkTheme} 
                            toggleTheme={context.toggleTheme} 
                            q={q} 
                            search={search} 
                            setQ={setQ} 
                            getTokens={getTokens}
                            setSearch={setSearch}
                        />
                        <TimeControls updatePeriod={context.updatePeriod} period={context.state.period} darkTheme={context.state.darkTheme}/>
                        <ScrollView style={styles.body}>
                            {tokens.map((data, index) => {
                                return <TrackerCard 
                                    key={data.id} 
                                    index={index} 
                                    data={data} 
                                    period={context.state.period}
                                    featchData={context.state.featchData}
                                    dataFeatched={context.dataFeatched}
                                    darkTheme={context.state.darkTheme} 
                                    changePage={context.changePage}
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