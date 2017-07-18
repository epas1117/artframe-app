import React, { Component } from 'react';

import firebase from './utils/firebaseInstance';

import { Content, Spinner, StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import Router from './Router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentWillMount() {
    // Check if a user is signed in.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.setState({ loggedIn: true, isLoading: false });
      } else {
        // No user is signed in.
        this.setState({ loggedIn: false, isLoading: false });
      }
    });
  }

  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        {
        this.state.isLoading ?
        <Content contentContainerStyle={{ flex: 1, justifyContent: 'center'}}>
            <Spinner color='black'/>
        </Content>
        :
        <Router loggedIn={ this.state.loggedIn } />
        }
      </StyleProvider>
    );
  }
}

export default App;
