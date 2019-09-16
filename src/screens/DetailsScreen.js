import React, {Fragment} from 'react';
import { Button, View, Text } from 'react-native';
import * as Actions from '../redux/actions/index';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { WebView } from 'react-native-webview';

class DetailsScreen extends React.Component {

    render() {      
      const { navigation } = this.props;
      const itemId = navigation.getParam('itemId', 'NO-ID');
      const otherParam = navigation.getParam('otherParam', 'some default value');
      
      return (       
          <WebView
            source={{ uri: 'http://cloud123.cv2link.com' }}
            style={{ marginTop: 20 }}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);