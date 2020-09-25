import React from 'react';
import { View } from 'react-native';

import {AppProvider, AppContext} from './providers/AppProvider';

import Dashboard from './containers/Dashboard';
import TokenInfo from './containers/TokenInfo';


const App = () => {
    return (        
        <AppProvider>
            <AppContext.Consumer>
            {(context) => (
            <View style={{backgroundColor: (context.state.darkTheme) ? '#000000' : '#FFFFFF', flex: 1}}>
            {context.state.tokenInfoPage
                ? <TokenInfo
                dataFeatched={context.dataFeatched}
                period={context.state.period} 
                featchData={context.state.featchData}
                tokenId={context.state.tokenId}
                />
                : <Dashboard/>
            }
            </View>
             )}
            </AppContext.Consumer>
        </AppProvider>
    );
}

export default App;