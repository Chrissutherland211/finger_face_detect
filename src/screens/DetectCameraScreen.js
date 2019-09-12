import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import * as Actions from '../redux/actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {detect, identify, checkFace} from '../api/API';
import ImagePicker from 'react-native-image-picker';

class DetectCameraScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: undefined,
            userImages: [],
            personGroupId:"developstargroups",
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
              this.props.navigation.navigate('Face');
          
            } else {
              this.props.navigation.navigate('Face');
          
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
      let faces = await detect(this.props.fingerdata.image);  
      let faceIds = [];    
      for (const face of faces) {
        faceIds.push(face.faceId);        
      }
      console.log('-----------------detect ids---------------'+faceIds)
      let res = await identify(this.state.personGroupId, faceIds)
      for (const persons of res){
        for(const persion of persons.candidates){
          let ress = await checkFace(persion.personId)
          await this.props.setCheckFace(ress)
          console.log('=============check face==============',this.props.fingerdata.checkface)
        }
      }      
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
        facedata: state.facedata,
        fingerdata: state.fingerdata   
    }
  }
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      setCheckFace: Actions.setCheckFace,
      setFacedata: Actions.setFacedata,     
      setImageurl: Actions.setImageurl,    
    }, dispatch);
  }
  export default connect(mapStateToProps, mapDispatchToProps)(DetectCameraScreen);