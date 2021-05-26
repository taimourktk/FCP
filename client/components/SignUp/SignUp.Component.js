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
import styles from './SignUp.style'
import request from '../../utils/request'
import {set, get} from '../../utils/storage'
import user from '../../utils/user'
import Error from '../Error/Error.Component'

const Login = (props) => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const signup = async () => {
        try {
            console.log('Working')
            setLoading(true);
            let res = await request({
                route: 'users/signup',
                type: 'POST',
                body: {
                    firstName,
                    lastName,
                    email: username,
                    password
                }
            })

            console.log(res);
            
            if (res.status === 'success') {
                alert('Account created. Open your email and confirm')
                props.setScreen('login');
                setLoading(false);
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
            placeholder="First name"
            onChangeText={(val) => setFirstName(val)}
        />
        <Input 
            placeholder="Last Name"
            onChangeText={(val) => setLastName(val)}
        />
        <Input 
            placeholder="Email"
            onChangeText={(val) => setUsername(val)}
        />
        <Input 
            placeholder="Password"
            onChangeText={(val) => setPassword(val)}
            secureTextEntry={true}
        />
        <Button
          title="Sign Up"
          onPress={signup}
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
              Already have an account, Login
            </Text>
        </View>
        </TouchableOpacity>
        </>
    )
}

export default Login;