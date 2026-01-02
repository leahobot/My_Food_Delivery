import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// components
import TabIcon from "@/components/tabIcon";
import { useCartContext } from "@/context/cartProvider";

// constants
import { images } from "@/constants";
import { baseStyles } from "../../theme/baseStyles";

export default function TabLayout() {
	const insets = useSafeAreaInsets();
	const { noOfCartItems } = useCartContext();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: [
					baseStyles.rootTab,
					{
						marginBottom: insets.bottom + 10,
					},
				],
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ focused }) => (
						<TabIcon
							title="Home"
							icon={images.home}
							focused={focused}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					tabBarIcon: ({ focused }) => (
						<TabIcon
							title="Search"
							icon={images.search}
							focused={focused}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="cart"
				options={{
					title: "Cart",
					tabBarIcon: ({ focused }) => (
						<TabIcon
							title="Cart"
							icon={images.bag}
							focused={focused}
							cartItems={noOfCartItems}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ focused }) => (
						<TabIcon
							title="Profile"
							icon={images.person}
							focused={focused}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
