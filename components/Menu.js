//https://docs.nativebase.io/building-drawer-navigation importante site de icons e codigos prontos
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {NativeBaseProvider,View,Button,Pressable, VStack, HStack, Icon,Text,Center} from "native-base";

//a gente adiciono isso aqui para chamar cadastro e consulta
import Cadastro from './Cadastro';

import Tarefas from './Consulta';

import Consulta from './Consulta';

import Login from './Login';

import Comments from './Comments';



const Drawer = createDrawerNavigator();
const getIcon = (screenName) => {
switch (screenName) {
case "Home":
return "home";

case "Cadastro":
return "home";

case "Consulta":
return "home";

case "Login":
return "home";

case "Comments":
return "home";


default:
return undefined;
}
};

function CustomDrawerContent(props) {
return (
  
<DrawerContentScrollView {...props} safeArea>
<VStack space="6" my="2" mx="1">
<View px="4">
<Text color="gray.700" bold>Cálculo do IMC</Text>

<Text color="gray.500">jmouraf@gmail.com</Text>
</View>
<VStack space="3">
{props.state.routeNames.map((name, index) => (
<Pressable
px="5"
py="3"
rounded="md"
bg={index === props.state.index
? "rgba(6, 182, 212, 0.1)" : "transparent"
} onPress={(event) => {props.navigation.navigate(name);}}>
<HStack space="7" alignItems="center"><Icon color={index === props.state.index?"primary.500" : "gray.500"} size="5"

as={<MaterialCommunityIcons name={getIcon(name)} />}
/>
<Text fontWeight="500"
color={index === props.state.index?"primary.500" : "gray.700"}>
{name}
</Text>
</HStack>
</Pressable>
))}
</VStack>
</VStack>
</DrawerContentScrollView>
);}
function Component(props) {
return (
<Center>
<Text> Esta é a tela: {props.route.name}.</Text>
</Center>
);
}

function MyDrawer() {
return (
<View safeArea flex={1}>
<Drawer.Navigator drawerContent={(props)=><CustomDrawerContent {...props} />}>
<Drawer.Screen name="Home" component={Component} />
<Drawer.Screen name="Cadastro" component={Cadastro} />
<Drawer.Screen name="Consulta" component={Consulta} />
<Drawer.Screen name="Login" component={Login} />


</Drawer.Navigator>
</View>
);
}
export default function Menu() {
return (
<NavigationContainer>
<NativeBaseProvider>
<MyDrawer />
</NativeBaseProvider>
</NavigationContainer>
);}



	
