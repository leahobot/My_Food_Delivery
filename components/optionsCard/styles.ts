import { fontFamilies, fontSizes } from "@/theme/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		position: "relative",
		width: 95,
		height: 110,
		borderRadius: 18,
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
		height: 70,
		borderRadius: 18,
		backgroundColor: "#FFFFFF",
		zIndex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	price: {
		position: "absolute",
		left: 28,
		bottom: 40,
		color: "#3C2F2F",
		fontSize: fontSizes.xs,
		fontFamily: fontFamilies.bold,
		zIndex: 2,
	},
	textContainer: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: 70,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#3C2F2F",
		paddingTop: 25,
		paddingHorizontal: 8,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		overflow: "hidden",
	},
	name: {
		color: "#FFFFFF",
		fontSize: fontSizes.xs,
		fontFamily: fontFamilies.semiBold,
	},
	icon: {
		width: 16,
		height: 16,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
	},
});
