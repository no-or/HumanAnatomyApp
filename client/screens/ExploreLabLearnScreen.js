import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  SectionList,
  Text,
  TouchableHighlightBase
} from 'react-native';
import colors from '../assets/colors';
import Card from "../components/Card";
import Accordion from '../components/Accordion'

export default class ExploreLabLearnScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu : null,
      //   {
      //     id: "1",
      //     title: 'Head & Neck',
      //     image: 'https://static2.bigstockphoto.com/8/5/1/large1500/158296634.jpg',
      //     data: [
      //       "Skull and meninges", "Cavernous Sinus", "Orbit", "Neck", "Face", "Infratemporal fossa", "Oral Cavity", "Pharynx", "Larynx"
      //     ]
      //   },
      //   {
      //     id: "2",
      //     title: 'Upper Limb',
      //     image: 'https://c1.wallpaperflare.com/preview/661/540/52/skeleton-hand-bones-anatomy.jpg',
      //     data: ["Scapular region", "Axilla", "Arm", "Forearm", "Hand", "Upper limb bones", "Upper limb Joints"]
      //   },
      //   {
      //     id: "3",
      //     title: 'Lower Limb',
      //     image: 'http://www.aljanh.net/data/archive/img/3085128125.jpeg',
      //     data: ["Gluteal region", "Thigh", "Leg", "Foot", "Lower limb bones", "Lower limb joints"]
      //   },
      //   {
      //     id: "4",
      //     title: 'Trunk',
      //     image: 'https://st.depositphotos.com/2363887/2564/i/950/depositphotos_25640047-stock-photo-man-anatomy-thorax-cutaway-with.jpg',
      //     data: ["Back", "Thorax", "Abdomen", "Pelvis"]
      //   },
      
     }
  }

  componentDidMount() {
    this.apiFetch();
  }

  apiFetch() {
    var host = '192.168.0.104'
    fetch('http://'+host+':8080/hierarchy')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({menu: responseJson[0]});
      // alert(JSON.stringify(this.state.menu))
      // alert(JSON.stringify(responseJson[0].regions));
    })
    .catch((error) => {
      console.error(error);
    });
  }

  renderAccordions=()=> {
    const items = [];
    if (this.state.menu) {
      this.state.menu.regions.map((item) => {
        items.push(
                <Accordion
                    title = {item.region}
                    data = {item.subRegions}
                    key = {item.region}
                    id = {item.region}
                    image = {item.image}
                    navigation = {this.props.navigation}
                />
            );
      })
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
            {this.renderAccordions()}
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
