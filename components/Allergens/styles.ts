import { fontFamilies, fontSizes } from "@/theme/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	labelContainer: {
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 15,
		backgroundColor: "#0b435718",
	},
	label: {
		fontFamily: fontFamilies.semiBold,
		fontSize: fontSizes.md,
		color: "#181C2E",
		textTransform: "capitalize",
	},
});
