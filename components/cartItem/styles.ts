import { fontFamilies, fontSizes } from "@/theme/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		height: 106,
		width: "100%",
		backgroundColor: "#FFFFFF",
		borderRadius: 12,
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
		padding: 12,

		// iOS shadow
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 6,
		shadowOffset: {
			width: 0,
			height: 6,
		},

		// Android shadow
		elevation: 7,
	},
	imageContainer: {
		width: 85,
		height: "100%",
		backgroundColor: "#fe8c001a",
		borderRadius: 8,
		padding: 6,
	},
	textContainer: {
		height: "100%",
		flex: 1,
		justifyContent: "space-between",
	},
	name: {
		fontFamily: fontFamilies.bold,
		fontSize: fontSizes.md,
		color: "#181C2E",
	},
	price: {
		fontFamily: fontFamilies.bold,
		fontSize: fontSizes.md,
		color: "#FE8C00",
	},
	trash: {
		alignSelf: "flex-end",
	},
	itemCountContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
	},
	itemCount: {
		fontFamily: fontFamilies.bold,
		fontSize: fontSizes.lg,
		color: "#181C2E",
	},
	iconCountContainer: {
		width: 30,
		height: 30,
		backgroundColor: "#fe8c0014",
		borderRadius: 4,
		alignItems: "center",
		justifyContent: "center",
	},
});
