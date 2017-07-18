import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import { saveNewUser, signUpUser } from '../utils/firebaseServices';

import { Button, Container, Content, Form, Item, Input, Spinner, Text } from 'native-base';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: '', email: '', password: '', passwordConfirm: '', error: '', isLoading: false };
  }

  onSignUpButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', isLoading: true });

    signUpUser(email, password).then((newUser) => {
                            newUser.userName = this.state.userName;
                            saveNewUser(newUser);
                            this.onSignUpSuccess();
                          }).catch(() => {
                            this.onSignUpFail();
                          });

  }

  onSignUpSuccess() {
    Actions.main();
  }

  onSignUpFail() {
    this.setState({ error: 'Authentication Failed', isLoading: false });
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{ margin: 20 }}>
          <Text style={ styles.topTitleStyle }>Ingresa tus datos</Text>
          <Form>
            <Item underline>
              <Input autoCorrect={ false } placeholder='Nombre de usuario' onChangeText={ (userName) => this.setState({ userName }) }/>
            </Item>
            <Item underline>
              <Input autoCorrect={ false } placeholder='Correo electrónico' onChangeText={ (email) => this.setState({ email }) }/>
            </Item>
            <Item underline>
              <Input placeholder='Clave' onChangeText={ (password) => this.setState({ password }) } secureTextEntry />
            </Item>
            <Item underline>
              <Input placeholder='Repetir clave' onChangeText={ (passwordConfirm) => this.setState({ passwordConfirm }) } secureTextEntry />
            </Item>
            <Text style={ styles.errorTextStyle }>{ this.state.error }</Text>
            {
              this.state.isLoading ?
              <Spinner size='small' color='black' />
              :
              <Button block onPress={ this.onSignUpButtonPress.bind(this) } style={ styles.signUpButtonStyle } >
                <Text>Crear cuenta</Text>
              </Button>
            }
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
  signUpButtonStyle: {
    marginTop: 20
  }
};

export default SignUpScreen;
