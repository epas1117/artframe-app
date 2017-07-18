import React, { Component } from 'react';
import { Modal, View } from 'react-native';

import { getUserFramesOnce, updateGalleryItemToDisplayInUserFrame } from '../utils/firebaseServices';

import { Body, Button, CheckBox, Container, Content, H1, Icon, List, ListItem, Text } from 'native-base';

class FramesToPushModal extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentWillMount() {
    getUserFramesOnce().then((userFrames) => {
      if(userFrames.val()){
        this.setState({ userFrames: userFrames.val(), isLoading: false });
      }
    });
  }

  frameChecked(userFrameKey) {
    this.state.userFrames[userFrameKey].checked = !this.state.userFrames[userFrameKey].checked;
    this.forceUpdate();
  }

  pushArtworkToFrames() {
    Object.keys(this.state.userFrames).forEach((userFrameKey) => {
      if(this.state.userFrames[userFrameKey].checked) {
        updateGalleryItemToDisplayInUserFrame(this.props.galleryItemToPush, userFrameKey);
      }
    })
    this.resetSelectedUserFrames();
    this.props.setFramesToPushModalVisible();
  }

  resetSelectedUserFrames() {
    Object.keys(this.state.userFrames).forEach((userFrameKey) => {
      this.state.userFrames[userFrameKey].checked = false;
    })
  }

  closeFramesToPushModal() {
    this.resetSelectedUserFrames();
    this.props.setFramesToPushModalVisible();
  }

  render() {
    return (
       !this.state.isLoading &&
         <Modal
              animationType={'slide'}
              transparent
              visible={ this.props.framesToPushModalVisible }
              onRequestClose={() => { null }}
              >
              <Content contentContainerStyle={{ flex: 1 }} style={ styles.modalStyle }>
                <Button style={ styles.closeButtonStyle } transparent light onPress={ this.closeFramesToPushModal.bind(this) }>
                  <Icon name='close' />
                </Button>
                <Content contentContainerStyle={ styles.centerContainer } style={ styles.modalStyle }>
                    <View style={ styles.framesContainer }>
                        <Text style={ styles.textStyle }>Selecciona el cuadro</Text>
                        { Object.keys(this.state.userFrames).map((userFrameKey) => {
                            return <ListItem key={ userFrameKey }>
                                      <Body>
                                        <Text note>{ this.state.userFrames[userFrameKey].name } </Text>
                                      </Body>
                                      <CheckBox checked={ this.state.userFrames[userFrameKey].checked }
                                        onPress={ this.frameChecked.bind(this, userFrameKey) }
                                        style={{ backgroundColor: this.state.userFrames[userFrameKey].checked ? 'black' : 'white',
                                                 borderColor: 'black'
                                                }}
                                      />
                                    </ListItem>;
                                  ;
                                })
                        }
                    </View>
                    <Button style={ styles.pushButtonStyle } block  onPress={ this.pushArtworkToFrames.bind(this) }>
                      <Text>Listo</Text>
                    </Button>
                </Content>
              </Content>
          </Modal>
    );
  }
}

const styles = {
  modalStyle: {
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  closeButtonStyle: {
    alignSelf: 'flex-end'
  },
  centerContainer: {
    marginLeft: 25,
    marginRight: 25,
    flex: 1,
    justifyContent: 'center'
  },
  textStyle: {
    alignSelf: 'center'
  },
  framesContainer: {
    backgroundColor: 'white',
    padding: 15
  },
  pushButtonStyle: {
    marginTop: 25
  }
};

export default FramesToPushModal;
