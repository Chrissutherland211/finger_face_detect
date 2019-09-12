import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import * as Actions from '../redux/actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {put, post} from '../api/API';
import ImagePicker from 'react-native-image-picker';

class CameraScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: undefined,
            userImages: []
        };
    }
    componentDidMount(){
        var options = {
            cancelButtonTitle: "Cancel",
            mediaType: "photo",
            noData: true,
            takePhotoButtonTile: "Take picture"
        };
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel === undefined) {
                this.props.setImageurl(response.path);
                this.takePicture(response);
                this.setState({
                    userImages: [
                        ...this.state.userImages,
                        response.path
                    ]
                });
                this.props.navigation.goBack();
            } else {
                this.props.navigation.goBack();
            }
          });
    }
  render() {
    return (

    <View style={{ flex: 1, marginTop: 40 }}>  
</View>
    );
  }

  takePicture = async(response) => {
    if (response) {  
      const path = `persongroups/developstargroup`;
      const body = {
            "name": "developstargroup1",            
            "userData": "user-provided data attached to the person group.",
            "recognitionModel": "recognition_02"
        };
      // const response = put(path, body);
    //   console.log("----------------------------",response);
      
    
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
function mapStateToProps(state) {
    return {        
        facedata: state.facedata    
    }
  }
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      setFacedata: Actions.setFacedata,     
      setImageurl: Actions.setImageurl,    
    }, dispatch);
  }
  export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);