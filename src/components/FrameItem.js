import React, { Component } from 'react';
import { Image, View } from 'react-native';

import { Actions } from 'react-native-router-flux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import { updateUserFrameName } from '../utils/firebaseServices';

import { Button, Card, Container, Content, H3, Icon, Input, Item, Left, Body, Right, ListItem, Thumbnail, Text } from 'native-base';

class FrameItem extends Component {
  constructor(props) {
    super(props);
    this.state = { newFrameNameIsEditing: false };
  }

  onFrameNameEditEnds() {
    if(this.state.newFrameName) {
      updateUserFrameName(this.state.newFrameName, this.props.userFrame.key);
    }
    this.setState({ newFrameNameIsEditing: false });
  }

  onEditFrameNamePressed() {
    this.setState({ newFrameNameIsEditing: true }, () => this.refs.newFrameNameInput._root.focus());
  }

  render() {
    let { author, title, name, urlPreview } = this.props.userFrame;

    return (
      <Card style={ styles.cardStyle }>
          <View style={ styles.imageContainerStyle }>
            <Image style={{ width: 110, height: 110 }} source={{ uri: urlPreview }} />
          </View>
          <View style={ styles.rightContainerStyle }>
            { this.state.newFrameNameIsEditing ?
                <Item style={ styles.newFrameNameItemStyle } regular>
                  <Input autoCorrect={ false }
                    style={ styles.newFrameNameInputStyle }
                    ref='newFrameNameInput'
                    onBlur={ () => this.setState({ newFrameNameIsEditing: false })}
                    onChangeText={ (newFrameName) => this.setState({ newFrameName }) }
                    onSubmitEditing={ this.onFrameNameEditEnds.bind(this) }
                    />
                </Item>
              :
              <View style={ styles.frameNameContainerStyle}>
                <H3 style={{ flex: 3, marginTop: 2, marginLeft: 2}}>{ name }</H3>
                <Button transparent small onPress={ this.onEditFrameNamePressed.bind(this) }>
                  <EntypoIcon name='edit' size={20} />
                </Button>
              </View>
            }
              <View style={ styles.bottomContainerStyle }>
                <Text note>{ author }</Text>
                <Text>{ title }</Text>
                <Button small bordered iconLeft style={ styles.resetButtonStyle }>
                  <MaterialCommunityIcon  name='reload' size={25} />
                  <Text> Reset</Text>
                </Button>
              </View>
          </View>
      </Card>
    );
  }
}

const styles = {
  cardStyle: {
    flexDirection: 'row',
    padding: 5
  },
  imageContainerStyle: {
    flex: 1,
    alignItems: 'center'
  },
  rightContainerStyle: {
    flex: 2,
    flexDirection: 'column',
    marginLeft: 10
  },
  newFrameNameItemStyle: {
    height: 36
  },
  newFrameNameInputStyle: {
    fontSize: 21,
    height: 41,
    paddingLeft: 0,
    marginTop: 4
  },
  frameNameContainerStyle:{
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3
  },
  bottomContainerStyle: {
    marginLeft: 2
  },
  resetButtonStyle: {
    alignSelf: 'flex-end',
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 5
  }
}
export default FrameItem;
