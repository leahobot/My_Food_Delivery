import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

// constants
import { styles } from "./styles";

// hooks & components
import { useStateContext } from "@/context/StateProvider";

const ListItem = ({ label, value }: { label: string; value: string }) => {
	return (
		<View style={styles.listItem}>
			<Text style={styles.label}>{label}</Text>
			<Text style={styles.value}>{value}</Text>
		</View>
	);
};

const PaymentSummary = () => {
	const { cartItems, noOfCartItems } = useStateContext();

	return (
		<View style={styles.main}>
			<View style={styles.container}>
				<Text style={styles.title}>PaymentSummary</Text>

				<View style={styles.list}>
					<ListItem
						label={`Total Items (${noOfCartItems})`}
						value={`$100`}
					/>
					<ListItem
						label="Delivery Fee"
						value="Free"
					/>
					<ListItem
						label="Discount"
						value="0"
					/>
				</View>
			</View>

			<TouchableOpacity
				style={styles.button}
				onPress={() => {}}>
				<Text style={styles.buttonText}>Order Now</Text>
			</TouchableOpacity>
		</View>
	);
};

export default PaymentSummary;
