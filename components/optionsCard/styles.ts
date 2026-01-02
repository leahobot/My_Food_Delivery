import { fontFamilies, fontSizes } from "@/theme/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		position: "relative",
		width: 84,
		height: 99,
		borderRadius: 15,
		backgroundColor: "#FFFFFF",

		// iOS shadow
		shadowColor: "#000",
		shadowOpacity: 0.12,
		shadowRadius: 10,
		shadowOffset: {
			width: 0,
			height: 6,
		},

		// Android shadow
		elevation: 10,
	},
	imageContainer: {
		position: "absolute",
		top: 0,
		width: "100%",
		height: 61,
		borderRadius: 15,
		backgroundColor: "#FFFFFF",
		zIndex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	price: {
		position: "absolute",
		left: 26,
		bottom: 36,
		color: "#3C2F2F",
		fontSize: fontSizes.xs,
		fontFamily: fontFamilies.bold,
		zIndex: 2,
	},
	textContainer: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: 50,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#3C2F2F",
		paddingTop: 10,
		paddingHorizontal: 6,
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
		overflow: "hidden",
	},
	name: {
		color: "#FFFFFF",
		fontSize: fontSizes.xs,
		fontFamily: fontFamilies.semiBold,
	},
	icon: {
		backgroundColor: "#EF2A39",
		width: 16,
		height: 16,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
	},
});
