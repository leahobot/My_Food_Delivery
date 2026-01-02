import React from "react";
import { Text, TouchableOpacity } from "react-native";

// constants
import { MenuItem } from "@/constants/types";

const MenuCard = ({ item }: { item: MenuItem }) => {
	return (
		<TouchableOpacity>
			<Text>{item.name}</Text>
		</TouchableOpacity>
	);
};

export default MenuCard;
