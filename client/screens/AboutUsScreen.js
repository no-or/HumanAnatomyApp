import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  SectionList,
  Linking,
  Button
} from 'react-native';
import colors from '../assets/colors';
import Card from "../components/Card";
import TabBarIcon from "../components/TabBarIcon";

import {HOST_NAME} from "../constants/Constants";

const DATA = [
  {title: 'Project Lead and Content Expert', data: ['Majid Doroudi, B.Sc. (PT), M.Sc., Ph.D.']},
  {title: 'Web-based Prototype Development', data: ['Emily Michael Hamel, M.Sc. (MD cand.)']},
  {title: 'Software Developers', data: ['Adrian Viquez', 'Antoine Torossian', 'Kyle Martin', 'Nishat Gupta', 'Noor Khan']},
  {title: 'Contributors', data: ['Majid Doroudi', 'Tim Bateman', 'Clare Newlands']},
  {title: 'Acknowledgments', data: ['Timothy Bateman','Clare Newlands','Monika Fetjtek','Metha Kijsawangwong']},
];

const assets = require('../utils/assets')

// This function renders individual items for the contributors
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

  // The following logic deals with the content rendered in the about us page 
  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.content}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.descriptionBox}>
              <Image style={styles.image} source={assets['humanAnatomyIcon']} />
              <Text style={styles.description}>
                This app is designed for undergraduate and graduate students as well as medical trainees and medical professionals to increase their confidence in identifying normal anatomical structures. {"\n"}{"\n"}
                This app is based on the anatomy undergraduate curriculum at the University of British Columbia (UBC), which is located in Vancouver, British Columbia, Canada. The app content is organized into regions (head and neck, trunk, upper limb, and lower limb) and their respective sub-regions.
              </Text>
           </View>
           <View style={styles.divider}></View>
           <ScrollView nestedScrollEnabled={true} style={{maxHeight: 350}}>
              <Text style={styles.header}>Project Lead and Content Expert</Text>
                <View style={styles.item}><Text style={styles.title}>Majid Doroudi, B.Sc. (PT), M.Sc., Ph.D.</Text></View>
              <Text style={styles.header}>Web-based Prototype Development</Text>
                <View style={styles.item}><Text style={styles.title}>Emily Michael Hamel, M.Sc. (MD cand.)</Text></View>
              <Text style={styles.header}>Software Developers</Text>
                <View style={styles.item}><Text style={styles.title}>Adrian Viquez</Text></View>
                <View style={styles.item}><Text style={styles.title}>Antonie Torossian</Text></View>
                <View style={styles.item}><Text style={styles.title}>Kyle Martin</Text></View>
                <View style={styles.item}><Text style={styles.title}>Nishat Gupta</Text></View>
                <View style={styles.item}><Text style={styles.title}>Noor Khan</Text></View>
              <Text style={styles.header}>Contributors</Text>
                <Text style={styles.subHeader}>UBC Medical Students</Text>
                  <View style={styles.item}><Text style={styles.title}>Gregory Jen</Text></View>
                  <View style={styles.item}><Text style={styles.title}>Natasha Young</Text></View>
                  <View style={styles.item}><Text style={styles.title}>Mike Peabody</Text></View>
                  <View style={styles.item}><Text style={styles.title}>Lauren Andye-White</Text></View>
                  <View style={styles.item}><Text style={styles.title}>Gulaab Sara</Text></View>
                  <View style={styles.item}><Text style={styles.title}>Faran Rashid</Text></View>
                  <View style={styles.item}><Text style={styles.title}>Deanna Klonarakis</Text></View>
                  <View style={styles.item}><Text style={styles.title}>Vishesh Oberoi</Text></View>
                  <View style={styles.item}><Text style={styles.title}>Victoria Peterson</Text></View>
                  <View style={styles.item}><Text style={styles.title}>Cyrus Matheson</Text></View>
                  <View style={styles.item}><Text style={styles.title}>Alex Rebchuk</Text></View>
                  <View style={styles.item}><Text style={styles.title}>Ryan Kohler</Text></View>
                  <View style={styles.item}><Text style={styles.title}>Alice Wong</Text></View>
                  <View style={styles.item}><Text style={styles.title}>Nancy Lin</Text></View>
                  <View style={styles.item}><Text style={styles.title}>Joel Perren</Text></View>
                  <View style={styles.item}><Text style={styles.title}>Daniel Hui</Text></View>
                  <View style={styles.item}><Text style={styles.title}>Yuda Shih</Text></View>
                  <View style={styles.item}><Text style={styles.title}>Reed Huber</Text></View>
              <Text style={styles.header}>Contributors</Text>
                <Text style={styles.subHeader}>UBC Faculty</Text>
                  <View style={styles.item}><Text style={styles.title}>Dr. Majid Alimohammadi</Text></View>
              <Text style={styles.header}>Acknowledgments</Text>
                <View style={styles.item}><Text style={styles.title}>Timothy Bateman</Text></View>
                <View style={styles.item}><Text style={styles.title}>Clare Newlands</Text></View>
                <View style={styles.item}><Text style={styles.title}>Monika Fetjtek</Text></View>
                <View style={styles.item}><Text style={styles.title}>Metha Kijsawangwong </Text></View>
            </ScrollView>
            <Text style={styles.updatedContributors}
                  onPress={() => Linking.openURL(HOST_NAME+'/about.html')}>
              List of All Collaborators
            </Text>
            <View style={styles.divider}></View>
            <View style={styles.contactUs}>
              <Text style={styles.headerCU}>Contact Us</Text>
              <View style={styles.contactUsItems}>
                <TabBarIcon
                  name={Platform.OS === "ios" ? "ios-mail" : "md-mail"}
                />
                <Button style={styles.email} onPress={() => Linking.openURL('mailto:majid.doroudi@ubc.ca')} title="majid.doroudi@ubc.ca" />
              </View>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.termsOfUse}>
              <Text style={styles.header}>Terms of Use</Text>
              <View>
                <ScrollView style={{maxHeight: 200}} nestedScrollEnabled={true}>
                  <Text style={styles.description}>
                    The University of British Columbia has developed an anatomy teaching tool for undergraduate medical students that includes an iOS and android compatible app and website (“Service”). By using the Service, you are subject to the following Terms of Use, which may be amended at any time without notice.{"\n"}{"\n"}
                    The Service is provided for use by medical undergraduate students and medical professionals for educational purposes only. The Service is a supplemental educational tool and should not be referred to or relied upon as a replacement for other sources, or as a substitute for conventional training and study. {"\n"}{"\n"}
                    All content of the Service is subject to copyright protection. The information, content, and software that presented through the Service or used in connection with the Service contain proprietary and confidential information that is protected under Canadian and international intellectual property laws, including copyright, trademarks, service marks, patents, or other proprietary rights and laws. You are prohibited from using, downloading, republishing, selling, and duplicating, any component of the Service for commercial or any other purpose any database, in whole or in part, in any medium whatsoever. Any breach by you of copyright may result in legal action against you.{"\n"}{"\n"}
                    If your violation of these Terms of Use causes harm to others, you agree to indemnify the University of British Columbia against all claims, actions or demands, liabilities, and settlements including without limitation reasonable legal and accounting fees, resulting directly, or indirectly from your breach of these Terms of Use. If there is any dispute between us concerning these Terms of Use or your use of the Service, the dispute will be remitted to non-binding mediation, followed by binding arbitration. Both the mediation and the arbitration will be governed under the rules of the Province of British Columbia and the federal government of Canada.{"\n"}{"\n"}
                    Your use of the Service is at your own risk. All information included in the components of the Service are provided on an “as is” basis. The University of British Columbia disclaims all warranties, either express or implied, statutory or otherwise, including but not limited to the implied warranties of merchantability, non-infringement of third parties’ rights, and fitness for particular purpose. The University of British Columbia reserves the right to alter, amend, or discontinue the Service at any time without notice.{"\n"}{"\n"}
                  </Text>
                </ScrollView>
              </View>
            </View>
            <View style={styles.termsOfUse}>
              <Text style={styles.header}>Privacy Policy</Text>
              <Text style={styles.description}>
                We collect basic usage statistics related to the Service (“Information”) but we do not record information about how the Service is used or by whom. We use the information to improve the experience of our users, to respond to technical problems and to determine how many users are using the Service. We do not collect or record any personal information without your knowledge and consent.{"\n"}{"\n"}
                If we decide to change our practice with respect to the collection, use, and disclosure of personal information, we will post those changes on this page.{"\n"}{"\n"}
              </Text>
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
  termsOfUse: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%'
  },
  image: {
    width: "80%",
    height: 100,
    resizeMode: "contain",
  },
  description: {
    padding: 5,
  },
  item: {
    marginVertical: 5,
    textAlign: 'center',
    paddingHorizontal: '10%'
  },
  header: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: '6%',
    color: colors.primary
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 5,
    textDecorationLine: 'underline',
    textAlign: 'center',
    paddingHorizontal: '6%',
    color: 'dodgerblue'
  },
  updatedContributors: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: '6%',
    color: 'dodgerblue'
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
    marginLeft: 10,
    color: 'dodgerblue'
  }
});
