import { MenuItem } from "@/constants/types";
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

type CartContextType = {
	cartItems: MenuItem[];
	noOfCartItems: number;
	addToCart: (item: MenuItem) => void;
	removeFromCart: (itemId: string) => void;
	getMenuItemById: (itemId: string) => MenuItem | undefined;
	clearCart: () => void;
	loading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
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

	return (
		<CartContext.Provider
			value={{
				cartItems,
				noOfCartItems: cartItems.length,
				addToCart,
				removeFromCart,
				getMenuItemById,
				clearCart,
				loading,
			}}>
			{children}
		</CartContext.Provider>
	);
};

export const useCartContext = () => {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}

	return context;
};
