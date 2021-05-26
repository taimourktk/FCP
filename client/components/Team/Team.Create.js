import React, { useState } from 'react';
import Input from '../Basic/Input/Input.component';
import { View, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import request from '../../utils/request'

const CreateTeam = (props) => {

    const [name, setName] = useState('');
    const [uniqueName, setUniqueName] = useState('');
    const [loading, setLoading] = useState(false);

    const createTeam = async () => {
        try {
            setLoading(true);
            let res = await request({
                route: 'teams',
                type: 'POST',
                body: {
                    name,
                    tname: uniqueName
                }
            });
            setLoading(false);
            console.log(res);
            if (res.status === 'success') {
                props.onTeamCreate();
            }
        }
        catch(err) {
            setLoading(false);
            console.log("Create Team Error");
            console.log(err);
        }
    }

    return (

        <View
            style={{
                width: Dimensions.get('window').width - 80
            }}
        >
            <Text style={{
                fontSize: 22,
                fontWeight: '600',
                color: '#333',
                marginBottom: 30,
            }}>
                Create Team
            </Text>

            <Input 
                placeholder='Team Name'
                onChangeText={(val) => setName(val)}
            />
            <Input 
                placeholder='Unique Team Name'
                onChangeText={(val) => setUniqueName(val)}
            />

            <Button
                title='Create'
                loading={loading}
                disabled={loading}
                onPress={createTeam}
                containerStyle={{
                    marginTop: 30,
                }}
                titleStyle={{
                    fontWeight: '600'
                }}
            />

        </View>

    )

}

export default CreateTeam;