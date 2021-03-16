import { StyleSheet, Dimensions } from 'react-native'

const styles = {
    matchTeamsContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    matchTeamContainer: {
        width: (Dimensions.get('window').width - 120) / 2 - 30,
    },
    vsContainer: {
        width: 80,
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#b5b5b5',
        fontWeight: 'bold',
        fontSize: 22,
    },
    teamName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#b5b5b5',
        textAlign: 'center',
        marginTop: 10,
    },
    teamGoals: {
        fontSize: 16,
        fontWeight: '600',
        color: 'green',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 5,
    },
    matchResult: {
        marginTop: 0,
        marginBottom: 10,
        textAlign: 'center',
        color: '#b5b5b5',
        fontStyle: 'italic',
    },
    matchLocation: {
        color: '#333',
        width: '50%',
    },
    matchDate: {
        color: '#333',
        textAlign: 'right',
        width: '50%',
    }
}

export const halfWidth = (Dimensions.get('window').width - 120) / 2 - 30;

export default StyleSheet.create(styles);