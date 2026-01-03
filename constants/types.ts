import { ImageSourcePropType } from "react-native";

export type Direction = "left" | "right";

export type AdCardLayout = {
	direction: Direction;
	centerContent?: boolean;
};

export type AdCardProps = {
	id: number;
	title: string;
	color: string;
	image: ImageSourcePropType;
	layout: AdCardLayout;
	searchQuery: string;
	price?: number;
};

export type TabIconProps = {
	icon: ImageSourcePropType;
	focused: boolean;
	title: string;
	cartItems?: number;
};

export type MenuOptions = {
	toppings: string[];
	sides: string[];
};

export type MenuItem = {
	$id: number;
	$createdAt: string;
	$updatedAt: string;
	name: string;
	description: string;
	category: string;
	price: number;
	imageUrl: ImageSourcePropType;
	rating: number;
	calories: number;
	fat: number;
	protein: number;
	carbs: number;
	allergens?: string[];
	isAvailable?: boolean;
	currency?: string;
	toppings?: string[];
	sides?: string[];
	quantity?: number;
	totalAmount?: number;
};

export type StateContextType = {
	cartItems: MenuItem[];
	noOfCartItems: number;
	loading: boolean;
	menuOptions: MenuOptions;
	addToCart: (item: MenuItem) => void;
	removeFromCart: (itemId: string) => void;
	getMenuItemById: (itemId: string) => MenuItem | undefined;
	clearCart: () => void;
	toggleTopping: (topping: string) => void;
	toggleSide: (topping: string) => void;
};
