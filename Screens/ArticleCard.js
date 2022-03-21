import React,{Component} from "react"
import {Text,Image,Dimensions,TouchableOpacity,View,StyleSheet,ImageBackground} from "react-native"
import {RFValue} from "react-native-responsive-fontsize"
import firebase from "firebase";


export default class ArticleCard extends Component{
  constructor(props){

    super(props)
    this.state={
      light_theme:true,
      story_id: this.props.article.key,
      story_data: this.props.article.value
    }


  }
  componentDidMount() {
    
    this.fetchUser();
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
    let article = this.state.story_data;

    let previewImages = {
      image1: require("../assets/articleimg.png"),
      image2: require("../assets/articleImage.png")
     
      };
    return(
      <TouchableOpacity 
        onPress = {()=>
          this.props.navigation.navigate("ArticleScreen", {article: article})
        }
        >

         <ImageBackground source = {require("../assets/bg.gif")} style = {styles.background}>
        
           <View style={styles.cardContainer}>
           <Image style = {styles.articleImage} source = {previewImages[this.state.story_data.preview_image]}>

           </Image>

           <View style = {styles.titleContainer}>
             <Text style = {styles.titleText}>
               {this.props.article.value.title}
             </Text>
          </View>
            <Text style = {styles.authorText}>
            {this.props.article.value.author}
            
            </Text>
          </View>
          <View>
            <Text style = {styles.dateText}>
              Created on {this.props.article.value.created_on}
            </Text>
          </View>
      
        </ImageBackground>
      </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({

  articleImage:{

    resizeMode: "contain",
    width: 200,
    alignSelf: "center",
    height: 200,
    borderRadius: 100,
    marginTop: 25

  },
  cardContainer:{

    margin: RFValue(5),
    borderRadius: RFValue(20),
    marginTop: 20
  },
  titleContainer:{
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  titleText:{
    fontSize: RFValue(25),
    color: "white",
    marginLeft: 75
    
  },
  authorText:{
    fontSize: RFValue(20),
    color: "white",
    marginLeft: 130
    
  },
  background:{
    borderWidth: 10,
    borderColor: "black"
    
  },
  dateText:{

    fontSize: RFValue(20),
    color: "white",
    marginLeft: 50
  }
})