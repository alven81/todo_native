import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const Todo = () => {
	const saveData = async (age) => {
		try {
			await AsyncStorage.setItem(STORAGE_KEY, age);
			alert("Data successfully saved");
		} catch (e) {
			alert("Failed to save the data to the storage");
		}
	};

	return (
		<>
			<Text>Text</Text>
			<Button title="test" onPress={() => saveData(25)} />
		</>
	);
};

export { Todo };
