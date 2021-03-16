import React from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

const RequestSentButton = (props) => {

    return (
        <Button 
            title="Sent"
            onPress={() => alert(1)}
            style={{
                marginRight: 5,
            }}
            icon={
                <Icon
                    name="check"
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

export default RequestSentButton;