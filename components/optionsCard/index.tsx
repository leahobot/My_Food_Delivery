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

type OptionsCardProps = {
	name: string;
	price: number;
	image: ImageSourcePropType;
	isAdded: boolean;
	onPress: (name: string) => void;
};

const OptionsCard = ({
	name,
	price,
	image,
	isAdded,
	onPress,
}: OptionsCardProps) => {
	const handlePress = () => {
		const formattedName = name?.toLowerCase();
		onPress(formattedName);
	};

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={handlePress}>
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
					{isAdded ? "Added !" : name}
				</Text>

				<View
					style={[
						styles.icon,
						isAdded
							? { backgroundColor: "#107606ff" }
							: { backgroundColor: "#EF2A39" },
					]}>
					<Image
						source={isAdded ? images.check : images.plus}
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
