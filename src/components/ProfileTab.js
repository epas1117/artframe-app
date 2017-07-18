import React, { Component } from 'react';
import { View }  from 'react-native';

import { Actions } from 'react-native-router-flux';

import { getFullCurrentUserOnce, logOutUser } from '../utils/firebaseServices';

import { Button, Container, Content, Form, Item, Input, Thumbnail, Text } from 'native-base';

class ProfileTab extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentWillMount() {
    getFullCurrentUserOnce().then((fullCurrentUser) => {
        this.setState({ fullCurrentUser: fullCurrentUser.val(), isLoading: false });
    });
  }
  logOut() {
    logOutUser().then(() => {
      Actions.auth();
    });
  }

  render() {
    return (
      <Container style={ styles.profileContainerStyle }>
        { !this.state.isLoading ?
        <Content>
          <Thumbnail style={ styles.thumbnailStyle } source={ require('../assets/images/person-placeholder.jpg')} />
          <Button transparent style={ styles.changePhotoButtonStyle }>
            <Text>Cambiar foto</Text>
          </Button>
          <Content style={ styles.userInfoContainerStyle }>
            <Text style={ styles.textStyle }>{ this.state.fullCurrentUser.userName }</Text>
            <Text style={ styles.textStyle }>{ this.state.fullCurrentUser.email }</Text>
          </Content>
          <Form style={ styles.changePasswordFormStyle }>
            <Item underline>
              <Input placeholder='Clave actual' onChangeText={ (actualPassword) => this.setState({ actualPassword }) } secureTextEntry />
            </Item>
            <Item underline>
              <Input placeholder='Nueva clave' onChangeText={ (newPassword) => this.setState({ newPassword }) } secureTextEntry />
            </Item>
            <Item underline>
              <Input placeholder='Confirmar nueva clave' onChangeText={ (newPasswordConfirm) => this.setState({ newPasswordConfirm }) } secureTextEntry />
            </Item>
            <Button small block bordered style={ styles.changePasswordButtonStyle }>
              <Text>Cambiar clave</Text>
            </Button>
          </Form>
          <Button small block style={ styles.logOutButtonStyle } onPress={ this.logOut.bind(this) }>
            <Text>Cerrar sesión</Text>
          </Button>
        </Content>
        :
        <Content />
        }
    </Container>
    );
  }
}

const styles = {
  profileContainerStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  thumbnailStyle: {
    marginTop: 10,
    width: 60,
    height: 60,
    borderRadius: 60,
    alignSelf: 'center'
  },
  changePhotoButtonStyle: {
    alignSelf: 'center'
  },
  userInfoContainerStyle: {
    margin: 30,
    marginTop: 10,
    marginBottom: 0
  },
  textStyle: {
    alignSelf: 'center'
  },
  changePasswordFormStyle: {
    margin: 30,
    marginTop: 25,
    marginBottom: 10,
    backgroundColor: 'white'
  },
  changePasswordButtonStyle: {
    margin: 10
  },
  logOutButtonStyle: {
    margin: 5
  }
};

export default ProfileTab;
