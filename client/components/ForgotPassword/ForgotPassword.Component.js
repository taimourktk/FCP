import React from 'react' 
import {
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { Button } from 'react-native-elements';
import Input from '../Basic/Input/Input.component';
import CoverPhoto from '../../res/login-cover.png';
import commonStyles from '../../common/styles';
import styles from './ForgotPassword.style'
import request from '../../utils/request'
import {set, get} from '../../utils/storage'
import user from '../../utils/user'
import Error from '../Error/Error.Component'

const ForgotPassword = (props) => {

    const [username, setUsername] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const sendLink = async () => {
        try {
            setLoading(true);
            let res = await request({
                route: 'users/forgot-password',
                type: 'POST',
                body: {
                    email: username,
                }
            });
            
            if (res.status === 'success') {
                alert('Reset link sent')
                props.setScreen('login')
            }
            else {
                setError(res.message ? res.message: 'Unknown error occurred');
            }

            setLoading(false);
        }
        catch (err) {
            console.log("ERROR", err);
            setError(res.message ? res.message: 'Unknown error occurred');
            setLoading(false);
            throw err;
        }
    }

    return (
        <View style={{padding: 10}}>
        <Image 
            source={CoverPhoto}
            style={{
                width: Dimensions.get('window').width - 200,
                alignSelf: 'center',
                resizeMode: 'contain',
                marginBottom: 40,
                marginTop: 5,
            }}
        />
        <Error 
            message={error}
        />
        <Input 
            placeholder="Email"
            onChangeText={(val) => setUsername(val)}
        />
        <Button
          title="Reset Password"
          onPress={sendLink}
          style={{
              marginTop: 10
          }}
          loading={loading}
          buttonStyle={{
            marginLeft: (Dimensions.get('window').width - 300)/2,
              width:300,
              backgroundColor: 'black',
              borderRadius: 5,
              marginTop:10
          }}
        />
        <TouchableOpacity
            onPress={() => props.setScreen('login')}
        >
        <View
            style={{ ... styles.noteContainer, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text
                style={commonStyles.note}
            >
              Login into account
            </Text>
        </View>
        </TouchableOpacity>
        </View>
    )
}

export default ForgotPassword;