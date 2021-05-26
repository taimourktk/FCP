import { StyleSheet, Dimensions } from 'react-native';

const styles = {
    container: {
        textAlign: 'center',
        width: '100%',
        minHeight: '100%',
        backgroundColor: 'white',
        marginBottom: 50
    },
    imageContainer: {
        marginLeft: 20,
        marginBottom: 20,
        overflow: 'hidden',
        flexDirection: 'row',

    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    infoTitleContainer: {
        width: (Dimensions.get('window').width - 40)/2 - 50,
        justifyContent: 'flex-end',
        padding: 10,
    },
    infoDetailContainer: {
        width: (Dimensions.get('window').width - 40)/2,
        justifyContent: 'flex-end',
        padding: 10,
    },
    infoTitle: {
        display: 'flex',
        justifyContent: 'flex-end',
        textAlign: 'right',
    },
    menuContainer: {
        width: '100%',
        backgroundColor: '#33333333',
        height: 80,
        margin: 5,
        padding: 10,
        borderRadius: 5,
    },
    menuItemName: {
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 5,
        color: '#333'
    },
    menuItemValue: {
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 5,
        color: '#333'
    },
}

export default StyleSheet.create(styles);