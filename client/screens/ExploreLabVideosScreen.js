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
            <VideoCard
                uri="https://img.youtube.com/vi/6Yr-xk2cUg8/maxresdefault.jpg"
                cardTitle="Axilla, Arm, and Cubital Fossa Dissection Guide"
                cardViews="519 Views"
                url="https://www.youtube.com/watch?v=6Yr-xk2cUg8"
            />
            <VideoCard
                uri="https://img.youtube.com/vi/crXC7FwoSe4/0.jpg"
                cardTitle="Dissection Guide of the Forearm"
                cardViews="318 Views"
                url="https://www.youtube.com/watch?v=crXC7FwoSe4"
            />
            <VideoCard
                uri="https://img.youtube.com/vi/PeZbuT7CEmw/0.jpg"
                cardTitle="Dissection Guide of the Palm of the Hand"
                cardViews="98 Views"
                url="https://www.youtube.com/watch?v=PeZbuT7CEmw"
            />
            <VideoCard
                uri="https://img.youtube.com/vi/U9YStSt7fvk/maxresdefault.jpg"
                cardTitle="Dissection Guide of the Gluteal and Thigh..."
                cardViews="477 Views"
                url="https://www.youtube.com/watch?v=U9YStSt7fvk"
            />
            <VideoCard
                uri="https://img.youtube.com/vi/whYtpPZA748/maxresdefault.jpg"
                cardTitle="Lung Dissection Guide"
                cardViews="1.8K Views"
                url="https://www.youtube.com/watch?v=whYtpPZA748"
            />
            <VideoCard
                uri="https://img.youtube.com/vi/W43DkWsrTGk/maxresdefault.jpg"
                cardTitle="Dissection Guide of the Pectoral Region"
                cardViews="1.8K Views"
                url="https://www.youtube.com/watch?v=W43DkWsrTGk"
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
