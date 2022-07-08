import { Button, Text, View, TextInput, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import colors from "../res/colors";
import fonts from "../res/fonts";

const Todo = () => {
	const [inputs, setInputs] = useState("0");
	const [inputText, setInputText] = useState("");
	const [todoMsgList, setTodoMsgList] = useState([]);
	const [idLength, setIdLength] = useState(0);
	const todoArray = [];
	const [alertMes, setAlertMes] = useState("");

	const readIdLength = async () => {
		try {
			const value = await AsyncStorage.getItem("0");
			if (value !== null) {
				setInputs(+value);
			}
		} catch (e) {
			alert("Failed to fetch the input from storage");
		}
	};

	readIdLength();

	useEffect(() => {
		try {
			if (Number(inputs)) {
				setAlertMes("here is " + inputs + " records");
				for (let i = 1; i <= inputs; i++) {
					readData(i);
				}
			} else {
				setAlertMes("no todo data");
			}
		} catch (e) {
			alert("can't read array!");
		}
	}, [inputs]);

	// useEffect(() => {
	//     console.warn("useEffect", todoMsgList);
	// }, [todoMsgList])

	// function increaseId() {
	//     readIdLength();
	//     setIdLength({idLength} + 1)
	// }

	// function decreaseId() {
	//     setIdLength({idLength} - 1)
	// }

	const handleAddTodoRecord = () => {
		try {
			if (Number(inputs)) {
				let id = Number(inputs) + 1;

				saveData(id, inputText);
				recordIdLength(id);
				console.warn("add second data, here is " + { id } + " records");
			} else {
				saveData(1, inputText);
				recordIdLength(1);
				console.warn("add first todo data");
			}
		} catch (e) {
			alert("can't read array!");
		}
	};

	const saveData = async (id, value) => {
		try {
			await AsyncStorage.setItem(id, value);
			console.warn("Data successfully saved");
		} catch (e) {
			alert("Failed to save the data to the storage");
		}
	};

	const readData = async (id) => {
		try {
			const value = await AsyncStorage.getItem(id);
			if (value !== null) {
				todoArray.push([id, value]);
				console.warn("todoArray", todoArray);
			}
		} catch (e) {
			alert("Failed to fetch the input from storage");
		} finally {
			setTodoMsgList(todoArray);
		}
	};

	const recordIdLength = async (value) => {
		try {
			await AsyncStorage.setItem("0", value);
			console.warn("Data successfully saved");
		} catch (e) {
			alert("Failed to save the data to the storage");
		} finally {
			readIdLength();
		}
	};

	return (
		<>
			<Text>Alert: {alertMes}</Text>
			<TextInput
				style={{
					borderColor: colors.mainBlack,
					borderWidth: 1,
					borderRadius: 5,
					paddingHorizontal: 5,
					width: "90%",
				}}
				onChangeText={setInputText}
				value={inputText}
			/>

			<Text>{"Id length is: " + inputs}</Text>

			<Button title="reset" onPress={() => recordIdLength(0)} />
			<Button title="Read ID length" onPress={() => readIdLength()} />

			{/* add todo */}
			<Button
				title="Add record"
				onPress={() => handleAddTodoRecord(inputText)}
			/>
			<Button
				title="Show TodoArray"
				onPress={() => console.warn(todoMsgList)}
			/>
			<View>
				{!todoMsgList.length ? (
					<Text>Load...</Text>
				) : (
                    <FlatList>
                        

                    </FlatList>
					todoMsgList.map((value, index) => {
                        <Text>{index}</Text>
						// <>
						// 	<Text>{value[index[1]]}</Text>
						// 	<Text>{value[index[2]]}</Text>
						// </>;
					})
				)}
			</View>
		</>
	);
};

export { Todo };
