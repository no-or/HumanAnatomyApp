import React, {Component} from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Image} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import OnlineToggle from "../components/OnlineToggle";

export default class Accordion extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: props.data, //subregions
            expanded : false,
            path: this.props.path, // screen to navigate to
            type: this.props.type // quiz, flashcard, or explore (spelled however the endpoint is spelled)
        }
    }

  render() {

    return (
       <View key={this.props.id}>
            <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpand()}>
                <Image style={styles.cardImage} source={{ uri: this.props.image }} />
                <Text style={[styles.title]}>{this.props.title}</Text>
                <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'darkgray'} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={{}}>
                    {/* This code creates a list of the regions */}
                    <FlatList
                    data={this.state.data}
                    numColumns={1}
                    scrollEnabled={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) =>
                        <View>
                            <TouchableOpacity style={[styles.childRow, styles.button, item.value ? styles.btnInActive : styles.btnActive]} onPress={()=>this.onClick(item.subRegion, index, this.props.navigation)}>
                                <View style={{flex: 1}}>
                                    <Text style={[styles.font, styles.itemInActive]}>
                                    {item.subRegion}
                                    </Text>
                                </View>
                                <OnlineToggle region={item.subRegion} type={this.state.type} style={{justifyContent: 'flex-end'}}></OnlineToggle>
                            </TouchableOpacity>
                            <View style={styles.childHr}/>
                        </View>
                    }/>
                </View>
            }
       </View>
    )
  }

  // This function is responsible for rerouting the user to the correct selection
  onClick=(item, index, navigation)=>{
    const temp = this.state.data.slice()
    temp[index].value = !temp[index].value
    this.setState({data: temp})
    navigation.push(this.state.path, {
        title: item,
        navigation: navigation,
    })
  }

  toggleExpand=()=>{
    this.setState({expanded : !this.state.expanded})
  }

}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        width:'100%',
        height:54,
        alignItems:'center',
        paddingLeft:35,
        paddingRight:35,
        fontSize: 12,
    },
    title:{
        fontSize: 14,
        fontWeight:'bold',
        color: 'darkgray',
    },
    itemActive:{
        fontSize: 12,
        color: 'green',
    },
    itemInActive:{
        fontSize: 12,
        color: 'darkgray',
    },
    btnActive:{
        borderColor: 'green',
    },
    btnInActive:{
        borderColor: 'darkgray',
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:130,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: 'white',
        //ios
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        //android
        elevation: 3,
    },
    childRow:{
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: '#EBEFF2',
    },
    parentHr:{
        height:1,
        color: 'lightgray',
        width:'100%'
    },
    childHr:{
        height:1,
        backgroundColor: 'lightgray',
        width:'100%',
    },
    colorActive:{
        borderColor: 'green',
    },
    colorInActive:{
        borderColor: 'darkgray',
    },
    cardImage: {
        width: "40%",
        height: 100,
        resizeMode: "cover",
      },
});