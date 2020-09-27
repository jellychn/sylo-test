import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
        flexDirection: 'row',
        marginTop: 19,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 24,
        paddingTop: 19,
    },
    symbol: {
        width: 30,
        height: 30,
        marginRight: 12,
    },
    name: {
        textAlignVertical: 'center',
        fontSize: 18,
    },
    icon: {
        position: 'absolute',
        alignSelf: 'center',
    },
    headerInfo: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    graphContainer: {
        borderWidth: 2,
        borderColor: '#F6F6F6',
        borderStyle: 'solid',
        borderRadius: 15,
        marginTop: 8,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 31,
        overflow: 'hidden'
    },
    tokenInfo: {
        paddingTop: 12,
        paddingBottom: 13,
    },
    rate: {
        fontFamily: 'RawlineSemiBold',
        fontSize: 18,
        textAlign: 'center',
    },
    percentage: {
        fontFamily: 'RawlineSemiBold',
        fontSize: 12,
        color: '#33BB5D',
        textAlign: 'center',
    },
    graph: {
        height: 117
    },
    tokenContainer: {
        marginLeft: 34,
        marginRight: 34,
    },
    infomation: {
        fontFamily: 'RawlineMedium',
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 12,
        marginLeft: 47.35,
        marginRight: 47.35
    },
    informationDataWrapper: {
        flexDirection: 'row'
    },
    infomationData: {
        fontFamily: 'RawlineMedium',
        fontSize: 15,
        color: '#8A96AA',
        marginRight: 15,
        marginBottom: 6,
        marginTop: 6,
    }
});