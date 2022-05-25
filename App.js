import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Login from './components/Login';
import Comments from './components/Comments';
function App() {
return (
<NavigationContainer>
<Stack.Navigator initialRouteName="Login">
<Stack.Screen name="Login" component={Login}/>
<Stack.Screen name="Comments" component={Comments}/>
</Stack.Navigator>
</NavigationContainer>
);
}
export default App;