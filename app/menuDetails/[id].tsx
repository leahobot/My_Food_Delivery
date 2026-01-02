import MenuDetailsCard from "@/components/menuDetailsCard";
import OptionsCard from "@/components/optionsCard";
import { images, sides, toppings } from "@/constants";
import { useCartContext } from "@/context/cartProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
	FlatList,
	Image,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

const MenuDetails = () => {
	const router = useRouter();

	const { id } = useLocalSearchParams<{ id: string }>();
	const { getMenuItemById } = useCartContext();

	const menuItem = getMenuItemById(id);

	return (
		<SafeAreaView style={styles.detailsTab}>
			{/* Header */}
			<View style={styles.detailsHeader}>
				<Pressable
					hitSlop={10}
					onPress={() => router.back()}>
					<Image
						source={images.arrowBack}
						style={styles.detailsIcon}
					/>
				</Pressable>

				<Pressable
					hitSlop={10}
					onPress={() => router.push("/(tabs)/search")}>
					<Image
						source={images.search}
						style={styles.detailsIcon}
					/>
				</Pressable>
			</View>

			{/* Content */}
			{!menuItem ? (
				<View style={styles.emptyDetailsTab}>
					<Image
						source={images.emptyState}
						resizeMode="cover"
						style={styles.emptyStateImage}
					/>
					<Text style={styles.emptyStateTitle}>
						Menu Item not found
					</Text>
				</View>
			) : (
				<ScrollView
					style={styles.detailsContainer}
					showsVerticalScrollIndicator={false}>
					<MenuDetailsCard menuItem={menuItem} />

					<Text style={styles.listHeader}>Toppings</Text>
					<FlatList
						data={toppings}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.listContainer}
						keyExtractor={(item) => item.name}
						renderItem={({ item }) => <OptionsCard {...item} />}
					/>

					<Text style={styles.listHeader}>SideOptions</Text>
					<FlatList
						data={sides}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.listContainer}
						keyExtractor={(item) => item.name}
						renderItem={({ item }) => <OptionsCard {...item} />}
					/>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

export default MenuDetails;
