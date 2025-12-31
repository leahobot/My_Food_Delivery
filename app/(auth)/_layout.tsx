import { images } from "@/constants";
import { Slot } from "expo-router";
import {
	Dimensions,
	Image,
	ImageBackground,
	ScrollView,
	Text,
	View,
} from "react-native";
import { styles } from "./styles";

export default function AuthLayout() {
	return (
		// <KeyboardAvoidingView
		// 	behavior={Platform.OS === "ios" ? "padding" : "height"}>
		<ScrollView
			contentContainerStyle={styles.main}
			keyboardShouldPersistTaps="handled"
			showsVerticalScrollIndicator={false}>
			<View style={{ height: Dimensions.get("screen").height / 2.25 }}>
				<ImageBackground
					source={images.loginGraphic}
					style={{ width: "100%", height: 50 }}
					resizeMode="stretch"
				/>
				<Image
					source={images.logo}
					style={{ width: "100%", height: 50 }}
				/>
			</View>
			<Text>Hello World</Text>

			<Slot />
		</ScrollView>
		// 	</KeyboardAvoidingView>
	);
}
