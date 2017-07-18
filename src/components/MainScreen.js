import React, { Component } from 'react';

import { convertObjectsToArray } from '../utils/helperFunctions';
import { getCurrentUser, getGalleryContentOn, getUserFramesOn } from '../utils/firebaseServices';

import { Button, Container, Content, Footer, FooterTab, Spinner, Text } from 'native-base';

import FramesTab from './FramesTab';
import ProfileTab from './ProfileTab';
import Gallery from './Gallery';

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: 0, isLoading: true };
  }

  componentWillMount() {
    this.getGalleryContentOnListener = getGalleryContentOn((galleryContent) => {
      this.setState({ galleryContent: convertObjectsToArray(galleryContent), isLoading: false });
    });
    this.getUserFramesOnListener = getUserFramesOn((userFrames) => {
      this.setState({ userFrames: convertObjectsToArray(userFrames) });
    });
  }

  componentWillUnMount() {
    this.getGalleryContentOnListener.off();
    this.getUserFramesOnListener.off();
  }

  switchScreen(tabIndex) {
    this.setState({ tabIndex: tabIndex });
  }

  showToast() {
    if(this.props.showToast) {
      Toast.show({
        text: 'Tu cuadro está listo para usarse',
        position: 'bottom',
        buttonText: 'Continuar',
        duration: 3000
      });
    }
  }

  renderSelectedTab () {
    switch (this.state.tabIndex) {
      case 0:
        return <Gallery galleryContent={ this.state.galleryContent } />;
        break;
      case 1:
        return <Container>
                  <Gallery galleryContent={ this.state.galleryContent.filter((galleryItem) => {
                      if(galleryItem.usersOwned && galleryItem.usersOwned[getCurrentUser().uid])
                        return true;
                      }) }
                  />
               </Container>
        break;
      case 2:
        return <Container>
                  <Container>
                    <FramesTab userFrames={ this.state.userFrames }/>
                  </Container>
               </Container>;
        break;
      case 3:
        return <ProfileTab />;
        break;
    }
  }

  render() {
    return(
      this.state.isLoading ?
      <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
        <Spinner color='black'/>
      </Content>
      :
      <Container>
          { this.renderSelectedTab() }
          { this.showToast() }
        <Footer>
          <FooterTab>
            <Button active={ this.state.tabIndex === 0 }
              onPress={ this.switchScreen.bind(this, 0) }>
              <Text>Descubrir</Text>
            </Button>
            <Button active={ this.state.tabIndex === 1 }
              onPress={ this.switchScreen.bind(this, 1) }>
              <Text>Mi Galería</Text>
            </Button>
            <Button active={ this.state.tabIndex === 2 }
              onPress={ this.switchScreen.bind(this, 2) }>
              <Text>Mis Cuadros</Text>
            </Button>
            <Button active={ this.state.tabIndex === 3 }
              onPress={ this.switchScreen.bind(this, 3) }>
              <Text>Perfil</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default MainScreen;
