import React from 'react';
import { Button, View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import CardView from 'react-native-cardview';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import * as Actions from '../redux/actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {sendEmail} from '../api/API';
import Toast from 'react-native-whc-toast';


const screenWidth = Math.round(Dimensions.get('window').width);

class ForgotPasswordScreen extends React.Component {
    constructor (props) {
        super(props);
        this.state = {     
            email: '',                      
        }
      }
    sendEmail= async(data)=>{
        var that = this;
        let response = await sendEmail(data);
        if(response){
            that.props.navigation.navigate('UserLogin')
        } else {
            this.refs.toast.showTop('Please check the email !');
        }
        
    }
    handleEmailInput =  (data) => {

        console.log('eeeee', data);

        this.setState({ email: data });
        

    }
    render() {   
        const {email} = this.props;     
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
              <Toast ref="toast"/>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {/* <CardView
                    cardElevation={3}
                    cardMaxElevation={2}
                    cornerRadius={5} style={{flex: 0.4}}> */}
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width:screenWidth/1.4}}>
                            
                            <View style={{flex:3, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize:30, fontWeight:'bold'}}>
                                    Please Input Email
                                </Text>
                            </View>
                            <View style={{flex:3, alignItems: 'center', justifyContent: 'center', width:screenWidth/1.7}}>
                            <Input
                                placeholder='EMAIL'
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
                            </View>
                            <View style={{flex:3, alignItems: 'center', justifyContent: 'center'}}>
                                
                                <TouchableOpacity style={{ height: 30,width:screenWidth/2, marginTop: 10, backgroundColor:'black',alignItems: 'center', justifyContent: 'center',borderRadius:5 }}
                                    onPress={() => {                       
                                      // this.props.navigation.navigate('Details');
                                    //   this.props.increase(15);
                                    this.sendEmail(this.state.email);
                                  }}  
                                  >
                                    <Text style={{color:'white'}}>Send Email</Text>
                                </TouchableOpacity>
                            </View>              
                        </View>
                {/* </CardView>  */}
                {/* <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:15, margin:10}}>Create new account?</Text>
                    <TouchableOpacity
                    onPress={() => {this.props.navigation.navigate('SignUp');}}
                    >
                        <Text style={{fontSize:15, margin:10, color:'red'}}>Sign Up</Text> 
                    </TouchableOpacity>     
                </View>      */}
            </View>
          </ScrollView>
        </KeyboardAwareView>
      );
    }
  }
  function mapStateToProps(state) {
    return {
      count: state.count    
    }
  }
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      increase: Actions.increase,
      decrease: Actions.decrease,
    }, dispatch);
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);