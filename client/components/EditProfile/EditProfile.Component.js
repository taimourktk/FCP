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
import styles from './EditProfile.style';
import request from '../../utils/request'
import {set, get} from '../../utils/storage'
import user from '../../utils/user'
import Error from '../Error/Error.Component'
import { ScrollView } from 'react-native';
import Header from '../Basic/Header/Header.Component';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { first } from 'lodash';

const Login = (props) => {

    const [username, setUsername] = React.useState(user.email);
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState(user.firstName);
    const [lastName, setLastName] = React.useState(user.lastName);
    const [loading, setLoading] = React.useState(false);
    const [role, setRole] = React.useState(user.role);
    const [city, setCity] = React.useState(user.city);
    const [phone, setPhone] = React.useState(user.phone);
    const [error, setError] = React.useState('');
    const [base64, setBase64] = React.useState('');
    const [uri, setUri] = React.useState('');

    const selectFile = async () => {
        const res = await DocumentPicker.pick({
            readContent: true,
            type: [DocumentPicker.types.images],
        })
        if (res.uri) {
            let filename
            if (Platform.OS === 'ios') {
                filename = res.uri.replace('file:', '')
            } else {
                filename = res.uri
            }
            const base64 = await RNFetchBlob.fs.readFile(filename, 'base64');
            setUri(res.uri)
            setBase64("data:image/jpg;base64," + base64.substr(0, base64.length));
        }
    }

    const signup = async () => {
        try {
            let extra = {}
            setLoading(true);
            if (base64) {
                let res = await request({
                    route: 'images',
                    type: 'POST',
                    body: {
                        base64
                    }
                })
                user.photo = res.fileName;
                extra.photo = res.fileName;
                console.log('Extra', user)
            }
            let res = await request({
                route: 'users/me',
                type: 'PUT',
                body: {
                    firstName,
                    lastName,
                    email: username,
                    role,
                    city,
                    phone,
                    ... extra
                }
            })
            
            if (res.status === 'success') {
                alert('Account updated')
                setLoading(false);
                let _user = await get('user');
                if (firstName)
                    _user.firstName = firstName;
                if (lastName)
                    _user.lastName = lastName;
                if (username)
                    _user.email = username;
                if (role)
                    _user.role = role;
                if (city)
                    _user.city = city;
                if (phone)
                    _user.phone = phone
                if (extra.photo)
                    _user.photo = extra.photo
                set('user', _user);
                user.setData(_user);
                user.runListeners();
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
        <ScrollView style={{ backgroundColor: 'white' }}>
        <Header 
            onIconClick={props.back}
            iconName="chevron-left"
            title="Edit Profile"
        />
        <Error 
            message={error}
        />
        <Input 
            placeholder="First name"
            onChangeText={(val) => setFirstName(val)}
            value={firstName}
        />
        <Input 
            placeholder="Last Name"
            onChangeText={(val) => setLastName(val)}
            value={lastName}
        />
        <Input 
            placeholder="Email"
            onChangeText={(val) => setUsername(val)}
            value={username}
        />
        <Input 
            placeholder="Phone"
            onChangeText={(val) => setPhone(val)}
            value={phone}
        />
        <Input 
            placeholder="City"
            onChangeText={(val) => setCity(val)}
            value={city}
        />
        <Input
            placeholder="Role"
            onChangeText={(val) => setRole(val)}
            value={role}
        />
        {
            base64 ?
            (
                <Image 
                    source={{ uri: uri }}
                    style={{
                        width: 200,
                        height: 200
                    }}
                />
            ):
            <TouchableOpacity
                onPress={selectFile}
            >
                <Text>Select File</Text>
            </TouchableOpacity>
        }
        <Button
          title="Update"
          onPress={signup}
          style={{
              marginTop: 10
          }}
          loading={loading}
        />
        </ScrollView>
    )
}

export default Login;