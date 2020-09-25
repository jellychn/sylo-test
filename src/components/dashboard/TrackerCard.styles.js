import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    trackerCard: {
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 15,
        marginRight: 16,
        marginTop: 16,
        marginLeft: 16,
        alignSelf: "stretch",
    },
    trackerInfo: {
        paddingTop: 11,
        paddingLeft: 11,
        paddingRight: 11,
        paddingBottom: 11,
        flexDirection: 'row',
        flex: 1,
    },
    symbol: {
        width: 36,
        height: 36,
    },
    name: {
        fontFamily: 'RawlineSemiBold',
        fontSize: 15,
        paddingLeft: 12,
        textAlignVertical: 'center',
    },
    reateInfo: {
        flex: 1,
    },
    rate: {
        fontFamily: 'RawlineSemiBold',
        fontSize: 15,
        textAlign: 'right',
    },
    percentage: {
        color: '#33BB5D',
        fontFamily: 'RawlineSemiBold',
        textAlign: 'right',
        fontSize: 12,
    },
    graph: {
        height: 84,
    }
});