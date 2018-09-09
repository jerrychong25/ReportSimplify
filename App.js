/**
 * Sample React Native App With Firebase Authentication
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

//*****Firebase Authentication Simple Sample*****
// import firebase from 'react-native-firebase';

// firebase.auth()
//   .signInAnonymouslyAndRetrieveData()
//   .then(credential => {
//     if (credential) {
//       console.log('default app user ->', credential.user.toJSON());
//     }
//   });

//*****React Native Firebase Authentication Phone Authentication Sample*****
import React, { Component } from 'react';
// import { View, Button, Text, TextInput, Image } from 'react-native';
import { View, TextInput, Image } from 'react-native';
import { Container, Header, Content, Button, Text, Form, Item, Input, Label } from 'native-base';
import firebase from 'react-native-firebase';

const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

export default class PhoneAuthTest extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '+60',
      confirmResult: null,
    };
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '+60',
          confirmResult: null,
        });
      }
    });
  }

  componentWillUnmount() {
     if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    const { phoneNumber } = this.state;
    this.setState({ message: 'Sending code ...' });

    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
      .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  }

  renderPhoneNumberInput() {
   const { phoneNumber } = this.state;

    return (
      // <View style={{ padding: 25 }}>
      //   <Text>Enter phone number:</Text>
      //   <TextInput
      //     autoFocus
      //     style={{ height: 40, marginTop: 15, marginBottom: 15 }}
      //     onChangeText={value => this.setState({ phoneNumber: value })}
      //     placeholder={'Phone number ... '}
      //     value={phoneNumber}
      //   />
      //   <Button 
      //     title="Sign In" 
      //     color="green"
      //     onPress={this.signIn} 
      //   />
      // </View> 
      <Container>
          <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Form>
              <Image 
                source={require('./img/home_icon.png')} 
                style={{ 
                  height: 200, width: 200, 
                  alignSelf: 'center',
                  // marginLeft: 15, marginRight: 15, marginTop: 15, marginBottom: 5 
                }}
                />
              <Label
                style={{ 
                  height: 40, 
                  fontSize: 25,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  marginTop: 10, marginBottom: 5 }}
                >
                Report Simplify
              </Label>
              <Label
                style={{ height: 40, marginLeft: 15, marginRight: 15, marginTop: 15, marginBottom: 5 }}
                >
                Phone Number
              </Label>
              <Item rounded
                style={{ 
                  height: 50, width: 330, 
                  alignSelf: 'center',
                  marginBottom: 10 }}
                >
                <Input autoFocus
                  style={{  marginLeft: 15, marginRight: 15 }}
                  onChangeText={value => this.setState({ phoneNumber: value })}
                  value={phoneNumber}
                />
              </Item>
            </Form>
            <Button rounded medium full
             style={{ margin:15, backgroundColor: '#66BB6A', marginBottom: 5  }}
             onPress={this.signIn} 
              >
              <Text>Sign In</Text>
            </Button>
            <Button rounded medium full
             style={{ margin:15, backgroundColor: '#66BB6A' }}
              >
              <Text>Forgot Password</Text>
            </Button>
        </Content>
      </Container>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={'Code ... '}
          value={codeInput}
        />
        <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
      </View>
    );
  }

  render() {
    const { user, confirmResult } = this.state;
    return (
      <View style={{ flex: 1 }}>

        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}

        {user && (
          <View
            style={{
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#77dd77',
              flex: 1,
            }}
          >
            <Image source={{ uri: successImageUri }} style={{ width: 100, height: 100, marginBottom: 25 }} />
            <Text style={{ fontSize: 25 }}>Signed In!</Text>
            <Text>{JSON.stringify(user)}</Text>
            <Button title="Sign Out" color="red" onPress={this.signOut} />
          </View>
        )}
      </View>
    );
  }
}