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
	price?: number;
};

export type TabIconProps = {
	icon: ImageSourcePropType;
	focused: boolean;
	title: string;
	cartItems?: number;
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
};
