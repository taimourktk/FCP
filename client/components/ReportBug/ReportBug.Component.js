import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import request from '../../utils/request';
import styles from './ReportBug.Style';
import Input from '../Basic/Input/Input.component'
import Toast from "react-native-toast-message";
import Header from '../Basic/Header/Header.Component';

export default function Feedback (props) {

    const [message, setMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const submit = async () => {
        try {

            if (message.length < 4)
                return alert("Message should be at least 4 characters long");

            setLoading(true);
            const res = await request({
                route: 'bug',
                type: 'post',
                body: {
                    message
                }
            });
            setLoading(false);

            if (res.error) {
                return alert('Some error occurred')
            }

            setMessage('');
            Toast.show({
                text1: "Bug Report submitted successfully"
            })
        }
        catch (err) {
            alert('Some error occurred');
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Header
                onIconClick={props.back}
                iconName="chevron-left"
                title="Report Bug"
            />
            <Input
                placeholder="Write message here"
                value={message}
                onChangeText={(text) => setMessage(text)}
                multiline={true}
                numberOfLines={8}
                styles={{
                    height: 100,
                }}
            />
            <Button 
                title="Submit"
                loading={loading}
                disabled={loading}
                style={styles.button}
                onPress={submit}
            />
        <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    )

}