import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

// constants
import { images } from "@/constants";
import { MenuItem } from "@/constants/types";
import { styles } from "./styles";

// hooks & components
import { useStateContext } from "@/context/StateProvider";
import Checkbox from "@/libs/checkbox";

const CartItem = ({ cartItem }: { cartItem: MenuItem }) => {
	const { updateCart, removeFromCart } = useStateContext();

	const [checked, setChecked] = useState(false);

	const handleQuantity = (action: "increment" | "decrement") => {
		const quantity = cartItem.quantity || 1;

		const newQuantity =
			action === "increment"
				? Math.min(quantity + 1, 100)
				: Math.max(quantity - 1, 1);

		updateCart({
			...cartItem,
			quantity: newQuantity,
		});
	};

	return (
		<View style={styles.container}>
			<Checkbox
				checked={checked}
				onToggle={() => setChecked((prev) => !prev)}
			/>

			<View style={styles.imageContainer}>
				<Image
					source={
						cartItem.imageUrl
							? { uri: cartItem.imageUrl }
							: images.emptyState
					}
					style={{ width: "100%", height: "100%" }}
					resizeMode="cover"
				/>
			</View>

			<View style={styles.textContainer}>
				<Text style={styles.name}>{cartItem.name}</Text>
				<Text style={styles.price}>
					${cartItem?.totalAmount?.toFixed(2) || 0}
				</Text>

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
						{cartItem?.quantity || 1}
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
			</View>

			{checked && (
				<Pressable
					style={styles.trash}
					onPress={() => removeFromCart(cartItem?.$id?.toString())}>
					<Image
						source={images.trash}
						resizeMode="contain"
						style={{ width: 20, height: 20 }}
					/>
				</Pressable>
			)}
		</View>
	);
};

export default CartItem;
