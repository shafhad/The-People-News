import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import PostScreen from "../Screens/PostScreen"
import NewPostScreen from "../Screens/NewPostScreen"
import firebase from "firebase";

const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      isUpdated: false
    };
  }

   renderFeed = props => {
    return <PostScreen setUpdateToFalse={this.removeUpdated} {...props} />;
  };

  renderStory = props => {
    return <NewPostScreen setUpdateToTrue={this.changeUpdated} {...props} />;
  };

  changeUpdated = () => {
    this.setState({ isUpdated: true });
  };

  removeUpdated = () => {
    this.setState({ isUpdated: false });
  };

  
  render() {
    return (
      <Tab.Navigator
        labeled={false}
        barStyle = {styles.tabStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "PostScreen") {
              iconName = "globe-outline";
            } else if (route.name === "NewPostScreen") {
              iconName = "newspaper-outline";
            }
            return (
              <Ionicons
                name={iconName}
                size={RFValue(25)}
                color={color}
                style={styles.icons}
              />
            );
          }
        })}
        activeColor={"blue"}
      inactiveColor={"black"}
      >
        <Tab.Screen
          name="PostScreen"
          component={this.renderFeed}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="NewPostScreen"
          component={this.renderStory}
          options={{ unmountOnBlur: true }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
   tabStyle: {
    backgroundColor: "#33e6e6",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "absolute",
    overflow: "hidden",
    height: "10%",

    
  },
  
  
})