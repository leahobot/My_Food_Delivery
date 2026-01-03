import { fontFamilies, fontSizes } from "@/theme/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	main: {
		gap: 30,
	},
	container: {
		width: "100%",
		padding: 20,
		borderWidth: 1,
		borderColor: "#dededeff",
		borderRadius: 16,
	},
	button: {
		width: "100%",
		height: 48,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fe8c00",
		borderRadius: 100,
		marginBottom: 100,
	},
	buttonText: {
		fontFamily: fontFamilies.bold,
		fontSize: fontSizes.md,
		color: "#FFFFFF",
	},
	title: {
		fontFamily: fontFamilies.bold,
		fontSize: fontSizes.lg,
		color: "#181C2E",
	},
	list: {
		gap: 16,
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#dededeff",
	},
	listItem: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	label: {
		fontFamily: fontFamilies.medium,
		fontSize: fontSizes.md,
		color: "#6A6A6A",
	},
	value: {
		fontFamily: fontFamilies.bold,
		fontSize: fontSizes.md,
		color: "#181C2E",
	},
});
