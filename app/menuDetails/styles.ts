import { fontFamilies, fontSizes } from "@/theme/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	detailsTab: {
		height: "100%",
		width: "100%",
		paddingHorizontal: 20,
		paddingTop: 20,
		paddingBottom: 100,
	},
	detailsHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 36,
	},
	detailsIcon: { height: 20, width: 20 },
	emptyDetailsTab: {
		height: "100%",
		width: "100%",
		alignItems: "center",
	},
	emptyStateImage: {
		width: 220,
		height: 170,
		marginTop: 150,
	},
	emptyStateTitle: {
		fontFamily: fontFamilies.bold,
		fontSize: fontSizes.md,
		color: "#181C2E",
		textAlign: "center",
		marginTop: 20,
	},
	detailsContainer: {
		paddingBottom: 60,
		gap: 25,
	},
	listContainer: {
		gap: 30,
	},
	listHeader: {
		marginTop: 30,
		marginBottom: 12,
		fontFamily: fontFamilies.bold,
		fontSize: fontSizes.md,
		color: "#181C2E",
	},
});
