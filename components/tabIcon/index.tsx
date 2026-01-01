import { TabIconProps } from "@/constants/types";
import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

const TabIcon = ({ icon, focused, title, cartItems }: TabIconProps) => {
	return (
		<View style={styles.container}>
			<Image
				source={icon}
				tintColor={focused ? "#FE8C00" : "#5D5F6D"}
				style={styles.icon}
				resizeMode="contain"
			/>

			{cartItems !== undefined && cartItems > 0 && (
				<View style={styles.cartBadge}>
					<Text style={styles.cartText}>{cartItems}</Text>
				</View>
			)}

			<Text style={[styles.title, focused ? styles.isFocused : {}]}>
				{title}
			</Text>
		</View>
	);
};

export default TabIcon;
