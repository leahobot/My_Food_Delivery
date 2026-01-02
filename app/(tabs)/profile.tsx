import React from "react";
import {
	FlatList,
	Image,
	Pressable,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// constants
import { images, userProfile } from "@/constants";
import { baseStyles } from "@/theme/baseStyles";
import { useRouter } from "expo-router";

const Profile = () => {
	const router = useRouter();

	return (
		<SafeAreaView style={baseStyles.profileTab}>
			<View style={baseStyles.profileHeader}>
				<Pressable
					hitSlop={10}
					onPress={() => router.back()}>
					<Image
						source={images.arrowBack}
						style={baseStyles.profileIcon}
					/>
				</Pressable>
				<Text style={baseStyles.profileHeaderText}>Profile</Text>
				<Pressable
					hitSlop={10}
					onPress={() => router.push("/(tabs)/search")}>
					<Image
						source={images.search}
						style={baseStyles.profileIcon}
					/>
				</Pressable>
			</View>

			<FlatList
				data={userProfile}
				keyExtractor={(_, index) => index.toString()}
				showsVerticalScrollIndicator={false}
				renderItem={({ item, index }) => (
					<View
						style={[
							baseStyles.profileItem,
							index === 0 && baseStyles.profileItemFirst,
							index === userProfile.length - 1 &&
								baseStyles.profileItemLast,
						]}>
						<View style={baseStyles.profileIconWrapper}>
							<Image
								source={item.icon}
								style={baseStyles.profileIcon}
							/>
						</View>

						<View>
							<Text style={baseStyles.profileLabel}>
								{item.title}
							</Text>
							<Text style={baseStyles.profileValue}>
								{item.value}
							</Text>
						</View>
					</View>
				)}
				ListHeaderComponent={
					<View style={baseStyles.profileAvatarContainer}>
						<Image
							source={images.avatar}
							resizeMode="cover"
							style={baseStyles.profileAvatar}
						/>
					</View>
				}
				ListFooterComponent={
					<View style={baseStyles.profileButtons}>
						<TouchableOpacity style={baseStyles.profileEditButton}>
							<Text style={baseStyles.profileEditText}>
								Edit Profile
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={baseStyles.profileLogoutButton}>
							<Image
								source={images.logout}
								style={baseStyles.logoutIcon}
								resizeMode="cover"
							/>
							<Text style={baseStyles.profileLogoutText}>
								Logout
							</Text>
						</TouchableOpacity>
					</View>
				}
			/>
		</SafeAreaView>
	);
};

export default Profile;
