import AdCard from "@/components/adCard";
import { AdsCards, images } from "@/constants";
import { baseStyles } from "@/theme/baseStyles";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
	const router = useRouter();

	return (
		<SafeAreaView style={baseStyles.homeTab}>
			<View style={baseStyles.homeHeader}>
				<View>
					<Text style={baseStyles.user}>DELIVER TO</Text>
					<View style={baseStyles.userHeader}>
						<Text style={baseStyles.userName}>John Legend</Text>
						<Image
							source={images.arrowDown}
							style={baseStyles.arrow}
						/>
					</View>
				</View>

				<TouchableOpacity
					style={baseStyles.cart}
					onPress={() => router.push("/(tabs)/cart")}>
					<Image
						source={images.bag}
						style={baseStyles.bag}
					/>
					<View style={baseStyles.badge}>
						<Text style={baseStyles.badgeText}>2</Text>
					</View>
				</TouchableOpacity>
			</View>

			<FlatList
				data={AdsCards}
				keyExtractor={(item) => item.id.toString()}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => <AdCard {...item} />}
			/>
		</SafeAreaView>
	);
};

export default Index;
