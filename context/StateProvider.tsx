import { MenuItem, Option, StateContextType } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

const CART_KEY = "CART_ITEMS";
const MENU_ITEMS_CACHE_KEY = "MENU_ITEMS_CACHE";

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
	const [cartItems, setCartItems] = useState<MenuItem[]>([]);
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
	const [loading, setLoading] = useState(true);

	// Load cart from AsyncStorage once
	const loadCart = useCallback(async () => {
		try {
			const stored = await AsyncStorage.getItem(CART_KEY);
			const parsed = stored ? JSON.parse(stored) : [];
			setCartItems(parsed);
		} catch (error) {
			console.error("Failed to load cart", error);
			setCartItems([]);
		} finally {
			setLoading(false);
		}
	}, []);

	const loadMenuItems = useCallback(async () => {
		const stored = await AsyncStorage.getItem(MENU_ITEMS_CACHE_KEY);
		const parsed = stored ? JSON.parse(stored) : [];

		setMenuItems(parsed);
	}, []);

	useEffect(() => {
		loadMenuItems();
	}, [loadMenuItems]);

	useEffect(() => {
		loadCart();
	}, [loadCart]);

	// Persist cart whenever it changes
	const persistCart = async (items: MenuItem[]) => {
		try {
			await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
		} catch (error) {
			console.error("Failed to save cart", error);
		}
	};

	const mergeOptions = (a: Option[] = [], b: Option[] = []) => {
		const map = new Map<string, Option>();

		[...a, ...b].forEach((item) => {
			map.set(item.name, item);
		});

		return Array.from(map.values());
	};

	const updateCart = (item: MenuItem) => {
		setCartItems((prev) => {
			const existingIndex = prev.findIndex(
				(cartItem) => cartItem.$id === item.$id
			);

			const updated = prev.map((cartItem, index) => {
				if (index !== existingIndex) return cartItem;

				const quantity = item.quantity ?? 1;
				const amount = item.amount ?? 0;

				return {
					...cartItem,
					quantity,
					amount,
					totalAmount: amount * quantity,
				};
			});

			persistCart(updated);
			return updated;
		});
	};

	const addToCart = (item: MenuItem) => {
		setCartItems((prev) => {
			const existingIndex = prev.findIndex(
				(cartItem) => cartItem.$id === item.$id
			);

			let updated: MenuItem[];

			if (existingIndex === -1) {
				// Item does not exist → add fresh
				const totalAmount =
					(item.amount ?? item.price) * (item.quantity ?? 1);
				const newItem = {
					...item,
					totalAmount,
				};

				updated = [...prev, newItem];
			} else {
				// Item exists → merge
				updated = prev.map((cartItem, index) => {
					if (index !== existingIndex) return cartItem;

					const mergedToppings = mergeOptions(
						cartItem.toppings,
						item.toppings
					);

					const mergedSides = mergeOptions(
						cartItem.sides,
						item.sides
					);

					const quantity =
						(cartItem.quantity ?? 1) + (item.quantity ?? 1);

					const higherAmount = Math.max(
						cartItem.amount ?? 1,
						item.amount ?? 1
					);

					return {
						...cartItem,
						toppings: mergedToppings,
						sides: mergedSides,
						quantity,
						higherAmount,
						totalAmount: higherAmount * quantity,
					};
				});
			}

			persistCart(updated);
			return updated;
		});
	};

	const removeFromCart = (itemId: string) => {
		setCartItems((prev) => {
			const updated = prev.filter(
				(item: MenuItem) => item.$id.toString() !== itemId
			);

			persistCart(updated);
			return updated;
		});
	};

	const getMenuItemById = (id: string) => {
		if (!id) return undefined;

		return menuItems.find((item) => item.$id?.toString() === id);
	};

	const clearCart = () => {
		setCartItems([]);

		AsyncStorage.removeItem(CART_KEY);
	};

	return (
		<StateContext.Provider
			value={{
				cartItems,
				noOfCartItems: cartItems.length,
				loading,
				addToCart,
				removeFromCart,
				updateCart,
				getMenuItemById,
				clearCart,
			}}>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => {
	const context = useContext(StateContext);

	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}

	return context;
};
