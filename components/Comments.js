import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, SafeAreaView, StatusBar, FlatList, Text, View } from 'react-native';

const Item = ({ name, email }) => (
<View style={styles.item}>
<Text style={styles.name}>{name}</Text>
<Text style={styles.email}>{email}</Text>
</View>
);

export default Comments = () => {

const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);
useEffect(() => {
fetch(' https://data.mongodb-api.com/app/realmflix-szjrp/endpoint/RealmFlixAPI')
.then((response) => response.json())
//.then((json) => console.log(json))
.then((json) => setData(json))
.catch((error) => console.error(error))
.finally(() => setLoading(false));
}, []);

const renderItem = ({ item }) => (
<Item name={item.name} email={item.email} />
);

return (
<SafeAreaView style={styles.container}>
{isLoading ? <ActivityIndicator style={styles.activity} size="large"/> : (
<View>
<Text style={styles.title}>Dados do MFlix</Text>
<FlatList
data={data}
keyExtractor={(item, index) => index}
renderItem={renderItem}
/>
</View>
)}
</SafeAreaView >
);
};