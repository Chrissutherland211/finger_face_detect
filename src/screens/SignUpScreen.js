import React from 'react';
import { Button, View, Text, Dimensions, TouchableOpacity,StyleSheet, ScrollView,Keyboard } from 'react-native';
import CardView from 'react-native-cardview';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import * as Actions from '../redux/actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as firebase from "firebase";
import Biometrics from 'react-native-biometrics';
import {createPerson,register} from './../api/API';
import Toast from 'react-native-whc-toast';
import Spinner from 'react-native-loading-spinner-overlay';


const screenWidth = Math.round(Dimensions.get('window').width);

var firebaseConfig = {
    apiKey: "AIzaSyBL9_zQdXvrkOXzGUz7Y3_GL_iqC34HI-c",
    authDomain: "reactnativecarapp.firebaseapp.com",
    databaseURL: "https://reactnativecarapp.firebaseio.com",
    projectId: "reactnativecarapp",
    storageBucket: "",
    messagingSenderId: "142140113441",
    appId: "1:142140113441:web:654b3620e87dc12f951960"
  };
  
firebase.initializeApp(firebaseConfig);

class SignupScreen extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {     
            email: '',                      
            viewCam:false,
            personGroupId:"developstargroups",
            personName:'',
            password:'',
            confirmPassword:'',
            confirmerror:'',
            loading: false,
        }
      }
    componentDidMount(){
        Biometrics.isSensorAvailable()
        .then((biometryType) => {
            // if (biometryType === Biometrics.TouchID) {
            //     console.log('TouchID is supported')
            // } else 
            if (biometryType === Biometrics.FaceID) {
            alert('FaceID is supported')
            alert(biometryType)
            } else {
                console.log(biometryType)
            }
        })
    }
    SignUp = async (email, personName, image)=>{ 
        this.setState({loading:true});
        if(!this.state.email){
            this.refs.toast.showTop('Please insert email !');
        } else if(!this.state.personName){
            this.refs.toast.showTop('Please insert Person Name !');
        } else if(!this.state.password){
            this.refs.toast.showTop('Please insert Password !');
        } else if(!this.state.confirmPassword){
            this.refs.toast.showTop('Please Confirm Password !');
        } else if(this.state.confirmerror){
            this.refs.toast.showTop('Please Match Password !');
        } else if(!this.props.fingerdata.finger){
            this.refs.toast.showTop('Please Set Finger !');
        } else if(!this.props.fingerdata.image){
            this.refs.toast.showTop('Please Set Face !');
        } else {
            res = await createPerson(this.state.personGroupId,personName,image);
            let personId= res.data.personId;        
            this.props.setPersonId(personId); 
            console.log('-------------------',personId, this.props.fingerdata.personId)
            let response = await register(email, personName, this.state.password, this.props.fingerdata.finger, this.props.fingerdata.personId);
            
            this.setState({loading:false});
            console.log(response.data)
            if(response.data==='true'){
                this.refs.toast.showTop('Successfully Register!');
            } else {
                this.refs.toast.showTop('Failed Register!');
            }
        }   
        
          
    }
    handleEmailInput = (data) => {

        console.log('eeeee', data);

        this.setState({ email: data });

    }
    handlePersonNameInput = (data) => {

        this.setState({ personName: data });

    }
    handelPassword = (data) =>{
        this.setState({password :data})
    }
    handelConfirmPassword = (data) =>{
        if(data===this.state.password){
            this.setState({confirmerror:''})
        } else {
            this.setState({confirmerror:'Please Match Password!'})
        }
        this.setState({confirmPassword :data})
    }
    fingerprintHandler = () =>{
        Biometrics.createKeys('Confirm fingerprint')
        .then((publicKey) => {
            console.log(publicKey)
            this.props.setFingerdata(publicKey);
            // alert(this.props.fingerdata.finger);
            // sendPublicKeyToServer(publicKey)
        })
    }
    faceHandler = () =>{
        let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
        let payload = epochTimeSeconds + 'some message'
        Biometrics.simplePrompt('Confirm face')
  .then(() => {
    console.log('successful fingerprint provided')
  })
  .catch(() => {
    console.log('fingerprint failed or prompt was cancelled')
  })
    }
    render() {  
        const { personName, email, password, confirmPassword } = this.state      
      return (
        
            <ScrollView style = {{flex: 1}}>
            <View  style={{ padding: 24}}>  

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Spinner
                    //visibility of Overlay Loading Spinner
                    visible={this.state.loading}
                    //Text with the Spinner 
                    textContent={'Loading...'}
                    //Text style of the Spinner Text
                    textStyle={styles.spinnerTextStyle}
                />
                    <Toast ref="toast"/>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width:screenWidth/1.2}}>                        
                            <View style={{flex:3, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize:30, fontWeight:'bold'}}>
                                    Sign up
                                </Text>
                            </View>
                            <View style={{flex:3,margin:10, alignItems: 'center', justifyContent: 'center', width:screenWidth/1.2}}>
                            <Input
                                placeholder='Email'
                                leftIcon={
                                    <Icon
                                    name='mail'
                                    size={24}
                                    color='black'
                                    />
                                }
                                value = {email}
                                onChangeText={(data) => { this.handleEmailInput(data) }}
                                />      
                            <Input
                                placeholder='Person Name'
                                leftIcon={
                                    <Icon
                                    name='user'
                                    size={24}
                                    color='black'
                                    />
                                }
                                value = {personName}
                                onChangeText={(data) => { this.handlePersonNameInput(data) }}
                                />      
                            <Input
                                placeholder='Password'
                                leftIcon={
                                    <Icon
                                    name='key'
                                    size={24}
                                    color='black'
                                    />
                                }
                                value = {password}
                                onChangeText={(data) => { this.handelPassword(data) }}
                                />  
                            <Input
                                placeholder='Confirm Password'                               
                                leftIcon={
                                    <Icon
                                    name='key'
                                    size={24}
                                    color='black'
                                    />
                                }
                                value = {confirmPassword}                                
                                onChangeText={(data) => { this.handelConfirmPassword(data) }}
                                />  
                            <Text style={{fontSize:15, margin:2, color:'red'}}>{this.state.confirmerror}</Text>                                                   
                            </View>
                            <View style={{flex:3,margin:10, alignItems: 'center', justifyContent: 'center'}}>                            
                                <TouchableOpacity style={{ height: 30,width:screenWidth/1.2, marginTop: 10, backgroundColor:'black',alignItems: 'center', justifyContent: 'center', borderRadius:5 }}
                                    onPress={() => {     
                                       
                                        this.fingerprintHandler();
                                        // this.props.setFingerdata("IDJ893_dkEFID676sjhfk_jdkiwkjdkoASKfjdklse4iFD89038fjkdls934urfid");
                                    }}  
                                    >
                                    <Text style={{color:'white'}}>Fingerprint Set</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:3,margin:10, alignItems: 'center', justifyContent: 'center'}}>                            
                                <TouchableOpacity style={{ height: 30,width:screenWidth/1.2, marginTop: 10, backgroundColor:'black',alignItems: 'center', justifyContent: 'center', borderRadius:5 }}
                                    onPress={() => {                       
                                        this.props.navigation.navigate('Camera');
                                    }}  
                                    >
                                    <Text style={{color:'white'}}>Face Set</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:3,margin:10, alignItems: 'center', justifyContent: 'center'}}>                            
                                <TouchableOpacity style={{ height: 30,width:screenWidth/1.2, marginTop: 10, backgroundColor:'black',alignItems: 'center', justifyContent: 'center', borderRadius:5 }}
                                    onPress={() => {  
                                        this.SignUp(email, personName, this.props.fingerdata.image);
                                    }}  
                                    >
                                    <Text style={{color:'white'}}>NEXT</Text>
                                </TouchableOpacity>
                            </View>              
                        </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:15, margin:10}}>Already have an account?</Text>
                    <TouchableOpacity
                    onPress={() => {this.props.navigation.navigate('Login');}}
                    >
                        <Text style={{fontSize:15, margin:10, color:'red'}}>Sign In</Text> 

                    </TouchableOpacity>     
                </View>     
            </View>               
        </View>
        </ScrollView>
        
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      paddingTop: 30,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    spinnerTextStyle: {
      color: '#FFF',
    },
  });
  function mapStateToProps(state) {
    return {
      fingerdata: state.fingerdata    
    }
  }
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setPersonId: Actions.setPersonId,
        setImageurl: Actions.setImageurl,
        setFingerdata: Actions.setFingerdata,
        decrease: Actions.decrease,
    }, dispatch);
  }

  export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);