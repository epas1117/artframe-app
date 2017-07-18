import React, { Component } from 'react';
import { WebView } from 'react-native';

import { Actions } from 'react-native-router-flux';

import { getCurrentUser } from '../utils/firebaseServices';

import { Container, Content, Button, Text, Toast } from 'native-base';

class SetupFrameScreen extends Component {
  constructor(props) {
    super(props);
  }

  onNavigationStateChange(navState) {
    if(navState.url == 'http://10.10.0.1/skip.php') {
      Actions.pop();
      }
  }

  render() {
    return (
          <WebView
            source={{ uri: 'http://10.10.0.1/main.php?uid='+ getCurrentUser().uid +'&frameid='+this.props.newFrameKey }}
            style={{ marginTop: 0 }}
            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          />
    );
  }
}

const styles = {

};

export default SetupFrameScreen;
