import { fontFamilies, fontSizes } from "@/theme/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	detailsTab: {
		height: "100%",
		width: "100%",
		paddingHorizontal: 20,
		paddingTop: 20,
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
	description: {
		marginTop: 24,
		fontFamily: fontFamilies.medium,
		fontSize: fontSizes.md,
		color: "#6A6A6A",
	},
	labelContainer: {
		height: 47,
		width: "100%",
		borderRadius: 30,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 34,
		paddingHorizontal: 20,
		backgroundColor: "#fe8c0011",
	},
	label: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	labelText: {
		fontFamily: fontFamilies.semiBold,
		fontSize: fontSizes.md,
		color: "#181C2E",
	},
	addButton: {
		height: 78,
		width: "100%",
		paddingHorizontal: 18,
		marginTop: 50,
		marginBottom: 30,
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",

		// iOS shadow
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 8,
		shadowOffset: {
			width: 0,
			height: 4,
		},

		// Android shadow
		elevation: 16,
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
	button: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		backgroundColor: "#FE8C00",
		paddingVertical: 14,
		paddingHorizontal: 28,
		borderRadius: 100,
	},
	buttonText: {
		fontFamily: fontFamilies.semiBold,
		fontSize: fontSizes.sm,
		color: "#FFFFFF",
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
