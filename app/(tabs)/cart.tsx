import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// constants
import { images } from "@/constants";
import { baseStyles } from "@/theme/baseStyles";

// hook & components
import CartItem from "@/components/cartItem";
import PaymentSummary from "@/components/paymentSummary";
import { useStateContext } from "@/context/StateProvider";

const Cart = () => {
	const router = useRouter();
	const { cartItems } = useStateContext();

	return (
		<SafeAreaView style={baseStyles.profileTab}>
			{/* Header */}
			<View style={baseStyles.profileHeader}>
				<Pressable
					hitSlop={10}
					onPress={() => router.back()}>
					<Image
						source={images.arrowBack}
						style={baseStyles.profileIcon}
					/>
				</Pressable>

				<Pressable
					hitSlop={10}
					onPress={() => router.push("/(tabs)/search")}>
					<Image
						source={images.search}
						style={baseStyles.profileIcon}
					/>
				</Pressable>
			</View>

			<View style={baseStyles.cartHeader}>
				<View>
					<Text style={baseStyles.user}>DELIVERY LOCATION</Text>
					<Text style={baseStyles.userName}>Home</Text>
				</View>

				<Pressable style={baseStyles.changeLocation}>
					<Text style={baseStyles.locationText}>Change Location</Text>
				</Pressable>
			</View>

			{/* CartItems */}
			<FlatList
				data={cartItems}
				keyExtractor={(item) => item.$id?.toString()}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={baseStyles.cartItemsContainer}
				renderItem={({ item }) => <CartItem cartItem={item} />}
				ListFooterComponent={
					cartItems?.length > 0 ? <PaymentSummary /> : null
				}
				ListEmptyComponent={
					<View style={baseStyles.emptyCart}>
						<Image
							source={images.emptyState}
							resizeMode="cover"
							style={{ width: 200, height: 160 }}
						/>
						<Text style={baseStyles.emptyCartText}>
							Your cart is empty
						</Text>

						<Pressable
							style={baseStyles.startShopping}
							onPress={() => router.push("/(tabs)/search")}>
							<Text style={baseStyles.startShoppingText}>
								Start Shopping
							</Text>
						</Pressable>
					</View>
				}
			/>
		</SafeAreaView>
	);
};

export default Cart;
