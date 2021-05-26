import React, { useState } from 'react';
import { Card, Button } from 'react-native-elements';
import { Text, Image, View, Dimensions } from 'react-native';
import styles from './Team.Style';
import request from '../../utils/request';

const profilePhoto = {
    uri: 'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg'
}

const Request = (props) => {

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(0);

    const respondToRequest = async (teamId, userId, action='accept') => {
        try {
            setLoading(true);
            let res = await request({
                route: `teams/members/request/${action}/`,
                type: 'POST',
                body: {
                    teamId,
                    userId,
                }
            });
            console.log(res);
            setLoading(false);
            setResponse(1);
        }
        catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    if (response) {
        return null;
    }

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
                    source={profilePhoto}
                />
            </View>
            <View style={{
                width: (Dimensions.get('window').width) * 0.7 - 90,
            }}>
                <Text style={styles.teamName}>{props.requestee.firstName + " " + props.requestee.lastName}</Text>
                <Text style={styles.memberCount}>{props.requestee.email}</Text>
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
                            props.requestee._id,
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
                        onPress={() => respondToRequest(
                            props.teamId,
                            props.requestee._id,
                            'reject' 
                        )}
                    />
                </View>
            </View>
            </View>
        </Card>
    )

}

export default Request;