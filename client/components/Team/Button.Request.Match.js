import React from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

const MemberRequestButton = (props) => {

    return (
        <Button 
            title="Match"
            onPress={() => props.onClick()}
            style={{
                marginRight: 5,
            }}
            icon={
                <Icon
                    name="plus"
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