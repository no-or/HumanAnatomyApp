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
import Card from "../components/Card";
import Accordion from '../components/Accordion'

export default class ExploreLabLearnScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu :[
        {
          id: "1",
          title: 'Head & Neck',
          image: 'https://static2.bigstockphoto.com/8/5/1/large1500/158296634.jpg',
          data: [
            "Skull and meninges", "Cavernous Sinus", "Orbit", "Neck", "Face", "Infratemporal fossa", "Oral Cavity", "Pharynx", "Larynx"
          ]
        },
        {
          id: "2",
          title: 'Upper Limb',
          image: 'https://c1.wallpaperflare.com/preview/661/540/52/skeleton-hand-bones-anatomy.jpg',
          data: ["Scapular region", "Axilla", "Arm", "Forearm", "Hand", "Upper limb bones", "Upper limb Joints"]
        },
        {
          id: "3",
          title: 'Lower Limb',
          image: 'http://www.aljanh.net/data/archive/img/3085128125.jpeg',
          data: ["Gluteal region", "Thigh", "Leg", "Foot", "Lower limb bones", "Lower limb joints"]
        },
        {
          id: "4",
          title: 'Trunk',
          image: 'https://st.depositphotos.com/2363887/2564/i/950/depositphotos_25640047-stock-photo-man-anatomy-thorax-cutaway-with.jpg',
          data: ["Back", "Thorax", "Abdomen", "Pelvis"]
        },
      ]
     }
  }

  // componentDidMount() {
  //   this.apiFetch();
  // }

  // apiFetch() {
  //   var host = '192.168.0.102'
  //   return fetch('http://'+host+':8080/explore/?section=region')
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     this.setState({menu: responseJson});
  //     return responseJson;
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // }

  renderAccordions=()=> {
    const items = [];
    for (item of this.state.menu) {
        items.push(
            <Accordion 
                title = {item.title}
                data = {item.data}
                key = {item.id}
                id = {item.id}
                image = {item.image}
                navigation = {this.props.navigation}
            />
        );
    }
    return items;
  }

  static navigationOptions = {
    title: 'Learn',
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
              { this.renderAccordions() }
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
    backgroundColor: "#fff"
  }
});

