import { MenuItem } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Client, TablesDB } from "react-native-appwrite";

const MENU_CACHE_KEY = "MENU_ITEMS_CACHE";
const MENU_CACHE_TIME_KEY = "MENU_ITEMS_CACHE_TIME";
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes

export const appWriteConfig = {
	endPoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
	projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
	databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
	menuTableId: process.env.EXPO_PUBLIC_APPWRITE_MENU_TABLE_ID!,
};

const client = new Client()
	.setEndpoint(appWriteConfig.endPoint)
	.setProject(appWriteConfig.projectId);

const tablesDB = new TablesDB(client);

export const getMenuItems = async (): Promise<any> => {
	try {
		const cached = await AsyncStorage.getItem(MENU_CACHE_KEY);
		const cachedTime = await AsyncStorage.getItem(MENU_CACHE_TIME_KEY);

		const isCacheValid =
			cached && cachedTime && Date.now() - Number(cachedTime) < CACHE_TTL;

		if (isCacheValid) {
			return JSON.parse(cached) as MenuItem[];
		}

		const result = await tablesDB.listRows({
			databaseId: appWriteConfig.databaseId,
			tableId: appWriteConfig.menuTableId,
		});

		const menuItems = result?.rows;

		await AsyncStorage.multiSet([
			[MENU_CACHE_KEY, JSON.stringify(menuItems)],
			[MENU_CACHE_TIME_KEY, Date.now().toString()],
		]);

		return menuItems;
	} catch (error) {
		console.error("Menu cache failed, fetching fresh", error);
		throw error;
	}
};
