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
