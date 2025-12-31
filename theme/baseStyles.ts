import { StyleSheet } from "react-native";

export const baseStyles = StyleSheet.create({
	rootTab: {
		height: 86,
		flexDirection: "row",
		alignItems: "center",

		position: "absolute",
		borderRadius: 70,
		paddingTop: 5,
		marginHorizontal: 15,
		paddingHorizontal: 14,
		backgroundColor: "#FFFFFF",

		shadowColor: "#1a1a1a",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 5,
	},
});
