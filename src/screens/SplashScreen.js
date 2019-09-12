import React from 'react';
import { Button, View, Image } from 'react-native';

class SplashScreen extends React.Component {
    static navigationOptions = {
        header: null,
        /* No more header config here! */
      };
    async componentDidMount() {
        var that = this;
        setTimeout(function() {
            that.props.navigation.navigate('Login', {
                itemId: 86,
                otherParam: 'anything you want here',
              });          
        }, 1000);   
    }
    render() {
        const LOGO = require('../../logo.png');
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#EFD10E' }}>
                <Image source={ LOGO } style = {{ width:200, height:200, resizeMode: 'contain'}}/>            
            </View>
        );
    }
  }

export default SplashScreen;