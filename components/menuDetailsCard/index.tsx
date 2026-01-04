import { images } from "@/constants";
import { MenuItem } from "@/constants/types";
import React, { memo, useMemo } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

const Nutrient = ({ label, value }: { label: string; value: string }) => (
	<View>
		<Text style={styles.menuCategory}>{label}</Text>
		<Text style={styles.nutrients}>{value}</Text>
	</View>
);

const MenuDetailsCard = ({ menuItem }: { menuItem: MenuItem }) => {
	const stars = useMemo(() => {
		const fullStars = Math.floor(menuItem.rating);
		const hasHalfStar = menuItem.rating - fullStars >= 0.5;

		const starArray = Array.from({ length: fullStars }, () => images.star);

		if (hasHalfStar) {
			starArray.push(images.halfStar);
		}
		return starArray;
	}, [menuItem.rating]);

	return (
		<View style={styles.menuCard}>
			{/* Text content */}
			<View style={styles.menuItem}>
				<Text style={styles.menuName}>{menuItem.name}</Text>
				<Text style={styles.menuCategory}>{menuItem.category}</Text>

				{/* Rating */}
				<View style={styles.ratingRow}>
					<View style={styles.stars}>
						{stars.map((source, index) => (
							<Image
								key={index}
								source={source}
								resizeMode="contain"
								style={styles.star}
							/>
						))}
					</View>

					<Text style={styles.rating}>
						{menuItem.rating.toFixed(1)}/5.0
					</Text>
				</View>

				{/* Price */}
				<Text style={styles.price}>
					<Text style={styles.priceSymbol}>$</Text>
					{menuItem.price.toFixed(2)}
				</Text>

				{/* Nutrition */}
				<View style={styles.nutrientsRow}>
					<Nutrient
						label="Calories"
						value={`${menuItem.calories} Cal`}
					/>
					<Nutrient
						label="Protein"
						value={`${menuItem.protein} g`}
					/>
					<Nutrient
						label="Fat"
						value={`${menuItem.fat} g`}
					/>
					<Nutrient
						label="Carbs"
						value={`${menuItem.carbs} g`}
					/>
				</View>
			</View>

			{/* Image */}
			<View style={styles.menuImage}>
				<Image
					source={
						menuItem.imageUrl
							? { uri: menuItem.imageUrl }
							: images.emptyState
					}
					resizeMode="contain"
					style={styles.menuImageContent}
				/>
			</View>
		</View>
	);
};

export default memo(MenuDetailsCard);
