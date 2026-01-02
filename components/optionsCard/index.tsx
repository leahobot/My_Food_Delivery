import { images } from "@/constants";
import React from "react";
import {
	Image,
	ImageSourcePropType,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { styles } from "./styles";

const OptionsCard = ({
	name,
	price,
	image,
}: {
	name: string;
	price: number;
	image: ImageSourcePropType;
}) => {
	return (
		<TouchableOpacity style={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					source={image}
					resizeMode="cover"
					style={{
						height: 55,
						width: 60,
					}}
				/>
			</View>

			<Text style={styles.price}>${price.toFixed(2)}</Text>

			<View style={styles.textContainer}>
				<Text
					style={styles.name}
					numberOfLines={2}>
					{name}
				</Text>

				<View style={styles.icon}>
					<Image
						source={images.plus}
						resizeMode="contain"
						tintColor={"#FFFFFF"}
						style={{ height: 8.75, width: 8.75 }}
					/>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default OptionsCard;
