import React, { useState } from 'react';
import { Card, Button } from 'react-native-elements';
import { Text, Image, View, Dimensions } from 'react-native';
import teamLogo from '../../res/team-logo.png';
import styles from './Team.Style';
import request from '../../utils/request';

const Request = (props) => {

    const [loading, setLoading] = useState(false);
    const [accepted, setAccepted] = useState(false);

    const respondToRequest = async (teamId, requestId, action='accept') => {
        try {
            setLoading(true);
            let res = await request({
                route: `teams/matches/request/${action}/`,
                type: 'POST',
                body: {
                    teamId,
                    requestId,
                }
            });
            setLoading(false);
            setAccepted(true);
            props.onRequestAccepted();
        }
        catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    if (accepted)
        return null;

    return (
        <Card>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
            <View 
                style={{
                    width: (Dimensions.get('window').width - 30) * 0.3,
                    height: (Dimensions.get('window').width - 30) * 0.3,
                }}
            >
                <Image 
                    style={{
                        width: '80%',
                        height: '80%',
                        resizeMode: 'contain',
                        marginTop: '10%'
                    }}
                    source={teamLogo}
                />
            </View>
            <View style={{
                width: (Dimensions.get('window').width) * 0.7 - 90,
            }}>
                <Text style={styles.teamName}>{props.requestee.name}</Text>
                <Text style={styles.memberCount}>{props.date} - {props.location}</Text>
                <Text style={styles.memberCount}>{props.message}</Text>
                <View 
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 10,
                        width: (Dimensions.get('window').width) * 0.7 - 90,
                    }}
                >
                    <Button 
                        title="Accept"
                        loading={loading}
                        disabled={loading}
                        containerStyle={{
                            width: '45%'
                        }}
                        titleStyle={{
                            fontWeight: '600'
                        }}
                        onPress={() => respondToRequest(
                            props.teamId,
                            props.request._id,
                            'accept' 
                        )}
                    />
                    <Button 
                        title="Reject"
                        loading={loading}
                        disabled={loading}
                        containerStyle={{
                            marginLeft: 5,
                            width: '45%',
                            color: '#333'
                        }}
                        buttonStyle={{
                            backgroundColor: 'lightgrey',
                            color: '#333'
                        }}
                        titleStyle={{
                            color: '#333',
                            fontWeight: '600'
                        }}
                    />
                </View>
            </View>
            </View>
        </Card>
    )

}

export default Request;