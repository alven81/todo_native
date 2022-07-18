import { Button, Text, View, TextInput, FlatList, SafeAreaView, Item } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import colors from "../res/colors";
import fonts from "../res/fonts";

//const todoArray = [];

const Todo = () => {
	const [inputs, setInputs] = useState("0");
	const [inputText, setInputText] = useState("");
	const [todoMsgList, setTodoMsgList] = useState([]);
	const [idLength, setIdLength] = useState(0);
	const [alertMes, setAlertMes] = useState("");
	const [todoArray, setTodoArray] = useState("");


	useEffect(() => {
		readData();
	}, []);

	const readIdLength = () => {
		console.warn("readIdLength", todoArray.length);
			if (todoArray) {
				setInputs(todoArray.length);
			} else {
				setInputs(0);
			}
	};

	const clearStorage = async () => {
		try {
		  await AsyncStorage.clear();
		  readData();
		  alert('Storage successfully cleared!');
		} catch (e) {
		  console.warn('Failed to clear the async storage.');
		}
	  };



	const handleAddTodoRecord = (inputText) => {
		console.warn("inputText", inputText);
		//console.warn("todoArray length", todoArray.length);
		try {
				if (!todoArray) {
					console.warn("ADD FIRST RECORD");
					todoArray.push({
						"text": inputText, 
						"date": new Date().toLocaleDateString(), 
						"time": new Date().toLocaleTimeString()}
					);
					saveData("1", todoArray);	
				} 
					else
				{
					todoArray.push({
						"text": inputText, 
						"date": new Date().toLocaleDateString(),
						"time": new Date().toLocaleTimeString()}
					)
					console.warn("ADD OTHER RECORDS");
					console.warn("after push: ", todoArray);
					//console.warn("todoArray length", todoArray.length);
					saveData("1", todoArray);
				}
		} catch (e) {
				alert("can't read array!");
		}
			finally {
				console.warn("Finally todoArray:", todoArray);
		}
	};


	const saveData = async (id, value) => {
		try {
			await AsyncStorage.setItem(id, JSON.stringify(value));
			readData();
		} catch (e) {
			alert("Failed to save the data to the storage1");
		}
	};


	
	const readData = async () => {
		try {
			const result = await AsyncStorage.getItem("1");
			if (!result) {
				setTodoArray([])	
			} else
			setTodoArray(JSON.parse(result));
		} catch (e) {
			alert("Failed to fetch the input from storage");
		} finally {

		}
	};


	const renderItem = ({ item }) => (
		<View style={{borderColor: colors.mainWhite, borderWidth: 1, margin: 5, borderRadius: 6, padding: 3}}>
			<Text style={{fontFamily: fonts.main,  color: colors.mainGreen}}>{item.date}, {item.time}</Text>
	  		<Text style={{fontFamily: fonts.main, color: colors.mainGreen}}>{item.text}</Text>
		</View>
	);


	return (
		<View style={{backgroundColor: colors.mainBlack}}>
			<Text>Alert: {alertMes}</Text>
			<TextInput
				style={{
					borderColor: colors.mainWhite,
					borderWidth: 1,
					borderRadius: 5,
					paddingHorizontal: 5,
					width: "90%",
					color: colors.mainGreen
				}}
				onChangeText={setInputText}
				value={inputText}
			/>

			<Text>{"Id length is: " + inputs}</Text>

			<Button title="reset" onPress={() => clearStorage()} />

			{/* add todo */}
			<Button
				title="Add record"
				onPress={() => handleAddTodoRecord(inputText)}
			/>
			<View>
				{!todoArray.length ? (
					<Text>Load...</Text>
				) : (
					<SafeAreaView>
					<FlatList
					  data={todoArray}
					  renderItem={renderItem}
					  keyExtractor={item => item.text}
					/>
				  </SafeAreaView>

)
}

 	 		</View> 
				
		</View>		
	);
};

export { Todo };
