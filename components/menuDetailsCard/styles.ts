import { fontFamilies, fontSizes } from "@/theme/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	menuCard: {
		width: "100%",
		position: "relative",
	},
	menuItem: {
		width: "50%",
	},
	menuImage: {
		position: "absolute",
		top: 0,
		right: 0,
		width: "57%",
		height: 250,
	},
	menuImageContent: {
		width: "100%",
		height: "100%",
	},
	menuName: {
		fontFamily: fontFamilies.bold,
		fontSize: fontSizes.xl,
		color: "#181C2E",
	},
	menuCategory: {
		fontFamily: fontFamilies.medium,
		fontSize: fontSizes.md,
		color: "#878787",
		marginVertical: 5,
		textTransform: "capitalize",
	},
	rating: {
		fontFamily: fontFamilies.semiBold,
		fontSize: fontSizes.md,
		color: "#878787",
	},
	nutrients: {
		fontFamily: fontFamilies.semiBold,
		fontSize: fontSizes.md,
		color: "#181C2E",
	},
	ratingRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	stars: {
		flexDirection: "row",
	},

	star: {
		width: 16,
		height: 16,
	},

	price: {
		marginVertical: 15,
		fontSize: 20,
		fontWeight: "600",
	},

	priceSymbol: {
		color: "#FE8C00",
	},

	nutrientsRow: {
		flexDirection: "row",
		gap: 28,
		flexWrap: "wrap",
	},
});
