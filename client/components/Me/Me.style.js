import { StyleSheet, Dimensions } from 'react-native';

const styles = {
    container: {
        textAlign: 'center',
        width: '100%',
        minHeight: '100%',
        backgroundColor: 'white',
    },
    imageContainer: {
        textAlign: 'center',
        marginLeft: (Dimensions.get('window').width - 240)/2,
        marginTop: 50,
        marginBottom: 20,
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
    }
}

export default StyleSheet.create(styles);