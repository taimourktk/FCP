import { StyleSheet } from 'react-native'

const styles = {
    note: {
        color: '#333'
    },
    link: {
        color: 'blue'
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 10,
        padding: 20,
        backgroundColor: 'red',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        zIndex: 999,
    }
}

export default StyleSheet.create(styles);