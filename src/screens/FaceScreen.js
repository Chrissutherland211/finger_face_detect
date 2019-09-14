import React from 'react';
import { Button, View, Text, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import CardView from 'react-native-cardview';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Actions from '../redux/actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Biometrics from 'react-native-biometrics';
import ImagePicker from 'react-native-image-picker';
import {detect, identify, checkFace} from '../api/API';
import Toast from 'react-native-whc-toast';

const screenWidth = Math.round(Dimensions.get('window').width);

class FaceScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {     
        checkfaceStatus: '',
        username: undefined,
        userImages: [],
        personGroupId:"developstargroups", 
        times:3,
        showVerify:true,
    }
  }
  checkFace = () =>{
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
      } 
    });
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
      let times = this.state.times;
      if(res===false){
        this.setState({times:times-1})
        this.refs.toast.showTop('Failed Your Face Verify!');
        console.log(this.state.times)
        if(this.state.times == 0){          
          this.setState({showVerify:false})
        }
      } else {
        for (const persons of res){
          for(const persion of persons.candidates){
            let ress = await checkFace(persion.personId)
            this.setState({checkfaceStatus:ress})
            console.log(ress)
            if(ress===true){
              this.props.navigation.navigate('Detail')
            } else {
              this.setState({times:times-1})
              this.refs.toast.showTop('Failed Your Face Verify!');
              if(this.state.times == 0){                
                this.setState({showVerify:false})
              }
            }
          }
          if(persons.candidates.length<=0){
            return false;
          }
        }   
      }         
    }    
  };
    render() { 
      // const CHECKIMG = require('../img/check.png');
      // const UNCHECKIMG = require('../img/uncheck.png');
      return (
        <KeyboardAwareView animated={true} doNotForceDismissKeyboardWhenLayoutChanges={false}>
          <ScrollView
              ref={(view) => {this.scrollView = view; }}                  
              keyboardShouldPersistTaps='always'
              automaticallyAdjustContentInsets={false}                  
              scrollEventThrottle={200}                  
              contentContainerStyle={{
                flex: 1,                    
                justifyContent: 'space-between'
            }}
              >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>                
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width:screenWidth/1.4}}>                            
                  <View style={{flex:3, alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{fontSize:30, fontWeight:'bold'}}>
                          Face Check
                      </Text>
                  </View>
                  <Toast ref="toast"/>
                  <View style={{flex:1,margin:10, alignItems: 'center', justifyContent: 'center'}}>                            
                      
                        <Text style={{color:'white'}}>{this.state.times}</Text>
                        <Text style={{fontSize:60, margin:10, color:'red'}}>{this.state.times}</Text>                   
                  
                  </View>  
                  {this.state.showVerify===true&&                         
                  <View style={{flex:3,margin:10, alignItems: 'center', justifyContent: 'center'}}>                            
                      <TouchableOpacity style={{ height: 60,width:screenWidth/1.2, marginTop: 10, backgroundColor:'black',alignItems: 'center', justifyContent: 'center', borderRadius:5 }}
                          onPress={() => {                             
                              this.checkFace();
                          }}  
                      >
                        <Text style={{color:'white'}}>Face Detect</Text>
                      </TouchableOpacity>
                  
                  </View>
                  }
                                                             
                </View>
                
                  <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize:15, margin:10}}>Create new account?</Text>
                      <TouchableOpacity
                      onPress={() => {this.props.navigation.navigate('SignUp');}}
                      
                      >
                          <Text style={{fontSize:15, margin:10, color:'red'}}>Sign Up</Text> 
                      </TouchableOpacity>     
                  </View>          
            </View>
          </ScrollView>
        </KeyboardAwareView>
      );
    }
  }
  function mapStateToProps(state) {
    return {
      count: state.count,
      fingerdata: state.fingerdata  
    }
  }
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      setFingerdata: Actions.setFingerdata,
      increase: Actions.increase,
      decrease: Actions.decrease,
      setImageurl: Actions.setImageurl, 
      setFacedata: Actions.setFacedata, 
      setCheckFace: Actions.setCheckFace, 
    }, dispatch);
  }

  export default connect(mapStateToProps, mapDispatchToProps)(FaceScreen);