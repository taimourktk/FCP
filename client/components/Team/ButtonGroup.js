import React from "react";
import { ButtonGroup } from "react-native-elements";

const Buttons = (props) => {
  return (
    <ButtonGroup
      buttonContainerStyle={{}}
      buttons={['Browse', 'Joined', 'My', 'Requests']}
      containerStyle={{
        textAlign: "center",
        justifyContent: "center",
      }}
      innerBorderStyle={{}}
      onPress={(index) => props.setSelectedIndex(index)}
      selectedIndex={typeof props.selectedIndex !== undefined ? props.selectedIndex : 1}
      selectedButtonStyle={{
          backgroundColor: 'grey'
      }}
      selectedTextStyle={{}}
      textStyle={{
        textAlign: "center",
        justifyContent: "center",
      }}
      buttonStyle={{
        width: '100%',
        textAlign: "center",
      }}
    />
  );
};

export default Buttons;