import React from 'react';
import { Button, View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import CardView from 'react-native-cardview';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Actions from '../redux/actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Biometrics from 'react-native-biometrics';
import {checkFinger} from '../api/API';
import Toast from 'react-native-whc-toast';
const screenWidth = Math.round(Dimensions.get('window').width);

class LoginScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {     
        finger: ''  
    }
  }
  fingerprintHandler = async () =>{   
    await Biometrics.createKeys('Confirm fingerprint')
    .then((publicKey) => {        
        this.props.setFingerdata(publicKey);        
        console.log(this.props.fingerdata.finger);  
        this.goFacescreen()                        
    })
    .catch(() => {
      // this.goFacescreen()
    })     
  }
  goFacescreen = async () =>{
    const that = this;
    console.log("------login fingerdata ----",this.props.fingerdata.finger)
    // let checkValue = await checkFinger(this.props.fingerdata.finger)
    console.log(this.props.fingerdata.finger)
    if(this.props.fingerdata.finger){
      // console.log(checkValue)
      // if(checkValue===true){        
        that.props.navigation.navigate('Face')
      // } else {
      //   this.refs.toast.showTop('Your fingerpirnt did not registered. Please Try Again !');
      // }
    } 
  }

  
    render() {        
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
              <Toast ref="toast"/>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width:screenWidth/1.4}}>
                            
                            <View style={{flex:3, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize:30, fontWeight:'bold'}}>
                                    Fingerprint Check
                                </Text>
                            </View>
                            
                            <View style={{flex:3,margin:10, alignItems: 'center', justifyContent: 'center'}}>                            
                                <TouchableOpacity style={{ height: 60,width:screenWidth/1.2, marginTop: 10, backgroundColor:'black',alignItems: 'center', justifyContent: 'center', borderRadius:5 }}
                                    onPress={() => {    
                                       
                                        this.fingerprintHandler();
                                        // this.props.setFingerdata("IDJ893_dkEFID676sjhfk_jdkiwkjdkoASKfjdklse4iFD89038fjkdls934urfid");
                                    }}  
                                    >
                                    <Text style={{color:'white'}}>Fingerprint Set</Text>
                                </TouchableOpacity>
                            
                            </View>                                         
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
    }, dispatch);
  }

  export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);