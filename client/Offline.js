import React, { Component } from "react";
import { AsyncStorage, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import {HOST_NAME} from "./constants/Constants"

export default class offline {

    constructor() {

        this.state = {
            //the below variable flashcard has nothing to do with flashcards. Its just the default data if fetches fail. I'm too lazy to change it.
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
        } else {
          await AsyncStorage.setItem(type, JSON.stringify(this.state.flashcard));
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    
    //chack what state the specified toggle that calls this was left in (on or off)
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
              
            } catch (error) {
              // Error saving data
            }
          };

        _storeData();
    }

    //where region is subregion of the body (use same as API endpoints), and type is flashcard, quiz, etc... use same as API endpoints
    grabData(region, type){
        //Retrieve the data for a type of functionality and region of the app
        _retrieveData = async () => {
            try {
              const value = await AsyncStorage.getItem(type.concat(region));
              if (value !== null) {
                return JSON.parse(value);
              } else {
                //let status = 400;
                //return status;
              }
            } catch (error) {
              // Error retrieving data
              //let status = 400;
              //return status;
            }
          };

          return _retrieveData();
    }

    grabDate(region, type){
      //Retrieve the date for a type of functionality and region of the app
      _retrieveData = async () => {
          try {
            const value = await AsyncStorage.getItem(type.concat(region).concat("Date"));
            if (value !== null) {
              return JSON.parse(value);
            } else {
              let status = 400;
              return status;
            }
          } catch (error) {
            // Error retrieving data
            let status = 400;
            return status;
          }
        };

        return _retrieveData();
  }

  //updates the stored menu hierarchy on the phone locally to be used offline
  UpdateHierarchy() {
    var host = HOST_NAME;

    fetch(host+'/hierarchy')
    .then((response) => response.json())
    .then((responseJson) => {
      responseJson[0].regions.forEach(function (tmp) {
        //This piece of code hashes the image path so that each image is only stored once on the device
        var hash = 0; 

        if (tmp.imageUrl.length == 0) return hash; 
          
        for (i = 0; i < tmp.imageUrl.length; i++) { 
            char = tmp.imageUrl.charCodeAt(i); 
            hash = ((hash << 5) - hash) + char; 
            hash = hash & hash; 
        } 

        FileSystem.downloadAsync(
          tmp.imageUrl,
          FileSystem.documentDirectory + hash + '.jpg' // use hashed var instead of temp ID
          )
          .then(({ uri }) => {
              // console.log('Finished downloading to ', uri);
          })
          .catch(error => {
              console.error(error);
          });

          tmp.imageUrl = FileSystem.documentDirectory + hash + '.jpg'; // use hashed var instead of temp ID
      });

      AsyncStorage.setItem("hierarchy", JSON.stringify(responseJson));
    })
    .catch((error) => {
      console.error(error);
    });
  }

  //Retrieve hierarchy data from local storage.
  FetchHierarchy() {
    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem("hierarchy");
        if (value !== null) {
          return JSON.parse(value)[0];
        } else {
          let status = 400;
          return status;
        }
      } catch (error) {
        // Error retrieving data
        let status = 400;
        return status;
      }
    };

    return _retrieveData();
  }

    //Populate Data: Populates the local storage with data from the DB for a type and subregion
    //where region is subregion of the body (use same as API endpoints), and type is flashcard, quiz, etc... use same as API endpoints
    popData(region, type){
        _storeData = async () => {
            try {
              return fetch('http://137.82.155.92:8090/' + type + '?region=' + region)
              .then((response) => response.json())
              .then((responseJson) => {
                //nutty things with the responseJson to store this shit locally. Must convert image URLs to local URIS. FML.

                responseJson.forEach(function (tmp) {

                  //This piece of code hashes the image path and uses it as internal path so that each image is only stored once on the device
                  var hash = 0; 
        
                  if (tmp.imageUrl.length == 0) return hash; 
                    
                  for (i = 0; i < tmp.imageUrl.length; i++) { 
                      char = tmp.imageUrl.charCodeAt(i); 
                      hash = ((hash << 5) - hash) + char; 
                      hash = hash & hash; 
                  } 

                  FileSystem.downloadAsync(
                    tmp.imageUrl,
                    FileSystem.documentDirectory + hash + '.jpg' // use hashed var instead of temp ID
                    )
                    .then(({ uri }) => {
                        // console.log('Finished downloading to ', uri);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                    
                    //return URI created for image
                    tmp.imageUrl = FileSystem.documentDirectory + hash + '.jpg'; // use hashed var instead of temp ID

                });

                AsyncStorage.setItem(type.concat(region), JSON.stringify(responseJson));

            return responseJson;
            })
            .catch((error) => {
            Alert.alert("You are offline, or there was an issue with the server!");
            console.error(error);
            });
              
            } catch (error) {
              // Error saving data
              console.error(error);
            }
          };

          _storeDate = async () => {
            try {
            return fetch('http://137.82.155.92:8090/version?module=' + type + '&subRegion=' + region)
            .then((response) => response.json())
            .then((responseJson) => {

              var d1 = new Date(responseJson[0].updatedOn);
              AsyncStorage.setItem(type.concat(region).concat("Date"), JSON.stringify(d1));

            return responseJson;
            })
            .catch((error) => {
              AsyncStorage.setItem(type.concat(region).concat("Date"), JSON.stringify(new Date()));
            });
              
            } catch (error) {
              console.error(error);
            }
          };

          _storeData();
          _storeDate();
    }

    //retrieves the last date a subregion/type combo was updated for a specific subregion and type
    _retrieveDate = async (region, type) => {
      try {
      return fetch('http://137.82.155.92:8090/version?module=' + type + '&subRegion=' + region)
      .then((response) => response.json())
      .then((responseJson) => {

        return responseJson[0].updatedOn;

      })
      .catch((error) => {
        return 0;
      });
        
      } catch (error) {
        console.error(error);
      }
    };


    storeImage(url, id){
        FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + id + '.jpg'
        )
        .then(({ uri }) => {
            // console.log('Finished downloading to ', uri);
        })
        .catch(error => {
            console.error(error);
        });
        
        //return URI created for image
        return FileSystem.documentDirectory + id + '.jpg';
    }
  }