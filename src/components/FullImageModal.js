import React, { Component } from 'react';
import { Modal, View, Image } from 'react-native';

import { Button, Content, Icon } from 'native-base';

class FullImageModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
         <Modal
              animationType={'slide'}
              transparent
              visible={ this.props.fullImageModalVisible }
              onRequestClose={() => { null }}
              >
              <Content contentContainerStyle={{ flex: 1 }}>
                <Image style={ styles.imageStyle}
                  resizeMode='cover'
                  source={{ uri: this.props.url ? this.props.url : '' }}>
                  <Button style={ styles.closeButtonStyle } transparent dark onPress={ this.props.setFullImageModalVisible }>
                    <Icon name='close' />
                  </Button>
                </Image>
              </Content>
          </Modal>
    );
  }
}

const styles = {
  imageStyle: {
    flex: 1
  },
  closeButtonStyle: {
    alignSelf: 'flex-end'
  }
};

export default FullImageModal;
