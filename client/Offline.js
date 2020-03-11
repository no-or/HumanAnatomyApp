import React, { Component } from "react";
import { AsyncStorage } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default class offline {

    constructor() {

        this.state = {
            //JSON of the regions of flashcards that are offline. If true, app uses the stored values; else, fetch from API. These are default.
            flashcard: {
                Heart: false,
                Trunk: false,
                UpperLimbs: false,
                LowerLimbs: false
            },
            isQuizOffline: {
                Head: true
            }
        }

    }

    //Retrieve the boolean for each region to know what to fetch.
    _retrieveData = async (type) => {
      try {
        const value = await AsyncStorage.getItem(type);
        if (value !== null) {
          return JSON.parse(value);
        }else{
          await AsyncStorage.setItem(type, this.state.flashcard);
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    
    checkButton = async (region, type) => {
      try {
        const value = await AsyncStorage.getItem(type);
        if (value !== null) {
          return JSON.parse(value)[region];
        }else{
          await AsyncStorage.setItem(type, JSON.stringify(this.state.flashcard));
        }
      } catch (error) {
        return false;
      }
    };

    //update which flashcard regions should be offline, and either populate or delete cache for said region
    updateButton(toggle, region, type){

        _storeData = async () => {
            try {

              //retrieve current JSON state
              let promise = new Promise((resolve, reject) => {
                // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
                  resolve(this._retrieveData(type));
              }) 
              
              promise.then((data) => {
                this.state.flashcard = data;
                this.state.flashcard[region] = toggle;

                AsyncStorage.setItem(type, JSON.stringify(this.state.flashcard));
              });

              //console.log("updating " + region + " to " + toggle + this.state.flashcard[region]);
              
            } catch (error) {
              // Error saving data
            }
          };

        _storeData();
    }

    //where region is region of the body (use same as API endpoints), and type is flashcard, quiz, etc... use same as API endpoints
    grabData(region, type){
        //Retrieve the data for a type of functionality and region of the app
        _retrieveData = async () => {
            try {
              const value = await AsyncStorage.getItem(type.concat(region));
              if (value !== null) {
                return JSON.parse(value);
                console.log(value);
              }
            } catch (error) {
              // Error retrieving data
            }
          };

          return _retrieveData();
    }

    //where region is region of the body (use same as API endpoints), and type is flashcard, quiz, etc... use same as API endpoints
    popData(region, type){
        _storeData = async () => {
            try {
              console.log('successful1');
            return fetch('http://137.82.155.92:8090/' + type + '?region=' + region)
            .then((response) => response.json())
            .then((responseJson) => {
                //nutty things with the responseJson to store this shit locally. Must convert image URLs to local URIS. FML.

                responseJson.forEach(function (tmp) {

                  FileSystem.downloadAsync(
                    tmp.imageUrl,
                    FileSystem.documentDirectory + tmp._id + '.jpg'
                    )
                    .then(({ uri }) => {
                        console.log('Finished downloading to ', uri);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                    
                    //return URI created for image

                    //console.log(tmp);
                    
                    console.log(tmp.imageUrl);
                    tmp.imageUrl = FileSystem.documentDirectory + tmp._id + '.jpg';

                });

                AsyncStorage.setItem(type.concat(region), JSON.stringify(responseJson));

                console.log('successful');
            return responseJson;
            })
            .catch((error) => {
            console.error(error);
            });
              
            } catch (error) {
              // Error saving data
              console.log('error');
            }
          };

          _storeData();
    }


    storeImage(url, id){
        FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + id + '.jpg'
        )
        .then(({ uri }) => {
            console.log('Finished downloading to ', uri);
        })
        .catch(error => {
            console.error(error);
        });
        
        //return URI created for image
        return FileSystem.documentDirectory + id + '.jpg';
    }
  }