import React, { Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import firebase from '../utils/firebaseInstance';

import { logInUser } from '../utils/firebaseServices';

import { Button, Container, Content, Form, H1, Item, Input, Spinner, Text } from 'native-base';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', isLoading: false };
  }

  onLoginButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', isLoading: true });

    logInUser(email, password).then(() => {
                this.onLoginSuccess();
              }).catch(() => {
                this.onLoginFail();
              });

  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', isLoading: false });
  }

  onLoginSuccess() {
    //setTimeout(() => { Actions.main({ type: ActionConst.RESET }); },0);
    Actions.main();
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{ margin: 20 }}>
          <Text style={ styles.topTitleStyle }>Ingresa tus datos</Text>
          <Form>
            <Item underline>
              <Input autoCorrect={ false } placeholder='Correo electrónico' onChangeText={ (email) => this.setState({ email }) }/>
            </Item>
            <Item underline>
              <Input placeholder='Clave' onChangeText={ (password) => this.setState({ password }) } secureTextEntry />
            </Item>
            <Text style={ styles.errorTextStyle }>{ this.state.error }</Text>
            {
              this.state.isLoading ?
              <Spinner size='small' color='black' />
              :
              <Button block onPress={ this.onLoginButtonPress.bind(this) } style={ styles.loginButtonStyle } >
                <Text>Acceder</Text>
              </Button>
            }
            <Button transparent block >
              <Text style={ styles.forgetPasswordTextStyle }>Olvidaste tu clave?</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = {
  topTitleStyle: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  loginButtonStyle: {
    marginTop: 20
  },
  forgetPasswordTextStyle: {
    textDecorationLine: 'underline'
  }
};

export default LoginScreen;
