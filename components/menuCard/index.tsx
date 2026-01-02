import React, { useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

// components & hooks
import { useCartContext } from "@/context/cartProvider";

// constants
import { images } from "@/constants";
import { MenuItem } from "@/constants/types";

const MenuCard = ({ item }: { item: MenuItem }) => {
	const { addToCart } = useCartContext();
	const [isItemAdded, setIsItemAdded] = useState(false);

	const handleAddToCart = async () => {
		setIsItemAdded(true);

		addToCart(item);
		setTimeout(() => {
			setIsItemAdded(false);
		}, 2000);
	};

	return (
		<TouchableOpacity style={styles.card}>
			<View style={styles.imageContainer}>
				<Image
					source={
						item.imageUrl
							? { uri: item.imageUrl }
							: images.emptyState
					}
					resizeMode="contain"
					style={styles.image}
				/>
			</View>

			<View style={styles.textContainer}>
				<Text
					numberOfLines={2}
					style={styles.titleText}>
					{item.name}
				</Text>
				<Text style={styles.priceText}>
					From {item.currency} ${item.price?.toFixed(2)}
				</Text>

				{isItemAdded ? (
					<Text style={styles.itemAddedText}>Item Added!</Text>
				) : (
					<Pressable
						style={styles.addToCart}
						onPress={handleAddToCart}>
						<Image
							source={images.plus}
							resizeMode="contain"
							style={{ width: 18, height: 18 }}
						/>

						<Text style={styles.buttonText}>Add to cart</Text>
					</Pressable>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default MenuCard;
