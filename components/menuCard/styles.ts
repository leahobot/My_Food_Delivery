import { fontFamilies, fontSizes } from "@/theme/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	card: {
		position: "relative",
		width: "45%",
		height: 208,
		backgroundColor: "#FFFFFF",
		borderRadius: 30,
		padding: 12,

		// iOS shadow
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 8,
		shadowOffset: {
			width: 0,
			height: 4,
		},

		// Android shadow
		elevation: 8,
	},
	imageContainer: {
		position: "absolute",
		top: -50,
		left: 22,
		width: 130,
		height: 120,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	textContainer: {
		marginTop: 65,
	},
	titleText: {
		fontFamily: fontFamilies.bold,
		fontSize: fontSizes.lg,
		color: "#181C2E",
		textAlign: "center",
	},
	priceText: {
		fontFamily: fontFamilies.semiBold,
		fontSize: fontSizes.sm,
		color: "#878787",
		textAlign: "center",
		marginVertical: 8,
	},
	addToCart: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 4,
	},
	buttonText: {
		marginTop: 2,
		fontFamily: fontFamilies.bold,
		fontSize: fontSizes.md,
		color: "#FE8C00",
		textAlign: "center",
	},
	itemAddedText: {
		marginTop: 2,
		fontFamily: fontFamilies.bold,
		fontSize: fontSizes.md,
		color: "#0a672cff",
		textAlign: "center",
	},
});
