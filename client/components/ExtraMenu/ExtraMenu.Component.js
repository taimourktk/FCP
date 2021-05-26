import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./ExtraMenu.Style";

import Feedback from "../Feedback/Feedback.Component";
import Exercies from "../Exercise/Exercise.Component";
import Injury from "../Injuries/Injuries.Component";
import Grounds from "../Ground/Ground.Component";
import ReportBug from "../ReportBug/ReportBug.Component";
import EditProfile from "../EditProfile/EditProfile.Component";
import Tracker from "../Tracker/Tracker.Component";

import { TouchableOpacity } from "react-native";

export default function ExtraMenu() {
  const [Component, setSelectedComponent] = useState(null);
  const menu = [
    { name: "Grounds", icon: "globe", component: "grounds" },
    { name: "Exercies", icon: "heartbeat", component: "exercises"},
    { name: "Injuries", icon: "ambulance", component: "injury" },
    { name: "Edit Profile", icon: "user", component: "edit-profile" },
    { name: "Feedback", icon: "bullhorn", component: "feedback" },
    { name: "Report Bug", icon: "bug", component: "bug" },
    { name: "Step Tracker", icon: "bicycle", component: "tracker" },
    { name: "Log Out", icon: "sign-out", onClick: null },
  ];

  if (Component === null)
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>More</Text>
        {menu.map((menuItem) => {
          return (
            <View style={styles.menuContainer}>
              <TouchableOpacity
                onPress={() => setSelectedComponent(menuItem.component)}
              >
                <Icon name={menuItem.icon} size={64} style={{ color: "#333" }} />
                <Text style={styles.menuItemName}>{menuItem.name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
    else if (Component === "feedback") {
        return <Feedback  back={() => setSelectedComponent(null)} />
    }
    else if (Component === "exercises") {
        return <Exercies back={() => setSelectedComponent(null)} />
    }
    else if (Component === "injury") {
      return <Injury back={() => setSelectedComponent(null)} />
    }
    else if (Component === "grounds") {
      return <Grounds back={() => setSelectedComponent(null)} />
    }
    else if (Component === "bug") {
      return <ReportBug back={() => setSelectedComponent(null)} />
    }
    else if (Component === "edit-profile") {
      return <EditProfile back={() => setSelectedComponent(null)} />
    }
    else if (Component === "tracker") {
      return <Tracker back={() => setSelectedComponent(null)} />
    }
    else {
        return null;
    }
}
