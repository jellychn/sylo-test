import React from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/dist/EvilIcons';

import {AppContext} from '../providers/AppProvider';
import config from '../config';
import TrackerCard from '../components/TrackerCard';
import TimeControls from '../components/TimeControls';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            tokens: [],
            q: '',
            search: false
        };
    }

    componentDidMount () {
        this.getTokens();
    }

    getTokens = () => {
        if (this.state.q.length > 0) {
            axios.get(`${config.rootUrl}/all?take=50&blockchain=ethereum&search=${this.state.q}&has_history_only=true`).then(res => {
                this.setState({tokens: res.data, featched: true});
            }).catch(err => {console.log(err);});
        } else {
            axios.get(config.rootUrl + '/all').then(res => {
                this.setState({tokens: res.data, featched: true});
            }).catch(err => {console.log(err);});
        }
    }

    onChangeText = (text) => {
        this.setState({q:text});
    }

    toggleSearch = () => {
        this.setState({search: !this.state.search});
    }

    render () {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View style={[styles.title, {display: (this.state.search) ? 'none' : 'flex'}]}>
                                <Text style={[styles.text, {color: (context.state.darkTheme) ? '#F6F6F6' : '#495162'}]} onPress={() => context.toggleTheme()}>
                                    Tracker
                                </Text>
                            </View>
                            <TextInput value={this.state.q}
                                style={[
                                    styles.searchBar, 
                                    {borderColor: (context.state.darkTheme) ? '#161616' : '#F6F6F6', 
                                    display: (this.state.search) ? 'flex' : 'none', color: (context.state.darkTheme) ? '#F6F6F6' : '#495162'}
                                ]}
                                onChangeText={text => this.onChangeText(text)}
                                onSubmitEditing={() => this.getTokens()}
                            />
                            <Icon name='search' size={30} style={[styles.icon, {color: (this.context.darkTheme) ? '#F6F6F6' : '#495162'}]} onPress={() => this.toggleSearch()}></Icon>
                        </View>
                        <TimeControls updatePeriod={context.updatePeriod} period={context.state.period} darkTheme={this.context.darkTheme}/>
                        <ScrollView style={styles.body}>
                            {this.state.tokens.map((data, index) => {
                                return <TrackerCard key={index} 
                                index={index} data={data} 
                                period={context.state.period}
                                featchData={context.state.featchData}
                                dataFeatched={context.dataFeatched}
                                darkTheme={context.state.darkTheme} 
                                changePage={context.changePage}/>
                            })}
                        </ScrollView>
                    </View>
                )}
            </AppContext.Consumer>
        )
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