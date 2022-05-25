import React from 'react';
import { useState, useEffect } from "react";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");
//Criando o componente Items
function Items({ done: doneHeading, onPressItem }) {
const heading = doneHeading ? "Finalizado" : "Lista de Contatos";
const [items, setItems] = useState(null);
useEffect(() => {
db.transaction((tx) => {
tx.executeSql(`select * from items where done = ?;`,[doneHeading ? 1 : 0],
//tx.executeSql('select * from items', [], ( _ , { rows })
 (_, { rows: { _array } }) => setItems(_array));
 });},[]);

 if (items === null || items.length === 0) {
 return null;
 }
 return (
 <View style={styles.sectionContainer}>
 
 </View>
 );
}
//Criando o componente useForceUpdate
function useForceUpdate() {
 const [value, setValue] = useState(0);
 return [() => setValue(value + 1), value];
}
export default function App() {
 const [text, setText] = useState(null);
 const [forceUpdate, forceUpdateId] = useForceUpdate();
 useEffect(() => {
 db.transaction((tx) => {
 tx.executeSql("create table if not exists items (id integer primary key not null, done int,value text);");
 });
 }, []);
 const insertDB = (text) => {
 if (text === null || text === "") {
 return false;
 }
 db.transaction((tx) => {
// (callback, errorCallback, successCallback)
 tx.executeSql("insert into items (done, value) values (0, ?)", [text]);}, null,
 forceUpdate
 );
 };
 const updateDB = (id) => {
 db.transaction((tx) => {tx.executeSql(`update items set done = 1 where id = ?;`, [id,]);}, null,
 forceUpdate
 );
 };
 const deleteDB = (id) =>{
 db.transaction((tx) => {
 tx.executeSql(`delete from items where id = ?;`, [id]);
 },
 null,
 forceUpdate
 );
 };
 return (
 <View style={styles.container}>
 <Text style={styles.heading}>Cadastro</Text>
 <View style={styles.flexRow}>
 <TextInput
 style={styles.input}
 placeholder="Cadastre um novo contato"
 value={text}
 onChangeText={(text) => setText(text)}
 onSubmitEditing={() => {insertDB(text);setText(null);}}
 />
 </View>
 <ScrollView style={styles.listArea}>
 <Items
 key={`forceupdate-todo-${forceUpdateId}`}
 done={false}
 onPressItem={(id) => {updateDB(id);}}
 />
 <Items
 key={`forceupdate-done-${forceUpdateId}`}
done={true}
 onPressItem={(id) => {deleteDB(id);}}
 />
 </ScrollView>


 </View>
 );
}
const styles = StyleSheet.create({
 container: {
 backgroundColor: "#fff",
 flex: 1,
 paddingTop: Constants.statusBarHeight,
 },
 heading: {
 fontSize: 20,
 fontWeight: "bold",
 textAlign: "center",
 },
 flexRow: {
 flexDirection: "row",
 },
 input: {
 borderColor: " #BDDB8C",
 borderRadius: 4,
 borderWidth: 1,
 flex: 1,
 height: 48,
 margin: 16,
 padding: 8,
 },
 listArea: {
 backgroundColor: "#f0f0f0",
 flex: 1,
 paddingTop: 16,
 },
 sectionContainer: {
 marginBottom: 16,
 marginHorizontal: 16,
 },
 sectionHeading: {
 fontSize: 18,
 marginBottom: 8,
 },
});


