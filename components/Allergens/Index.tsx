import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

const Allergens = ({ allergens }: { allergens: string[] }) => {
	return (
		<View style={styles.container}>
			{allergens.map((allergen, index) => (
				<View
					key={index}
					style={styles.labelContainer}>
					<Text style={styles.label}>{allergen}</Text>
				</View>
			))}
		</View>
	);
};

export default Allergens;
