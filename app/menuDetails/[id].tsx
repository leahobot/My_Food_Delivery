import { useStateContext } from "@/context/StateProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
	FlatList,
	Image,
	ImageSourcePropType,
	Pressable,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// constants
import { images, sides, toppings } from "@/constants";
import { styles } from "./styles";

// components
import Allergens from "@/components/Allergens/Index";
import MenuDetailsCard from "@/components/menuDetailsCard";
import OptionsCard from "@/components/optionsCard";

const MenuDetails = () => {
	const router = useRouter();

	const { id } = useLocalSearchParams<{ id: string }>();
	const { menuOptions, getMenuItemById, toggleTopping, toggleSide } =
		useStateContext();

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

					{/* Delivery Label */}
					<View style={styles.labelContainer}>
						<Label
							label="Free Delivery"
							icon={images.dollar}
						/>
						<Label
							label="10 - 15 mins delivery"
							icon={images.clock}
						/>
						<Label
							label="4.7"
							icon={images.star}
						/>
					</View>

					{/* Allergens */}
					{menuItem?.allergens && menuItem.allergens?.length > 0 && (
						<View>
							<Text style={styles.listHeader}>Allergens</Text>
							<Allergens allergens={menuItem.allergens} />
						</View>
					)}

					{/* Description */}
					<Text style={styles.description}>
						{menuItem.description}
					</Text>

					{/* Toppings */}
					<Text style={styles.listHeader}>Toppings</Text>
					<FlatList
						data={toppings}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.listContainer}
						keyExtractor={(item) => item.name}
						renderItem={({ item }) => {
							const isToppingAdded =
								menuOptions.toppings?.includes(
									item.name?.toLowerCase()
								);
							return (
								<OptionsCard
									{...item}
									isAdded={isToppingAdded}
									onPress={(text) => toggleTopping(text)}
								/>
							);
						}}
					/>

					{/* Sides */}
					<Text style={styles.listHeader}>SideOptions</Text>
					<FlatList
						data={sides}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.listContainer}
						keyExtractor={(item) => item.name}
						renderItem={({ item }) => {
							const isSideAdded = menuOptions.sides?.includes(
								item.name?.toLowerCase()
							);

							return (
								<OptionsCard
									{...item}
									isAdded={isSideAdded}
									onPress={(text) => toggleSide(text)}
								/>
							);
						}}
					/>

					<View style={styles.addButton}>
						<View style={styles.itemCountContainer}>
							<Pressable style={styles.iconCountContainer}>
								<Image
									source={images.minus}
									resizeMode="contain"
									style={{ width: 18, height: 18 }}
								/>
							</Pressable>

							<Text style={styles.itemCount}>2</Text>

							<Pressable style={styles.iconCountContainer}>
								<Image
									source={images.plus}
									resizeMode="contain"
									style={{ width: 18, height: 18 }}
								/>
							</Pressable>
						</View>

						<TouchableOpacity style={styles.button}>
							<Image
								source={images.bag}
								resizeMode="contain"
								style={{ width: 14, height: 14 }}
							/>
							<Text style={styles.buttonText}>
								Add to cart ($12)
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

export default MenuDetails;

const Label = ({
	label,
	icon,
}: {
	label: string;
	icon: ImageSourcePropType;
}) => (
	<View style={styles.label}>
		<Image
			source={icon}
			style={{ width: 14, height: 23 }}
			resizeMode="contain"
		/>
		<Text style={styles.labelText}>{label}</Text>
	</View>
);
