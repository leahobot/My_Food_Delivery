import { fontFamilies, fontSizes } from "@/theme/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		position: "relative",
		flexDirection: "column",
		alignItems: "center",
		gap: 4,
		width: 80,
	},
	icon: {
		width: 28,
		height: 28,
	},
	title: {
		fontFamily: fontFamilies.bold,
		fontSize: fontSizes.sm,
		color: "#878787",
	},
	isFocused: {
		color: "#FE8C00",
	},
	cartBadge: {
		position: "absolute",
		top: -8,
		right: 15,
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: "#FE8C00",
		alignItems: "center",
		justifyContent: "center",
	},

	cartText: {
		fontFamily: fontFamilies.bold,
		fontSize: 13.73,
		color: "#FFFFFF",
		lineHeight: 18.8,
	},
});
