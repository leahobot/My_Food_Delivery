import { StyleSheet } from "react-native";
import { fontFamilies, fontSizes } from "./typography";

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
	homeTab: {
		height: "100%",
		width: "100%",
		backgroundColor: "#FFFFFF",
		padding: 20,
	},

	homeHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 30,
	},

	user: {
		fontFamily: fontFamilies.semiBold,
		color: "#FE8C00",
		marginBottom: 6,
		fontSize: fontSizes.xs,
	},
	userHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	userName: {
		fontFamily: fontFamilies.bold,
		color: "#181C2E",
		fontSize: fontSizes.md,
	},
	cart: {
		height: 40,
		width: 40,
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 50,
		backgroundColor: "#181C2E",
	},
	arrow: { height: 10, width: 14 },
	bag: {
		height: 20,
		width: 20,
	},
	badge: {
		width: 20,
		height: 20,
		position: "absolute",
		top: -8,
		right: -5,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FF7622",
		borderRadius: 50,
	},
	badgeText: {
		color: "#FFFFFF",
	},
	profileTab: {
		height: "100%",
		width: "100%",
		padding: 20,
	},
	profileHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 36,
	},
	profileIcon: { height: 20, width: 20 },
	profileHeaderText: {
		fontFamily: fontFamilies.semiBold,
		fontSize: fontSizes.lg,
		color: "#181C2E",
	},
	profileAvatarContainer: {
		alignItems: "center",
		marginBottom: 30,
	},
	profileAvatar: {
		height: 100,
		width: 100,
	},
	profileInfo: {
		backgroundColor: "#FFFFFF",
		width: "100%",
		paddingVertical: 20,
		paddingHorizontal: 14,
		borderRadius: 20,
	},
	profileItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	profileIconWrapper: {
		width: 48,
		height: 48,
		backgroundColor: "#fe8c001a",
		borderRadius: 50,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#fe8c001a",
	},
	profileLabel: {
		color: "#6A6A6A",
		fontFamily: fontFamilies.medium,
		fontSize: fontSizes.sm,
		marginBottom: 4,
	},
	profileValue: {
		color: "#181C2E",
		fontFamily: fontFamilies.semiBold,
		fontSize: fontSizes.md,
	},
	profileButtons: {
		gap: 20,
		marginTop: 30,
	},
	profileEditButton: {
		height: 48,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fe8c001a",
		borderRadius: 100,
		borderWidth: 1,
		borderColor: "#FE8C00",
	},
	profileEditText: {
		fontFamily: fontFamilies.semiBold,
		fontSize: fontSizes.md,
		color: "#FE8C00",
	},
	profileLogoutButton: {
		height: 48,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: "#f1414119",
		borderRadius: 100,
		borderWidth: 1,
		borderColor: "#F14141",
	},
	profileLogoutText: {
		fontFamily: fontFamilies.semiBold,
		fontSize: fontSizes.md,
		color: "#F14141",
	},
	logoutIcon: {
		width: 24,
		height: 24,
	},
});
