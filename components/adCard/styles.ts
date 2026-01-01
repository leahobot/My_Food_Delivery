import { fontFamilies, fontSizes } from "@/theme/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	card: {
		height: 225,
		width: "100%",
		position: "relative",
		borderRadius: 12,
		overflow: "hidden",
		marginBottom: 18,
	},

	textContainer: {
		height: "100%",
		width: 200,
		position: "absolute",
		paddingVertical: 28,
		paddingLeft: 20,
		justifyContent: "center",
	},

	centerContent: {
		justifyContent: "space-between",
	},

	title: {
		fontSize: fontSizes.xxl,
		lineHeight: 38,
		fontFamily: fontFamilies.bold,
		color: "#fff",
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},

	price: {
		fontSize: fontSizes.xl,
		fontFamily: fontFamilies.bold,
		color: "#fff",
	},

	arrow: {
		height: 16,
		width: 33,
		marginTop: 8,
	},

	imageContainer: {
		height: "100%",
		width: "60%",
		marginLeft: -20,
		position: "absolute",
		top: 0,
	},

	right: {
		right: 0,
	},

	left: {
		left: 0,
	},

	image: {
		width: "100%",
		height: "100%",
	},
});
