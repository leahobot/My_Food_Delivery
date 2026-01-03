import { MenuItem, MenuOptions, StateContextType } from "@/constants/types";
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
	const [menuOptions, setMenuOptions] = useState<MenuOptions>({
		toppings: [],
		sides: [],
	});

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

	const addToCart = (item: MenuItem) => {
		setCartItems((prev) => {
			const updated = [...prev, item];

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

	const toggleTopping = (name: string) => {
		setMenuOptions((prev) => {
			const exists = prev.toppings.includes(name);

			return {
				...prev,
				toppings: exists
					? prev.toppings.filter((t) => t !== name)
					: [...prev.toppings, name],
			};
		});
	};

	const toggleSide = (name: string) => {
		setMenuOptions((prev) => {
			const exists = prev.sides.includes(name);

			return {
				...prev,
				sides: exists
					? prev.sides.filter((s) => s !== name)
					: [...prev.sides, name],
			};
		});
	};

	return (
		<StateContext.Provider
			value={{
				cartItems,
				noOfCartItems: cartItems.length,
				loading,
				menuOptions,
				addToCart,
				removeFromCart,
				getMenuItemById,
				clearCart,
				toggleTopping,
				toggleSide,
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
