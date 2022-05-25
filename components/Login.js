import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from 'react';
import {StyleSheet,
Text,
View,
TextInput,
Button,
TouchableOpacity,
} from "react-native";
import Comments from './Comments';
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("LoginDB.db");
export default function Login({ navigation }) {
const [email, setEmail] = useState("");
const [senha, setSenha] = useState("");
const [items, setItems] = useState(null);
useEffect(() => {
db.transaction((txn) => {
txn.executeSql('DROP TABLE IF EXISTS Users;', []);
txn.executeSql('CREATE TABLE Users (user_id integer primary key not null, email, senha);',
[]);
txn.executeSql("INSERT INTO Users (email,senha) VALUES (?,?);", ['123', '123']);
});
}, []);
function getData() {
console.log([email, senha]);
setItems(null);
db.transaction(async (tx) => {
await tx.executeSql(
'select * from Users where email = ? and senha = ?;', [email, senha],
(_, { rows: { _array } }) => setItems(_array)
);
});
if (items === null || items.length === 0) {
console.log("Acesso Negado");
} else {
console.log("Acesso Liberado");
navigation.navigate('Comments');
}
console.log(items);
}
return (
  <View style={styles.container}>
<View style={styles.input}>
<TextInput
placeholder="Email"
onChangeText={(email) => setEmail(email)}
/>
</View>
<View style={styles.input}>
<TextInput
placeholder="Senha"
secureTextEntry={true}
onChangeText={(senha) => setSenha(senha)}
/>
</View>
<TouchableOpacity style={styles.button} onPress={getData}>
<Text>Entrar</Text>
</TouchableOpacity>
</View>
);
}
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: "#fff",
alignItems: "center",
justifyContent: "center",
},
input: {
borderColor: "#000000",
borderRadius: 4,
borderWidth: 1,
width: "70%",
margin: 16,
padding: 8,
},
button: {
borderRadius: 5,
height: 40,
width: "70%",
alignItems: "center",
justifyContent: "center",
marginTop: 20,
backgroundColor: "#DEF283",
},
});

	
