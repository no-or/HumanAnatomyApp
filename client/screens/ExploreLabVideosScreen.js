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

  apiFetch() {
    var host = '192.168.0.104'
    fetch('http://'+host+':8080/video')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({videos: responseJson});
      // alert(JSON.stringify(this.state.videos))
    })
    .catch((error) => {
      console.error(error);
    });
  }

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

  static navigationOptions = {
    title: 'Videos',
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.primaryText,
    headerTitleStyle: {
        fontWeight: 'bold',
    },
  };

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
  }
});
