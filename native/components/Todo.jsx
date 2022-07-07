import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const Todo = () => {

    const [input, setInput] = useState();
    const todoArray = [];

    useEffect(() => {
        if (readTodoLength()) {
            //for (i = 0; i < readTodoLength(); i++) {
            //    todoArray[i] = readData(i)
            //}
        } else {
            alert("no todo data")
        }
    }) 

    const readTodoLength = async () => {
		try {
			const value = await AsyncStorage.getItem("0");
			if (value !== null) {
				setInput(value);
			}
		} catch (e) {
			alert("Failed to fetch the input from storage");
		}
	};

	const saveData = async (age) => {
		try {
			await AsyncStorage.setItem("test", age);
			alert("Data successfully saved");
		} catch (e) {
			alert("Failed to save the data to the storage");
		}
	};

	const readData = async () => {
		try {
			const value = await AsyncStorage.getItem("test");
			if (value !== null) {
				setInput(value);
			}
		} catch (e) {
			alert("Failed to fetch the input from storage");
		}
	};

	return (
		<>
			<Text>{input}</Text>
			<Button title="save" onPress={() => saveData(20)} />
            <Button title="read" onPress={() => readData()} />
            <Button title="read" onPress={setInput(todoArray)} />
            
		</>
	);
};

export { Todo };
