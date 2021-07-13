import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    menuContainer: {
        width: Dimensions.get('window').width/2 - 40,
        backgroundColor: '#33333333',
        height: 120,
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    menuItemName: {
        fontWeight: 'bold',
        fontSize: 20,
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