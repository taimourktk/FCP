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
import styles from './Login.style'
import request from '../../utils/request'
import {set, get} from '../../utils/storage'
import user from '../../utils/user'
import Error from '../Error/Error.Component';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = (props) => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const login = async () => {
        try {
            setLoading(true);
            let res = await request({
                route: 'users/login',
                type: 'POST',
                body: {
                    email: username,
                    password
                }
            });
            
            if (res.status === 'success') {
                res.data.token = res.token;
                user.setData(res.data);
                set("user", res.data);
                set("token", res.token);
                props.reload();
            }
            else {
                setError(res.message ? res.message: 'Unknown error occurred');
            }

            console.log(res);
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
                width: Dimensions.get('window').width - 200,
                height: Dimensions.get('window').height-400,
                alignSelf: 'center',
                resizeMode: 'contain',
                marginBottom: 5,
                marginTop: 5,
            }}
        />
        <Error 
            message={error}
        />
        <Input 
            placeholder="Username"
            onChangeText={(val) => setUsername(val)}
        />
        <Input 
            placeholder="Password"
            onChangeText={(val) => setPassword(val)}
            secureTextEntry={true}
        />
        <Button
          title="Sign In"
          onPress={login}
          style={{
              marginTop: 10,
              color:"#414042"
          }}
          loading={loading}
        />
        <TouchableOpacity
            onPress={() => props.setScreen('signup')}
        >
        <View
            style={styles.noteContainer}
        >
            <Text
                style={commonStyles.note}
            >
              Create a new account
            </Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => props.setScreen('forgotPassword')}
        >
        <View
            style={styles.noteContainer}
        >
            <Text
                style={{
                    ... commonStyles.note,
                    alignSelf: 'flex-end'
                }}
            >
              Forgot Password
            </Text>
            
        </View>
        </TouchableOpacity>
        </>
    )
}

export default Login;