import React from 'react';
import { ScrollView, Text, View } from 'react-native'
import { Card } from 'react-native-elements';
import YoutubePlayer from 'react-native-youtube-iframe';
import moment from "moment";
import { getTeamById } from "../../utils/getTeams"
import styles from './Matches.Style';


export default function ({ match }) {

    return (
        <ScrollView>
            {
                match.videoId ?
                <Card>
                    <YoutubePlayer
                      height={190}
                      play={true}
                      videoId={match.videoId}
                    />
                    <Card.Divider></Card.Divider>
                    <Text>{ match.isLive ? "Live Streaming" : "Highlights" }</Text>
                </Card>: null
            }
            <Card>
                <Text style={{marginBottom: 10}}>{match.summary.length > 0 ? "Match Summary" : "No Match Summary"}</Text>
                {match.summary.length > 0 ? <Card.Divider/> : null}
                {
                    match.summary.map((event) => {
                        let time = moment(event.time).format("hh:mm A");
                        let str;
                        if (event.action === "goal") {
                            str = `Goal by ${getTeamById(event.team)?.name}`
                        }
                        else if (event.action === "foul") {
                            str = `${getTeamById(event.team)?.name} foul`
                        }
                        else if (event.action === "break") {
                            str = `Match Break`
                        }
                        return (
                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 3 }}>
                                <Text style={{marginRight: 10, fontWeight: 'bold', color: '#333'}}>{time}</Text>
                                <Text style={{fontWeight: 'bold', color: '#333'}}>{str}</Text>
                            </View>
                        );
                    })
                }
            </Card>
        </ScrollView>
    );
}