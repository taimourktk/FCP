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
        <>
        <Image 
            source={CoverPhoto}
            style={{
                width: Dimensions.get('window').width - 120,
                alignSelf: 'center',
                resizeMode: 'contain',
                marginBottom: 40,
                marginTop: 30,
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
          title="Send Link"
          onPress={sendLink}
          style={{
              marginTop: 10
          }}
          loading={loading}
        />
        <TouchableOpacity
            onPress={() => props.setScreen('login')}
        >
        <View
            style={styles.noteContainer}
        >
            <Text
                style={commonStyles.note}
            >
              Login
            </Text>
        </View>
        </TouchableOpacity>
        </>
    )
}

export default ForgotPassword;