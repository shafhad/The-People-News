import React,{Component} from "react"
import {View,StyleSheet,Button,Text,Alert,Image,SafeAreaView,Platform,StatusBar,ScrollView,TextInput,Dimensions} from "react-native"
import AppHeader from "../components/AppHeader"
import DropDownPicker from "react-native-dropdown-picker"
import {RFValue} from "react-native-responsive-fontsize"
import firebase from "firebase";

import AppLoading from "expo-app-loading";
export default class NewPostScreen extends Component{
  constructor(props){
    super(props)

    this.state = {
      light_theme: true,
      dropdownHeight: 40,
      previewImage: "image1"
    }
    
  }
  
  componentDidMount() {
    
    this.fetchUser();
  }

  async addStory() {
    if (
      this.state.title &&
      this.state.description &&
      this.state.story &&
      this.state.created_on
    ) {
      let storyData = {
        preview_image: this.state.previewImage,
        title: this.state.title,
        description: this.state.description,
        story: this.state.story,
        
        author: firebase.auth().currentUser.displayName,
        created_on: new Date(),
        author_uid: firebase.auth().currentUser.uid,
        likes: 0
      };
      await firebase
        .database()
        .ref(
          "/posts/" +
            Math.random()
              .toString(36)
              .slice(2)
        )
        .set(storyData)
        .then(function(snapshot) {});
      this.props.setUpdateToTrue();
      this.props.navigation.navigate("PostScreen");
    } else {
      Alert.alert(
        "Error",
        "All fields are required!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }

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
  
  render(){
   
    let previewImages = {

      image1: require("../assets/articleimg.png"),
      image2: require("../assets/articleImage.png")
    }
    return(
      <View style= {styles.container}>
      
        <View>
          <AppHeader>
          </AppHeader>
        </View>
        <SafeAreaView style = {styles.droidSafeArea}/>
        <View style = {styles.fieldsContainer}>
          <ScrollView>
            
            <Image source = {previewImages[this.state.previewImage]} style = {styles.previewimage}>
            </Image>

          <View style = {{height: RFValue(this.state.dropdownHeight)}}>

                <DropDownPicker
                  items={[
                    { label: "Image 1", value: "image1" },
                    { label: "Image 2", value: "image2" }
                  ]}
                  defaultValue={this.state.previewImage}
                  containerStyle={{
                    height: 20,
                   
                    marginBottom: RFValue(20),
                    
                    marginHorizontal:RFValue(150),
                    width:100,
                  }}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 100 });
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 40 });
                  }}
                  style={{ backgroundColor: "white" }}
                  itemStyle={{
                    justifyContent: "flex-start",
                    marginHorizontal:RFValue(30),
                    borderColor:"red",
                  }}
                  dropDownStyle={{ backgroundColor: "white" }}
                  labelStyle={{
                    color: "black",
                    
                  }}
                  arrowStyle={{
                    color: "white",
                    
                  }}
                   onChangeItem={item =>{
                  console.log(item.value)
                    this.setState({
                      previewImage: item.value
                    })
                  }}
                />
            
            </View>

            <View style={{ marginHorizontal: RFValue(10) }} >
               <TextInput
                style={styles.inputFont}
                onChangeText={title => this.setState({ title })}
                placeholder={"Title"}
                placeholderTextColor="white"
              />

              <TextInput
                style = {[

                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig
                ]}
                onChangeText={created_on => this.setState({created_on})}
                placeholder={"Created On"}
                placeholderTextColor="white"

              />
               <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig
                ]}
                onChangeText={description => this.setState({ description })}
                placeholder={"Description"}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor="white"
              />  

              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig
                ]}
                onChangeText={story => this.setState({ story })}
                placeholder={"Story"}
                multiline={true}
                numberOfLines={20}
                placeholderTextColor="white"
              />
            </View>

            <View style={styles.submitButton}>
                <Button
                  onPress={() => this.addStory()}
                  title="Submit"
                  color="#841584"
                />
              </View>

          </ScrollView>
        </View>
        <View style = {{flex: 0.12}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  fieldsContainer: {
    flex: 1
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  previewimage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain"
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "black",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    
  },
  inputFontExtra: {
    marginTop: RFValue(15)
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5)
  }
})