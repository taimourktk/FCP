import React from 'react';
import {Card} from 'react-native-elements';
import {Image, Text, View} from 'react-native';
import styles, { halfWidth } from './Matches.Style';
import TeamLogo from '../../res/team-logo.png';

const UpcomingMatch = (props) => {

    return (
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
                <Text style={styles.teamName}>Team A</Text>
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
                <Text style={styles.teamName}>Team B</Text>
            </View>
            </View>
            <Card.Divider
                containerStyle={{
                    marginTop: 10,
                }}
            />
            <View style={styles.matchTeamsContainer}>
                <Text style={styles.matchLocation}>Location, City</Text>
                <Text style={styles.matchDate}>Feb 20</Text>
            </View>
        </Card>
    )

}

export default UpcomingMatch;