import { useStateContext } from "@/context/StateProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
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
import { MenuOptions, Option } from "@/constants/types";
import { styles } from "./styles";

// components
import Allergens from "@/components/allergens";
import MenuDetailsCard from "@/components/menuDetailsCard";
import OptionsCard from "@/components/optionsCard";

const MenuDetails = () => {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id: string }>();
	const { getMenuItemById, addToCart } = useStateContext();

	const menuItem = getMenuItemById(id);

	const initialOrderAmount = menuItem?.price || 0;
	const [menuOptions, setMenuOptions] = useState<MenuOptions>({
		toppings: [],
		sides: [],
	});
	const [menuTotals, setMenuTotals] = useState({
		quantity: 1,
		amount: initialOrderAmount,
	});

	const handleQuantity = (action: "increment" | "decrement") => {
		setMenuTotals((prev) => {
			const nextQuantity =
				action === "increment"
					? Math.min(prev.quantity + 1, 100)
					: Math.max(prev.quantity - 1, 1);

			return {
				...prev,
				quantity: nextQuantity,
			};
		});
	};

	const updateAmount = (delta: number) => {
		setMenuTotals((prev) => ({
			...prev,
			amount: Math.max(prev.amount + delta, initialOrderAmount),
		}));
	};

	const handleAdditions = (type: keyof MenuOptions, value: Option) => {
		setMenuOptions((prev) => {
			const exists = prev[type].some((i) => i.name === value.name);
			updateAmount(exists ? -value.amount : value.amount);

			return {
				...prev,
				[type]: exists
					? prev[type].filter((i) => i.name !== value.name)
					: [...prev[type], value],
			};
		});
	};

	const handleAddToCart = () => {
		if (menuItem) {
			const { toppings, sides } = menuOptions;

			const newMenuItem = {
				...menuItem,
				quantity: menuTotals.quantity,
				amount: menuTotals.amount,
				toppings,
				sides,
			};

			addToCart(newMenuItem);
			router.push("/(tabs)/cart");
		}
	};
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
			{!id || !menuItem ? (
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
						removeClippedSubviews
						initialNumToRender={5}
						windowSize={3}
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.listContainer}
						keyExtractor={(item) => item.name}
						renderItem={({ item }) => {
							const isToppingAdded = menuOptions.toppings.some(
								(topping) =>
									topping.name === item.name?.toLowerCase()
							);

							return (
								<OptionsCard
									{...item}
									isAdded={isToppingAdded}
									onPress={(item) =>
										handleAdditions("toppings", item)
									}
								/>
							);
						}}
					/>

					{/* Sides */}
					<Text style={styles.listHeader}>SideOptions</Text>
					<FlatList
						data={sides}
						horizontal
						removeClippedSubviews
						initialNumToRender={5}
						windowSize={3}
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.listContainer}
						keyExtractor={(item) => item.name}
						renderItem={({ item }) => {
							const isSideAdded = menuOptions.sides.some(
								(side) => side.name === item.name?.toLowerCase()
							);

							return (
								<OptionsCard
									{...item}
									isAdded={isSideAdded}
									onPress={(item) =>
										handleAdditions("sides", item)
									}
								/>
							);
						}}
					/>

					<View style={styles.addButton}>
						<View style={styles.itemCountContainer}>
							<Pressable
								style={styles.iconCountContainer}
								onPress={() => handleQuantity("decrement")}>
								<Image
									source={images.minus}
									resizeMode="contain"
									style={{ width: 18, height: 18 }}
								/>
							</Pressable>

							<Text style={styles.itemCount}>
								{menuTotals.quantity}
							</Text>

							<Pressable
								style={styles.iconCountContainer}
								onPress={() => handleQuantity("increment")}>
								<Image
									source={images.plus}
									resizeMode="contain"
									style={{ width: 18, height: 18 }}
								/>
							</Pressable>
						</View>

						<TouchableOpacity
							style={styles.button}
							onPress={handleAddToCart}>
							<Image
								source={images.bag}
								resizeMode="contain"
								style={{ width: 14, height: 14 }}
							/>
							<Text style={styles.buttonText}>
								Add to cart ($
								{(
									menuTotals.amount * menuTotals.quantity
								)?.toFixed(2)}
								)
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
