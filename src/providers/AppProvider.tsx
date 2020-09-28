import React from 'react';


type ContextProps = { 
    period: string,
    featchData: boolean,
    darkTheme: boolean,
    tokenInfoPage: boolean,
    tokenId: string,
    toggleTheme: Function,
    updatePeriod: Function,
    dataFeatched: Function,
    changePage: Function
};

export const AppContext = React.createContext<Partial<ContextProps>>({});


export class AppProvider extends React.Component {
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
                period: this.state.period,
                featchData: this.state.featchData,
                darkTheme: this.state.darkTheme,
                tokenInfoPage: this.state.tokenInfoPage,
                tokenId: this.state.tokenId,
                toggleTheme: () => this.setState({darkTheme: !this.state.darkTheme}),
                updatePeriod: (p: string) => this.setState({period: p, featchData: true}),
                dataFeatched: () => this.setState({featchData: false}),
                changePage: (bol: boolean, id: string) => this.setState({tokenInfoPage: bol, tokenId: id})
            }}>
            {this.props.children}
            </AppContext.Provider>
        )
    }
}
