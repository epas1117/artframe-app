import React, { Component } from 'react';
import { Modal, View } from 'react-native';

import { getCurrentUser } from '../utils/firebaseServices';

import {Content, List, Text } from 'native-base';

import GalleryItem from './GalleryItem';
import FramesToPushModal from './FramesToPushModal';
import FullImageModal from './FullImageModal';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { framesToPushModalVisible: false, galleryItemToShowAsFullImage: '', fullImageModalVisible: false };
  }

  setFramesToPushModalVisible(visible, galleryItemToPush) {
    this.setState({ framesToPushModalVisible: visible, galleryItemToPush: galleryItemToPush });
  }

  setFullImageModalVisible(visible, galleryItemToShowAsFullImage) {
    this.setState({ fullImageModalVisible: visible, galleryItemToShowAsFullImage: galleryItemToShowAsFullImage });
  }

  render() {
    return (
      <Content>
        {this.props.galleryContent.length === 0 &&
          <Text style={ styles.textStyle }>No tienes arte agregado a tu cuenta.</Text>
        }
        <List contentContainerStyle={ styles.gridStyle }
          dataArray={ this.props.galleryContent }
          renderRow={(galleryItem) => {

                        let isFavorite;
                        if(galleryItem.usersFavorites && galleryItem.usersFavorites[getCurrentUser().uid])
                            isFavorite= true;

                        let isOwned;
                        if(galleryItem.usersOwned && galleryItem.usersOwned[getCurrentUser().uid])
                            isOwned= true;

                        return <GalleryItem
                          isFavorite={ isFavorite }
                          isOwned={ isOwned }
                          galleryItem={ galleryItem }
                          setFramesToPushModalVisible={ this.setFramesToPushModalVisible.bind(this, true, galleryItem) }
                          setFullImageModalVisible={ this.setFullImageModalVisible.bind(this, true, galleryItem) }
                        />
                      }
                    }
        />
        <FramesToPushModal framesToPushModalVisible={ this.state.framesToPushModalVisible }
          setFramesToPushModalVisible={ this.setFramesToPushModalVisible.bind(this, false) }
          galleryItemToPush={ this.state.galleryItemToPush }
        />
        <FullImageModal fullImageModalVisible={ this.state.fullImageModalVisible }
          setFullImageModalVisible={ this.setFullImageModalVisible.bind(this, false) }
          url={ this.state.galleryItemToShowAsFullImage.url }
        />
    </Content>
    );
  }
}

const styles = {
  gridStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textStyle: {
    marginTop: 20,
    alignSelf: 'center'
  }
};

export default Gallery;
