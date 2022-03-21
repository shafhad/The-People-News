import React,{Component} from "react"
import {TouchableOpacity,View,Text,StyleSheet,SafeAreaView,Platform,StatusBar,ScrollView,Image} from "react-native"
import * as Speech from "expo-speech"
import {RFValue} from "react-native-responsive-fontsize"

export default class ArticleScreen extends Component{
  constructor(props) {
   
   super(props);

   this.state = {
   
    speakerColor: "gray",
    speakerIcon: "volume-high-outline"
   };
  }

  componentDidMount(){

  }



  render(){

    let previewImages = {

      image1: require("../assets/articleimg.png"),
      image2: require("../assets/articleImage.png")
    }

     if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    }
    else{
    return(
      <View style = {styles.container}>
        <SafeAreaView style = {styles.droidSafeArea}/>
        
        <View style = {styles.storycontainer}>
          <ScrollView style = {styles.storyCard}>

            <Image source = {previewImages[this.props.route.params.article.preview_image]} style = {styles.image}>
                          
            </Image>

            <View style = {styles.dataContainer}>
              <View style = {styles.titleTextContainer}>
                <Text style = {styles.storyTitleText}>
                  Title: {this.props.route.params.article.title}
                </Text>
                <Text style = {styles.storyAuthorText}>
                  Author: {this.props.route.params.article.author}

                </Text>
                <Text style = {styles.dateText}>
                  Created on: {this.props.route.params.article.created_on}
                </Text>
                <View style = {styles.storyTextContainer}>
                <Text style = {styles.storyText}>
                  Story: {this.props.route.params.article.story}
                
                </Text>
                </View>
                <View style = {styles.storyTextContainer}>
                <Text style = {styles.storyText}>
                  Description: {this.props.route.params.article.description}
                
                </Text>
                </View>
              </View>
              <View style = {styles.leaveContainer}>
                <TouchableOpacity onPress = {()=>
                  this.props.navigation.navigate("Home")
                } style = {styles.leaveButton}>
                    <Text>
                      Leave
                    </Text> 
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
        </View>
      </View>
    )

  }
  }
}

const styles = StyleSheet.create({

   container: {
    flex: 1,
    backgroundColor: "black"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  storycontainer:{

    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center"

  },
  storyCard:{

    margin: RFValue(20),
    backgroundColor: "black",
    borderRadius: RFValue(20)

  },
  image:{
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain"
  },
  dataContainer: {
  flexDirection: "row",
  padding: RFValue(20)
  },
  storyTitleText: {
    fontSize: RFValue(25),
    color: "white"
  },
  titleTextContainer: {
    flex: 1
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    color: "white"
  },
  storyTextContainer: {
    
    justifyContent: "center"
  },
  storyText: {
    fontSize: RFValue(15),
    color: "white"
  },
  dateText:{

   fontSize: RFValue(20),
   color: "white" 
  },
  leaveButton:{
    display: "flex",
    marginTop: RFValue(580),
    justifyContent: "center",
    color: "white",
    alignItems: "center",
    backgroundColor: "red",
    right: "60%",
    width: 100,
    height: 50,
    zIndex: -1
  }


})