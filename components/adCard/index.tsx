import { useRouter } from "expo-router";
import React, { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

// constants
import { images } from "@/constants";
import { AdCardProps } from "@/constants/types";
import { styles } from "./styles";

const AdCard = ({
	title,
	color,
	image,
	layout,
	searchQuery,
	price,
}: AdCardProps) => {
	const router = useRouter();
	const isRight = layout.direction === "right";

	return (
		<TouchableOpacity
			onPress={() =>
				router.push(`/(tabs)/search?category=${searchQuery}`)
			}
			style={[styles.card, { backgroundColor: color }]}>
			<View
				style={[
					styles.textContainer,
					isRight ? styles.left : styles.right,
					layout.centerContent && styles.centerContent,
				]}>
				<Text
					numberOfLines={2}
					style={styles.title}>
					{title}
				</Text>

				{price !== undefined ? (
					<Text style={styles.price}>${price.toFixed(2)}</Text>
				) : (
					<Image
						source={images.arrowRight}
						resizeMode="cover"
						style={styles.arrow}
					/>
				)}
			</View>

			<View
				style={[
					styles.imageContainer,
					isRight ? styles.right : styles.left,
				]}>
				<Image
					source={image}
					resizeMode="contain"
					style={styles.image}
				/>
			</View>
		</TouchableOpacity>
	);
};

export default memo(AdCard);
