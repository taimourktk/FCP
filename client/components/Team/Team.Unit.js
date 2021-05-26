import React from 'react';
import { Card } from 'react-native-elements';
import { Text, Image, View, Dimensions } from 'react-native'
import teamLogo from '../../res/team-logo.png'
import styles from './Team.Style'

import MemberRequestButton from './Button.Request.Member'
import MatchRequestButton from './Button.Request.Match'
import { TouchableOpacity } from 'react-native';

const Team = (props) => {

    return (
        <TouchableOpacity
            onPress={props.onClick || (() => {})}
        >
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
                <Text style={styles.teamName}>{props.name}</Text>
                <Text style={styles.memberCount}>{props.memberCount} members</Text>
                <View 
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 10,
                        width: (Dimensions.get('window').width) * 0.7 - 90,
                    }}
                >
                    {
                        props.mine ? 
                        (null):
                        (
                            <>
                            <MemberRequestButton 
                                teamId={props.id}
                                alreadySent={props.requestSent}
                                onMemberRequestSent={props.onMemberRequestSent}
                            />
                            <MatchRequestButton 
                                onClick={() => props.requestMatch(props.id)}
                            />
                            </>
                        )
                    }
                </View>
            </View>
            </View>
        </Card>
        </TouchableOpacity>
    );

}

export default Team;