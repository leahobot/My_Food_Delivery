import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// constants
import { images } from "@/constants";
import { baseStyles } from "@/theme/baseStyles";

// components

const Cart = () => {
	const router = useRouter();

	return (
		<SafeAreaView style={baseStyles.profileTab}>
			{/* Header */}
			<View style={baseStyles.profileHeader}>
				<Pressable
					hitSlop={10}
					onPress={() => router.back()}>
					<Image
						source={images.arrowBack}
						style={baseStyles.profileIcon}
					/>
				</Pressable>

				<Pressable
					hitSlop={10}
					onPress={() => router.push("/(tabs)/search")}>
					<Image
						source={images.search}
						style={baseStyles.profileIcon}
					/>
				</Pressable>
			</View>

			<View style={baseStyles.cartHeader}>
				<View>
					<Text style={baseStyles.user}>DELIVERY LOCATION</Text>
					<Text style={baseStyles.userName}>Home</Text>
				</View>

				<Pressable style={baseStyles.changeLocation}>
					<Text style={baseStyles.locationText}>Change Location</Text>
				</Pressable>
			</View>

			{/* CartItems */}
		</SafeAreaView>
	);
};

export default Cart;
