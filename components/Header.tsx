import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const Header = () => {
	const { colors } = useTheme();
	const homeStyles = createHomeStyles(colors);
	const todos = useQuery(api.todos.getTodos);

	const completedTodos = todos
		? todos.filter((todo) => todo.isCompleted).length
		: 0;
	const totalTodos = todos ? todos.length : 0;

	const progressPercentage =
		totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

	return (
		<View style={homeStyles.header}>
			<View style={homeStyles.titleContainer}>
				<LinearGradient
					colors={colors.gradients.primary}
					style={homeStyles.iconContainer}
				>
					<Ionicons name="flash-outline" size={28} color="#ffffff" />
				</LinearGradient>

				<View style={homeStyles.titleTextContainer}>
					<Text style={homeStyles.title}>Today&apos; Tasks</Text>
					<Text style={homeStyles.subtitle}>
						{completedTodos} of {totalTodos} completed
					</Text>
				</View>
			</View>

			{/* Progress Bar */}
			{totalTodos > 0 && (
				<View style={homeStyles.progressContainer}>
					<View style={homeStyles.progressBarContainer}>
						<View style={homeStyles.progressBar}>
							<LinearGradient
								colors={colors.gradients.success}
								style={[
									homeStyles.progressFill,
									{ width: `${progressPercentage}%` },
								]}
							/>
						</View>
						<Text style={homeStyles.progressText}>
							{Math.round(progressPercentage)}%
						</Text>
					</View>
				</View>
			)}
		</View>
	);
};

export default Header;
