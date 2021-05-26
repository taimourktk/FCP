import React from "react";
import { ScrollView, Text, View, Dimensions, Image } from "react-native";
import { Card } from "react-native-elements";
import { getUserById } from "../../utils/getUsers";
import moment from "moment";
import styles from './Team.Style';

const profilePhoto = {
  uri: 'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg'
}

export default function Details(props) {

  let admin = getUserById(props.team.owner);

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Text style={{marginLeft: 15, fontStyle: 'italic'}}>This team was created on {moment(new Date(props.team?.createdAt)).format("dd mm dd, yyyy")}</Text>
      
      <Card>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: (Dimensions.get("window").width - 30) * 0.3,
                  height: (Dimensions.get("window").width - 30) * 0.3,
                }}
              >
                <Image
                  style={{
                    width: "80%",
                    height: "80%",
                    resizeMode: "contain",
                    marginTop: "10%",
                  }}
                  source={profilePhoto}
                />
              </View>
              <View style={{
                width: (Dimensions.get('window').width) * 0.7 - 90,
              }}>
                <Text style={styles.teamName}>
                  {admin.firstName} {admin.lastName}
                </Text>
                <Text style={styles.teamName}>
                  {admin.email}
                </Text>
                <Text style={styles.teamName}>
                  Team Owner
                </Text>
              </View>
            </View>
          </Card>

      {props.team?.members?.map((member) => {
        let user = getUserById(member);
        return (
          <Card>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: (Dimensions.get("window").width - 30) * 0.3,
                  height: (Dimensions.get("window").width - 30) * 0.3,
                }}
              >
                <Image
                  style={{
                    width: "80%",
                    height: "80%",
                    resizeMode: "contain",
                    marginTop: "10%",
                  }}
                  source={profilePhoto}
                />
              </View>
              <View style={{
                width: (Dimensions.get('window').width) * 0.7 - 90,
              }}>
                <Text style={styles.teamName}>
                  {user.firstName} {user.lastName}
                </Text>
                <Text style={styles.teamName}>
                  {user.email}
                </Text>
                <Text style={styles.teamName}>
                  Role: {user.role || "-"}
                </Text>
              </View>
            </View>
          </Card>
        );
      })}
    </ScrollView>
  );
}
