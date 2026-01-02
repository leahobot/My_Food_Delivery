import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
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
import { useFetch } from "@/hooks/useFetch";

// constants
import { CATEGORIES, images } from "@/constants";
import { MenuItem } from "@/constants/types";
import { baseStyles } from "@/theme/baseStyles";

const Search = () => {
	const router = useRouter();
	const { data: menuItems, loading, error } = useFetch(getMenuItems);

	const [searchValue, setSearchValue] = useState("");
	const [activeCategory, setActiveCategory] = useState({
		id: "1",
		name: "All",
	});

	// -------------------------
	// Memoized filtered results
	// -------------------------
	const filteredMenuItems = useMemo(() => {
		if (!menuItems) return [];

		return menuItems.filter((item: MenuItem) => {
			const matchesCategory =
				activeCategory.name.toLowerCase() === "all" ||
				item.category.toLowerCase() ===
					activeCategory.name.toLowerCase();

			const matchesSearch = item.name
				.toLowerCase()
				.includes(searchValue.toLowerCase());

			return matchesCategory && matchesSearch;
		});
	}, [menuItems, searchValue, activeCategory]);

	// -------------------------
	// Loading & error states
	// -------------------------
	if (loading && !menuItems?.length) {
		return (
			<SafeAreaView style={baseStyles.homeTab}>
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
			<SafeAreaView style={baseStyles.homeTab}>
				<Text style={baseStyles.errorText}>
					Something went wrong. Try again later.
				</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={baseStyles.homeTab}>
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
					<View style={baseStyles.badge}>
						<Text style={baseStyles.badgeText}>2</Text>
					</View>
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
					keyExtractor={(item) => item.id.toString()}
					showsHorizontalScrollIndicator={false}
					horizontal
					renderItem={({ item }) => {
						const isActive = item.id === activeCategory?.id;

						return (
							<TouchableOpacity
								style={[
									baseStyles.category,
									isActive && baseStyles.categoryIsActive,
								]}
								onPress={() => setActiveCategory(item)}>
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
			<FlatList
				data={filteredMenuItems}
				keyExtractor={(item: MenuItem) => item.$id.toString()}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={() => (
					<View style={baseStyles.emptyState}>
						<Image
							source={images.emptyState}
							resizeMode="cover"
							style={baseStyles.emptyStateImage}
							width={172}
							height={128}
						/>
						<Text style={baseStyles.emptyStateTitle}>
							Nothing matched your search
						</Text>
						<Text style={baseStyles.emptyStateText}>
							Try a different search term or check for typos.
						</Text>
					</View>
				)}
				renderItem={({ item }: { item: MenuItem }) => (
					<MenuCard item={item} />
				)}
			/>
		</SafeAreaView>
	);
};

export default Search;
