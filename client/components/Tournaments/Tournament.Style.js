import { StyleSheet, Dimensions } from 'react-native';

const styles = {
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
        alignSelf: 'center',
    },
    overlay: {
        width: Dimensions.get('window').width * 0.8,
        padding: 5,
        backgroundColor: 'white',
        height: Dimensions.get('window').height * 0.3,
    },
    overlayText: {
        marginTop: 5,
        fontSize: 16,
        fontStyle: 'italic',
    }
}

export default StyleSheet.create(styles);