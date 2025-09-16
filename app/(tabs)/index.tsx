import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/Header";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	const { toggleDarkMode, colors } = useTheme();
	const homeStyles = createHomeStyles(colors);
	return (
		<LinearGradient
			colors={colors.gradients.background}
			style={homeStyles.container}
		>
			<StatusBar barStyle={colors.statusBarStyle} />
			<SafeAreaView style={homeStyles.safeArea}>
				<Header />

				<TouchableOpacity onPress={toggleDarkMode}>
					<Text>Toggle Mode</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</LinearGradient>
	);
}
