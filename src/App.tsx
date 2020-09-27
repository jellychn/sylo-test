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
            <View style={{backgroundColor: (context.darkTheme) ? '#000000' : '#FFFFFF', flex: 1}}>
            {context.tokenInfoPage
                ? <TokenInfo
                dataFeatched={context.dataFeatched}
                period={context.period} 
                featchData={context.featchData}
                tokenId={context.tokenId}
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