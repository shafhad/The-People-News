import React,{Component} from "react"
import {View,StyleSheet,Text,Image,SafeAreaView,Platform,StatusBar} from "react-native"
import AppHeader from "../components/AppHeader"

import ArticleCard from "./ArticleCard"

import AppLoading from "expo-app-loading"
import {FlatList} from "react-native-gesture-handler"
import firebase from "firebase"
let articles = require("./Articles.json")



export default class PostScreen extends Component{
  constructor(props){

    super(props)
    this.state={
      light_theme:true,
      stories: []
    }
  }
componentDidMount() {
    
    this.fetchStories();
    this.fetchUser();
  }

  fetchStories = () => {
    firebase
      .database()
      .ref("/posts/")
      .on(
        "value",
        snapshot => {
          let stories = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              stories.push({
                key: key,
                value: snapshot.val()[key]
              });
            });
          }
          this.setState({ stories: stories });
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
  };

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };
  renderItem = ({item: articles}) => {
  return <ArticleCard article = {articles} navigation ={this.props.navigation}/>
  }

  keyExtractor = (item, index) => index.toString()

  render(){
    return(
      <View style = {styles.container}>
        <SafeAreaView style = {styles.droidSafeArea}/>
          <View>
            <AppHeader>
            </AppHeader>
          </View>
          {!this.state.stories[0] ? (
            <View style={styles.noStories}>
              <Text>
                No Stories Available
              </Text>
            </View>
          ) : (
          <View style = {styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.stories}
              renderItem={this.renderItem}
            />
          
          </View>
          )}

      <View style={{flex: 0.12}}/>
      
      </View>
    )
  }

}


const styles = StyleSheet.create({

  container:{
    flex: 1
  },
  cardContainer:{

    flex: 1,
    backgroundColor: "black"
  },
  droidSafeArea:{
     marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  noStories: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center"
  },
})