import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import { Container, Content, Button, H1, Text } from 'native-base';

class StartScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', margin: 20 }}>
          <H1 style={ styles.titleStyle }>ArtFrame</H1>
          <Button block style={ styles.buttonStyle } onPress={ () => Actions.signUpScreen() }>
            <Text>Crear cuenta</Text>
          </Button>
          <Button transparent block style={ styles.buttonStyle } onPress={ () => Actions.loginScreen() }>
            <Text>Ya tengo una cuenta</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = {
  titleStyle: {
    textAlign: 'center',
    margin: 20,
    marginBottom: 200
  },
  imageStyle: {
    alignSelf: 'center',
    width: 100,
    height: 100
  },
  buttonStyle: {
    marginTop: 15
  },
  textStyle: {
    textAlign: 'center',
    margin: 20,
  }
};

export default StartScreen;
