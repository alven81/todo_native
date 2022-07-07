import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Todo } from "../components/Todo";
import { Edit } from "../components/Edit";
import colors from "../res/colors";
import fonts from "../res/fonts";

const Tab = createBottomTabNavigator();
const ListStack = createNativeStackNavigator();
const ChangeStack = createNativeStackNavigator();

function RootNavigator() {
    
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarScrollEnabled: true,
				}}
			>
				<Tab.Screen
					name="ToDo List"
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialIcons
								name="list"
								color={color}
								size={size}
							/>
						),
					}}
				>
					{() => (
						<ListStack.Navigator initialRouteName="Home">
							<ListStack.Screen
								name="Todo"
								component={Todo}
								options={{
									title: "ToDo List",
									headerStyle: {
										backgroundColor: colors.mainMenu,
									},
									headerTintColor: colors.mainWhite,
									headerTitleStyle: {
                                        fontFamily: fonts.main,
										fontWeight: "bold",
									},
								}}
							/>
						</ListStack.Navigator>
					)}
				</Tab.Screen>
				<Tab.Screen
					name="Edit ToDo"
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialIcons
								name="edit"
								color={color}
								size={size}
							/>
						),
					}}
				>
					{() => (
						<ChangeStack.Navigator>
							<ChangeStack.Screen
								name="Edit"
								component={Edit}
								options={{
									title: "Edit",
									headerStyle: {
										backgroundColor: colors.mainMenu,
									},
									headerTintColor: colors.mainWhite,
									headerTitleStyle: {
                                        fontFamily: fonts.main,
										fontWeight: "bold",
									},
								}}
							/>
						</ChangeStack.Navigator>
					)}
				</Tab.Screen>
			</Tab.Navigator>
		</NavigationContainer>
	);
}

export { RootNavigator };
