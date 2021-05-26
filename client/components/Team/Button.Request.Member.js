import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import user from '../../utils/user';
import request from '../../utils/request';

Icon.loadFont();

const MemberRequestButton = (props) => {

    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(props.alreadySent);
    const [content, setContent] = useState(props.alreadySent ? 'Sent': 'Join');

    const requestMember = async () => {
        try {
            setLoading(true);
            let res = await request({
                route: 'teams/join_request',
                type: 'POST',
                body: {
                    teamId: props.teamId
                }
            })
            if (res.status === 'success') {
                setSent(true);
                props.onMemberRequestSent();
                setContent('Sent');
            }

            setLoading(false);
        }
        catch (err) {
            console.log('ERROR in Mb Req');
            console.log(err);
            setLoading(false);
        }
    }

    return (
        <Button 
            title={content}
            onPress={requestMember}
            disabled={sent}
            loading={loading}
            style={{
                marginRight: 5,
            }}
            icon={
                <Icon
                    name="user-plus"
                    style={{
                        color: 'white',
                        fontSize: 18,
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                />
            }
        />
    )

}

export default MemberRequestButton;