import { StyleSheet, Text, View } from "react-native";

export default function Index() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Index Screen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		color: "#ffffff",
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#222222",
	},
});
