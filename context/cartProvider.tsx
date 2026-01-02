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

type CartContextType = {
	cartItems: MenuItem[];
	noOfCartItems: number;
	addToCart: (item: MenuItem) => void;
	removeFromCart: (itemId: string) => void;
	clearCart: () => void;
	loading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cartItems, setCartItems] = useState<MenuItem[]>([]);
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
