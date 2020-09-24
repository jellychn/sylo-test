import React, {useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/dist/EvilIcons';

import {AppContext} from '../providers/AppProvider';
import {rootUrl} from '../config';
import TrackerCard from '../components/TrackerCard';
import TimeControls from '../components/TimeControls';
import Loader from '../components/Loader';

const Dashboard = ({}) => {
    const [tokens, setTokens] = useState([]);
    const [q, setQ] = useState('');
    const [search, setSearch] = useState(false);
    const [tokensFeatched, setTokensFeatched] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        getTokens();
    }, []);

    getTokens = () => {
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
                        <View style={styles.header}>
                            <View style={[styles.title, {display: (search) ? 'none' : 'flex'}]}>
                                <Text style={[styles.text, {color: (context.state.darkTheme) ? '#F6F6F6' : '#495162'}]} onPress={() => context.toggleTheme()}>
                                    Tracker
                                </Text>
                            </View>
                            <TextInput value={q}
                                style={[
                                    styles.searchBar, 
                                    {borderColor: (context.state.darkTheme) ? '#161616' : '#F6F6F6', 
                                    display: (search) ? 'flex' : 'none', color: (context.state.darkTheme) ? '#F6F6F6' : '#495162'}
                                ]}
                                onChangeText={text => setQ(text)}
                                onSubmitEditing={() => getTokens()}
                            />
                            <Icon name='search' size={30} style={[styles.icon, {color: (context.state.darkTheme) ? '#F6F6F6' : '#495162'}]} onPress={() => setSearch(!search)}></Icon>
                        </View>
                        <TimeControls updatePeriod={context.updatePeriod} period={context.state.period} darkTheme={context.state.darkTheme}/>
                        <ScrollView style={styles.body}>
                            {tokens.map((data, index) => {
                                return <TrackerCard 
                                    key={index} 
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 59,
    },
    header: {
        flexDirection: 'row',
        marginTop: 43,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 23.5,
        paddingTop: 23.5,
    },
    searchBar: {
        height: 40, 
        borderWidth: 2, 
        flex: 1,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,0.1)',
        textAlign: 'center',
        fontSize: 12
    },
    icon: {
        right: 12,
        position: 'absolute',
        alignSelf: 'center',
    },
    title: {
        flex: 1,
    },
    text: {
        fontFamily: 'RawlineMedium',
        fontSize: 18,
        lineHeight: 21,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    }
});

export default Dashboard;