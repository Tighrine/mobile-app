import { useState } from 'react';
import {
  StyleSheet, Image, TextInput, ActivityIndicator,
  View, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard
} from 'react-native';
import { Button, Text } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../../state/authActions';
import { userSelector } from '../../state/auth';

const SingUpScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading, userInfo, error, success } = useSelector(userSelector);

  const [signupData, setsignupData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const updatesignupData = (value, field) => {
    setsignupData(prev => ({
      ...prev,
      [field]: value
    }));
  }

  const onSubmit = () => {
    console.log(signupData);
    dispatch(registerUser(signupData));
    Keyboard.dismiss();
    console.log("loading: ", loading, error)
  }

  return (
    <>
      <KeyboardAvoidingView style={styles.formContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
        <Image style={styles.image}
          source={{
            uri: 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png'
          }} />
        <View>
          <TextInput
            placeholder="Email..."
            textContentType='emailAddress'
            value={signupData.email}
            onChangeText={text => updatesignupData(text, "email")}
            style={styles.inputText}
          />
          <TextInput
            placeholder="Username..."
            textContentType='username'
            value={signupData.username}
            onChangeText={text => updatesignupData(text, "username")}
            style={styles.inputText}
          />
          <TextInput
            placeholder="Password..."
            secureTextEntry={true}
            value={signupData.password}
            onChangeText={text => updatesignupData(text, "password")}
            style={styles.inputText}
          />
        </View>
        <View style={{ marginTop: '15%', width: 350 }}>
          <Button
            color={"#0095f6"}
            title='SignUp'
            containerStyle={styles.button}
            onPress={onSubmit}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '15%' }}>
          <Text>Already have an account?{" "}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: "#0095f6" }}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {loading && <ActivityIndicator color={"#0095f6"} />}
    </>
  )
}

export default SingUpScreen;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginBottom: '20%'
  },
  formContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingTop: '20%'
  },
  inputText: {
    height: 50,
    width: 350,
    borderColor: '#dbdbdb',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#fbfbfb'
  },
  button: {
    width: 350,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: '#0095f6'
  }
});