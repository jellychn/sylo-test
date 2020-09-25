import React from 'react';

const AppContext = React.createContext();

class AppProvider extends React.Component {
    state = {
        period: 'week',
        featchData: false,
        darkTheme: false,
        tokenInfoPage: false,
        tokenId: ''
    }
    render () {
        return (
            <AppContext.Provider value={{
                state: this.state,
                toggleTheme: () => this.setState({darkTheme: !this.state.darkTheme}),
                updatePeriod: (p) => this.setState({period: p, featchData: true}),
                dataFeatched: () => this.setState({featchData: false}),
                changePage: (bol, id) => this.setState({tokenInfoPage: bol, tokenId: id})
            }}>
            {this.props.children}
            </AppContext.Provider>
        )
    }
}

exports.AppProvider = AppProvider;
exports.AppContext = AppContext;