import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    inputText: {
        padding: 5,
        height: 100,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding:10
    },
    button: {
        marginLeft: (Dimensions.get('window').width - 300)/2,
        width:300,
        marginTop: 10,
        backgroundColor: 'black',
        borderRadius: 5,
        marginTop:10

    
        
        
    }
});