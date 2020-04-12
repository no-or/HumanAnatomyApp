import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  SectionList,
  Text
} from 'react-native';
import colors from '../assets/colors';
import VideoCard from "../components/VideoCard";
import TabBarIcon from "../components/TabBarIcon";
import {HOST_NAME} from "../constants/Constants"

export default class ExploreLabVideosScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videos:null,
      viewCount:null,
     }
  }

  componentDidMount() {
    this.apiFetch();
  }

  // This funciton retrieves all the video data from the database
  apiFetch() {
    var host = HOST_NAME
    fetch(host+'/video')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({videos: responseJson});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  // This function is in charge of rendering the videos per region 
  renderVideos=()=> {
    const videoCards = [];
    const tempArray = [];
    if (this.state.videos) {
      this.state.videos.map((video, index) => {
        let link = video.link
        let videoId = this.youtube_parser(link)
        let thumbnail = "https://img.youtube.com/vi/"+videoId+"/0.jpg"

        let info = {
          'title': video.title,
          'uri': thumbnail,
          'url': link,
          'key': videoId
        }

        let object = {
          'title': video.region,
          'data' : [info]
        }

        if (videoCards.length == 0) {
          videoCards.push(object)
        } else if (videoCards.find(({ title }) => title == video.region)) {
          const currentIndex = videoCards.findIndex(element => element.title == video.region)
          videoCards[currentIndex].data.push(info)
        } else if (videoCards.find(({ title }) => title != video.region)) {
          videoCards.push(object)
        }
      })
    }
    return videoCards;
  }

  youtube_parser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Videos',
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTintColor: colors.primaryText,
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerRight: (
      <TabBarIcon
        style={{marginRight: 15}}
        name={Platform.OS === "ios" ? "ios-information-circle" : "ios-information-circle"}
        onPress={() => navigation.navigate('AboutUs')}
      />
    ),
  });

  // This code is in charge of rendering all the content in this file
  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.content}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >
            <SectionList
              sections={this.renderVideos()}
              renderItem={({item}) => <VideoCard cardTitle={item.title} cardTitle={item.title} uri={item.uri} url={item.url} key={item.key}/>}
              renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
              keyExtractor={(item, index) => index}
            />
            </ScrollView>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  sectionHeader: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: colors.primary
  }
});
