import React, { Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import FontIcon from 'react-native-vector-icons/FontAwesome';

import { Button, Container, Content, List, Spinner, Text, Toast } from 'native-base';

import FrameItem from './FrameItem';

class FramesTab extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
        <Content contentContainerStyle={ styles.containerStyle }>
              <Button small bordered style={ styles.addFrameButtonStyle} onPress={ () => Actions.newFrameScreen() }>
                <FontIcon name='plus' size={15}/>
                <Text>    Nuevo Cuadro</Text>
              </Button>
              { this.props.userFrames ?
              <List
                dataArray={ this.props.userFrames }
                renderRow={(userFrame) =>
                              <FrameItem
                                userFrame={ userFrame }
                              />
                          }
              />
              :
              <Text style={ styles.textStyle }>No tienes cuadros disponibles.</Text>
              }
              
        </Content>
    );
  }
}

const styles = {
  containerStyle: {
    margin: 5
  },
  addFrameButtonStyle: {
    alignSelf: 'flex-end',
    marginBottom: 3,
    marginTop: 3
  },
  textStyle: {
    marginTop: 3,
    alignSelf: 'center'
  }
};

export default FramesTab;
