import React from 'react';
import {Card} from 'react-native-elements';
import {Image, Text, View} from 'react-native';
import styles, { halfWidth } from './Matches.Style';
import TeamLogo from '../../res/team-logo.png';
import moment from 'moment'
import { TouchableOpacity } from 'react-native';

const PastMatch = (props) => {

    return (
        <TouchableOpacity
            onPress={props.onClick}
        >
        <Card>
            <View style={styles.matchTeamsContainer}>
            <View style={styles.matchTeamContainer}>
                <Image 
                    source={TeamLogo}
                    style={{
                        width: halfWidth,
                        height: halfWidth,
                        resizeMode: 'contain'
                    }}
                />
                <Text style={styles.teamName}>{props.teamA ? props.teamA.name : ''}</Text>
                <Text style={styles.teamGoals}>{props.goals ? props.goals.teamAGoals : '-'}</Text>
            </View>
            <Text
                style={styles.vsContainer}
            >vs</Text>
            <View style={styles.matchTeamContainer}>
                <Image 
                    source={TeamLogo}
                    style={{
                        width: halfWidth,
                        height: halfWidth,
                        resizeMode: 'contain'
                    }}
                />
                <Text style={styles.teamName}>{props.teamB ? props.teamB.name : ''}</Text>
                <Text style={styles.teamGoals}>{props.goals ? props.goals.teamBGoals : '-'}</Text>
            </View>
            </View>
            <Card.Divider/>
            <Text style={styles.matchResult}>{
                (() => {
                    if (props.goals.teamAGoals > props.goals.teamBGoals) {
                        return props.teamA.name + ' won';
                    }
                    else if (props.goals.teamAGoals < props.goals.teamBGoals) {
                        return props.teamB.name + ' won';
                    }
                    else {
                        return 'The match was drawn'
                    }
                })()
            }</Text>
            <Card.Divider/>
            <View style={styles.matchTeamsContainer}>
                <Text style={styles.matchLocation}>{props.location}</Text>
                <Text style={styles.matchDate}>{moment( new Date(props.date)).format('MMM DD')}</Text>
            </View>
        </Card>
        </TouchableOpacity>
    )

}

export default PastMatch;