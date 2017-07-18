import React, { Component } from 'react';
import { Image, View, Platform } from 'react-native';

import FontIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { saveUserInGalleryItemFavorites, deleteUserInGalleryItemFavorites, saveGalleryItemToUserFavorites, deleteGalleryItemInUserFavorites } from '../utils/firebaseServices';

import { Body, Button, Card, CardItem, Container, Content, Left, Icon, Thumbnail, Text } from 'native-base';

class GalleryItem extends Component {
  constructor(props) {
    super(props);
  }

  favoriteButtonPressed() {
    if(this.props.isFavorite) {
      //TODO Check to use transactions or a multi update to avoid transactions errors
      deleteGalleryItemInUserFavorites(this.props.galleryItem.key);
      deleteUserInGalleryItemFavorites(this.props.galleryItem.key);
    }
    else {
      //TODO Check to use transactions or a multi update to avoid transactions errors
      saveUserInGalleryItemFavorites(this.props.galleryItem.key);
      saveGalleryItemToUserFavorites(this.props.galleryItem.key);
    }
  }

  render() {
    let { title, description, urlPreview, url, price, author, usersFavorites } = this.props.galleryItem;
    let { isFavorite, isOwned} = this.props;

    return (
          <View style={ styles.galleryItemStyle }>
            <Card>
              <CardItem>
                <Body>
                  <Text note>{ author.name }</Text>
                  <Text>{ title }</Text>
                </Body>
              </CardItem>
              <CardItem cardBody button onPress={ this.props.setFullImageModalVisible }>
                <Image resizeMode='cover' style={{ width: Platform.OS == 'ios' ? 165 : 170, height: 270 }} source={{ uri: urlPreview }}/>
              </CardItem>
              <CardItem style={{ justifyContent: 'center' }}>
                <Button transparent onPress={ this.favoriteButtonPressed.bind(this) }>
                  <FontIcon name={ isFavorite ? 'heart' : 'heart-o' } size={25} color='black' />
                  <Text style={{ color: 'black' }}> { usersFavorites ? Object.keys(usersFavorites).length : 0 }</Text>
                </Button>
                {
                  isOwned ?
                  <Button  transparent onPress={ this.props.setFramesToPushModalVisible }>
                    <MaterialIcon name='airplay' size={30}/>
                  </Button>
                  :
                  <Button bordered iconLeft>
                    <FontIcon name='plus' size={15}/>
                    <Text> { "$" + price }</Text>
                  </Button>
                }
              </CardItem>
            </Card>
          </View>
    );
  }
}

const styles = {
  galleryItemStyle: {
    width: 170,
    height: 414,
    margin: 1
  },
};

export default GalleryItem;
