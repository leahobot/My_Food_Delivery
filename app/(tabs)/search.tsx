import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//components
import MenuCard from "@/components/menuCard";

// api & hooks
import { getMenuItems } from "@/api/appwrite";
import { useStateContext } from "@/context/StateProvider";
import { useFetch } from "@/hooks/useFetch";

// constants
import { CATEGORIES, images } from "@/constants";
import { MenuItem } from "@/constants/types";
import { baseStyles } from "@/theme/baseStyles";

const Search = () => {
	const router = useRouter();
	const { category } = useLocalSearchParams<{ category: string }>();

	const { data: menuItems, loading, error, refetch } = useFetch(getMenuItems);
	const { noOfCartItems } = useStateContext();

	const [activeCategory, setActiveCategory] = useState<string>("all");
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		if (category) {
			setActiveCategory(category);
		}
	}, [category]);

	// -------------------------
	// Memoized filtered results
	// -------------------------
	const filteredMenuItems = useMemo(() => {
		if (!menuItems) return [];

		const search = searchValue.toLowerCase();

		return menuItems.filter((item: MenuItem) => {
			const matchesCategory =
				activeCategory === "all" ||
				item.category.toLowerCase() === activeCategory;

			const matchesSearch = item.name.toLowerCase().includes(search);

			return matchesCategory && matchesSearch;
		});
	}, [menuItems, searchValue, activeCategory]);

	// -------------------------
	// Loading & error states
	// -------------------------
	if (loading) {
		return (
			<SafeAreaView style={baseStyles.searchTab}>
				<ActivityIndicator
					size="large"
					color="#FF7622"
					style={baseStyles.loader}
				/>
			</SafeAreaView>
		);
	}

	if (error) {
		return (
			<SafeAreaView style={baseStyles.searchTab}>
				<Image
					source={images.error}
					resizeMode="cover"
					height={50}
					width={50}
				/>
				<Text style={baseStyles.errorText}>
					Something went wrong. Try again later.
				</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={baseStyles.searchTab}>
			{/* Header */}
			<View style={baseStyles.homeHeader}>
				<View>
					<Text style={baseStyles.user}>SEARCH</Text>
					<View style={baseStyles.userHeader}>
						<Text style={baseStyles.userName}>
							Find your favorite food
						</Text>
					</View>
				</View>

				<TouchableOpacity
					style={baseStyles.cart}
					onPress={() => router.push("/(tabs)/cart")}>
					<Image
						source={images.bag}
						style={baseStyles.bag}
					/>
					{noOfCartItems !== undefined && noOfCartItems > 0 && (
						<View style={baseStyles.badge}>
							<Text style={baseStyles.badgeText}>
								{noOfCartItems}
							</Text>
						</View>
					)}
				</TouchableOpacity>
			</View>

			{/* Search Input */}
			<View style={baseStyles.inputContainer}>
				<TextInput
					style={baseStyles.input}
					onChangeText={(text) => setSearchValue(text)}
					value={searchValue}
					placeholder="Search for any food"
					maxLength={100}
					inputMode="text"
				/>

				<Image
					source={images.search}
					style={baseStyles.searchIcon}
					tintColor={"#000000"}
					height={20}
					width={20}
				/>
			</View>

			{/* Categories */}
			<View style={baseStyles.categories}>
				<FlatList
					data={CATEGORIES}
					keyExtractor={(item) => item.id}
					showsHorizontalScrollIndicator={false}
					horizontal
					renderItem={({ item }) => {
						const normalizedName = item.name.toLowerCase();
						const isActive = normalizedName === activeCategory;

						return (
							<TouchableOpacity
								style={[
									baseStyles.category,
									isActive && baseStyles.categoryIsActive,
								]}
								onPress={() =>
									setActiveCategory(normalizedName)
								}
								activeOpacity={0.8}>
								<Text
									style={[
										baseStyles.categoryText,
										isActive &&
											baseStyles.categoryTextActive,
									]}>
									{item.name}
								</Text>
							</TouchableOpacity>
						);
					}}
				/>
			</View>

			{/* Results */}
			<View>
				<FlatList
					data={filteredMenuItems}
					keyExtractor={(item: MenuItem) => item.$id.toString()}
					showsVerticalScrollIndicator={false}
					numColumns={2}
					refreshing={loading}
					onRefresh={refetch}
					columnWrapperStyle={baseStyles.searchResults}
					ListEmptyComponent={
						!loading ? (
							<View style={baseStyles.emptyState}>
								<Image
									source={images.emptyState}
									resizeMode="cover"
									style={baseStyles.emptyStateImage}
								/>
								<Text style={baseStyles.emptyStateTitle}>
									Nothing matched your search
								</Text>
								<Text style={baseStyles.emptyStateText}>
									Try a different search term or check for
									typos.
								</Text>
							</View>
						) : null
					}
					renderItem={({
						item,
						index,
					}: {
						item: MenuItem;
						index: number;
					}) => (
						<MenuCard
							item={item}
							index={index}
						/>
					)}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Search;
