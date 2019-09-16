import React from 'react';
import { Button, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import * as Actions from '../redux/actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Login } from '../api/API';


const screenWidth = Math.round(Dimensions.get('window').width);



class UserLoginScreen extends React.Component {
    constructor (props) {
        super(props);
        this.state = {     
            email: '',
            password:'',
            phone: ''
        }
      }
    SignUp = async (email, pass, phone)=>{
        var that = this;
        let res = await Login(email,pass);
        console.log('-------',res);
        if(res==='true'){
            that.props.navigation.navigate('Detail'); 
        } else {
            alert("Please confirm Password!")
        }        
    }
    handleEmailInput = (data) => {

        console.log('eeeee', data);

        this.setState({ email: data });

    }
    handlePhoneInput = (data) => {

        this.setState({ password: data });

    }
    
    render() {  
        const { email, phone, password } = this.state      
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width:screenWidth/1.2}}>
                        
                        <View style={{flex:3, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize:30, fontWeight:'bold'}}>
                                Log In
                            </Text>
                        </View>
                        <View style={{flex:3, alignItems: 'center', justifyContent: 'center', width:screenWidth/1.2}}>
                        <Input
                            placeholder='Username'
                            leftIcon={
                                <Icon
                                name='user'
                                size={24}
                                color='black'
                                />
                            }
                            value = {email}
                            onChangeText={(data) => { this.handleEmailInput(data) }}
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
                            value={password}
                            onChangeText={(data) => { this.handlePhoneInput(data) }}
                            />
                        </View>
                        <View style={{flex:3, alignItems: 'center', justifyContent: 'center'}}>                            
                            <TouchableOpacity style={{ height: 30,width:screenWidth/1.2, marginTop: 10, backgroundColor:'black',alignItems: 'center', justifyContent: 'center', borderRadius:5 }}
                                onPress={() => {                       
                                    // this.props.navigation.navigate('Details');
                                    // this.props.increase(15);
                                    this.SignUp(email, password);
                                }}  
                                >
                                <Text style={{color:'white'}}>Log In</Text>
                            </TouchableOpacity>
                        </View>              
                    </View>
           
                
        </View>
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

  export default connect(mapStateToProps, mapDispatchToProps)(UserLoginScreen);