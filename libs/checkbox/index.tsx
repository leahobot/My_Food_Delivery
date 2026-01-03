import React from "react";
import { Image, Pressable } from "react-native";

// constants
import { images } from "@/constants";
import { styles } from "./styles";

type CheckboxProps = {
	checked: boolean;
	onToggle: () => void;
	size?: number;
	disabled?: boolean;
};

const Checkbox = ({
	checked,
	onToggle,
	size = 20,
	disabled = false,
}: CheckboxProps) => {
	return (
		<Pressable
			onPress={onToggle}
			disabled={disabled}
			hitSlop={8}
			style={[
				styles.container,
				{
					width: size,
					height: size,
					borderColor: checked ? "#FE8C00" : "#BDBDBD",
					backgroundColor: checked ? "#FE8C00" : "#FFFFFF",
					opacity: disabled ? 0.5 : 1,
				},
			]}>
			{checked && (
				<Image
					source={images.check}
					resizeMode="contain"
					tintColor={"#FFFFFF"}
					style={{ width: 12, height: 15 }}
				/>
			)}
		</Pressable>
	);
};

export default Checkbox;
