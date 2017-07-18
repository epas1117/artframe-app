import React, { Component } from 'react';
import { Image } from 'react-native';

import { Actions, ActionConst } from 'react-native-router-flux';

import { saveNewFrameToUser } from '../utils/firebaseServices';

import { Button, Container, Content, Form, Item, Input, Text, Spinner } from 'native-base';

class NewFrameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { newFrameNameSaved: false, isLoading: false};
  }

  onSaveNewFrame() {
    this.setState({ isLoading: true })
    saveNewFrameToUser(this.state.newFrameName, (newFrameKey) => {
      this.setState({ newFrameKey: newFrameKey, newFrameNameSaved: true, isLoading: false});
    });
  }

  render() {
    return (
      <Container>
        {
          this.state.newFrameNameSaved ?

            <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', margin: 20 }}>
              <Text style={ styles.textStyle }>Dirígete a los ajustes y conéctate a la red Wi-Fi AtikoFrame</Text>
              <Text style={ styles.textStyle }>Vuelve a la app cuando ya estés conectado</Text>
              <Button block style={ styles.buttonStyle } onPress={ () => Actions.setupFrameScreen({ type: ActionConst.REPLACE, newFrameKey: this.state.newFrameKey }) }>
                <Text>Comenzar</Text>
              </Button>
            </Content>

          :

          <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', margin: 20 }}>
            <Form>
              <Item underline>
                <Input autoCorrect={ false } placeholder='Ingresa el nombre del cuadro' onChangeText={ (newFrameName) => this.setState({ newFrameName }) }/>
              </Item>
              {
                this.state.isLoading ?

                <Spinner size='small' />

                :

                <Button block onPress={ this.onSaveNewFrame.bind(this) } style={ styles.buttonStyle } >
                  <Text>Continuar</Text>
                </Button>
              }
            </Form>
          </Content>
        }

      </Container>
    );
  }
}

const styles = {
  textStyle: {
    textAlign: 'center',
    margin: 10,
    marginRight: 25
  },
  buttonStyle: {
    marginTop: 15
  }
};

export default NewFrameScreen;
