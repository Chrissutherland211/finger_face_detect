import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DetailsScreen from './screens/DetailsScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';
import CameraScreen from './screens/CameraScreen';
import FaceScreen from './screens/FaceScreen';
import DetectCameraScreen from './screens/DetectCameraScreen';
const MainStack = createDrawerNavigator(
    {    
        Details: {
        screen: DetailsScreen,
        },
    },
    {
        initialRouteName: 'Details'
    }
);

const drawerScreens = createStackNavigator({
    Detail  : MainStack,
    Splash: SplashScreen,
    Login: {
        screen: LoginScreen,
        navigationOptions: { header: null }
    },
    SignUp: {
        screen: SignupScreen,
        navigationOptions: { header: null }
    },
    Camera:{
        screen: CameraScreen,
        navigationOptions: { header: null }
    },
    Face:{
        screen: FaceScreen,
        navigationOptions: { header: null }
    },
    DetectCamera:{
        screen: DetectCameraScreen,
        navigationOptions: { header: null }
    }

}, {
    initialRouteName: 'Login'
}) 

class Root extends React.Component {
    render() {
        const Navigation = createAppContainer(drawerScreens);
        return (<Navigation/>);
    }
}

export default Root;