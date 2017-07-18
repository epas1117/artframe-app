import React from 'react';
import { Platform } from 'react-native';

import { Router, Scene, Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import {Button, Text, Icon } from 'native-base';

import StartScreen from './components/StartScreen';
import SignUpScreen from './components/SignUpScreen';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';
import NewFrameScreen from './components/NewFrameScreen';
import SetupFrameScreen from './components/SetupFrameScreen';

const RouterComponent = ({ loggedIn }) => {
    return (
      <Router sceneStyle={{ paddingTop: (Platform.OS === 'ios') ? 63 : 55 }}
        renderBackButton={(router) => {
          return router.navigationState.index === 0 ? null : <Button style={{ bottom: 3, right: 20 }} small transparent  onPress={ () => {Actions.pop() }}>
            <Icon name='arrow-back' />
          </Button>
        }}
        >

        <Scene key="auth" >

          <Scene key="startScreen"
            hideNavBar={ false }
            component={ StartScreen }
            title={ "Bienvenido" }
          />

          <Scene key="signUpScreen"
            hideNavBar={ false }
            component={ SignUpScreen }
            title="Crear cuenta"
          />

          <Scene key="loginScreen"
            hideNavBar={ false }
            component={ LoginScreen }
            title="Acceder"
          />

        </Scene>

        <Scene   key="main"
                initial={ loggedIn }
                >

          <Scene key="mainScreen"
            component={ MainScreen }
            title='ArtFrame'
            renderRightButton={() => {
              return <Button small transparent style={{ bottom: 5, left: 10 }}>
                <Icon name='cart'/>
              </Button>
            }}
            onRight={ () => null}
          />

          <Scene key="newFrameScreen"
            component={ NewFrameScreen }
            title='Nuevo Cuadro'
            />

          <Scene key="setupFrameScreen"
            component={ SetupFrameScreen }
            title='Nuevo Cuadro'
            />

        </Scene>

      </Router>
  );
};

export default RouterComponent;
