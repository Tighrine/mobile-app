import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import SingUpScreen from "./screens/SingUp";

const Stack = createNativeStackNavigator();

const NavigationStack = () => {

    return(
        <Stack.Navigator initialRouteName="SignUp">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SingUpScreen} />
        </Stack.Navigator>
    )
}

export default NavigationStack;