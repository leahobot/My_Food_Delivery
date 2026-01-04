import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

// components & hooks
import { useStateContext } from "@/context/StateProvider";

// constants
import { images } from "@/constants";
import { MenuItem } from "@/constants/types";
import { useRouter } from "expo-router";

const MenuCard = ({ item, index }: { item: MenuItem; index: number }) => {
	const router = useRouter();
	const { addToCart, cartItems } = useStateContext();

	const isFirstItem = index % 2 === 0;
	const [isItemAdded, setIsItemAdded] = useState(false);
	const cartItem =
		cartItems.find((cartItem) => cartItem.$id === item.$id?.toString()) ||
		item;

	const handleAddToCart = async () => {
		if (isItemAdded) return;

		setIsItemAdded(true);
		addToCart({
			...item,
			quantity: 1,
			amount: cartItem.amount ? 0 : item.price,
		});
	};

	useEffect(() => {
		if (!isItemAdded) return;

		const timer = setTimeout(() => {
			setIsItemAdded(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, [isItemAdded]);

	return (
		<TouchableOpacity
			style={[styles.card, isFirstItem && { marginTop: -60 }]}
			onPress={() =>
				router.push({
					pathname: "/menuDetails/[id]",
					params: { id: item.$id?.toString() },
				})
			}>
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
		</TouchableOpacity>
	);
};

export default MenuCard;
