import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    menuContainer: {
        width: '100%',
        backgroundColor: '#33333333',
        height: 80,
        margin: 5,
        padding: 10,
        borderRadius: 5,
    },
    container: {
        backgroundColor: 'white',
        width: '100%',
        minHeight: '100%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    menuItemName: {
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 5,
        color: '#333'
    },
    menuItemValue: {
        fontWeight: 'bold',
        fontSize: 28,
        marginTop: 5,
        color: '#333'
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        width: '100%',
        marginLeft: 5,
        marginBottom: 20,
    }
});