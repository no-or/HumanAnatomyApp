import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  SectionList
} from 'react-native';
import colors from '../assets/colors';
import Card from "../components/Card";
import TabBarIcon from "../components/TabBarIcon";

const DATA = [
  {title: 'Developers', data: ['Nishat Gupta', 'Noor Khan', 'Kyle Martin', 'Antoine Torossian', 'Adrian Viquez']},
  {title: 'Executives', data: ['Majid Doroudi', 'Tim Bateman', 'Clare Newlands']},
];

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default class AboutUsScreen extends Component {
  
  static navigationOptions = {
    title: 'About Us',
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTintColor: colors.primaryText,
    headerTitleStyle: {
        fontWeight: 'bold',
    },
  };

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.content}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.descriptionBox}>
              <Image style={styles.image} source={{ uri: "https://brand3.sites.olt.ubc.ca/files/2018/09/5NarrowLogo_ex_768.png"}} />
              <Text style={styles.description}>App Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco </Text>
           </View>
           <View style={styles.divider}></View>
           <SectionList
              sections={DATA}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => <Item title={item} />}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
              )}
            />
            <View style={styles.divider}></View>
            <View style={styles.contactUs}>
              <Text style={styles.headerCU}>Contact Us</Text>
              <View style={styles.contactUsItems}>
                <TabBarIcon
                  name={Platform.OS === "ios" ? "ios-mail" : "md-mail"}
                />
                <Text style={styles.email}>majid.doroudi@ubc.ca</Text>
              </View>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.copyright}>
              <Text style={styles.header}>Copyright</Text>
              <Text style={styles.description}>Copyright description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  wrapper: {
    flex: 1
  },
  content: {
    height: "100%",
    width: "100%",
  },
  descriptionBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%'
  },
  copyright: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginBottom: 10
  },
  image: {
    width: "80%",
    height: 100,
    resizeMode: "contain",
  },
  description: {
    padding: 5
  },
  item: {
    marginVertical: 5,
    textAlign: 'center',
    paddingHorizontal: '10%'
  },
  header: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: '10%',
    color: colors.primary
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: '10%'
  },
  divider: {
    borderBottomColor: '#D0CACA',
    borderBottomWidth: 1,
    marginVertical: 10,
    marginHorizontal: '5%',
  },
  contactUsItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  headerCU: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: '10%',
    color: colors.primary,
    marginBottom: 10
  },
  email: {
    fontSize: 18,
    marginLeft: 10
  }
});
