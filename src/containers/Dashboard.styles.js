import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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