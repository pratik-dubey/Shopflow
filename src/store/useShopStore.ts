import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

interface ShopState {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  cart: CartItem[];
  cartTotal: number;
  comparisonItems: Product[];
  priceRange: { min: number; max: number; current: number };
  selectedCategory: string | null;
  activeProduct: Product | null;
  sidebarOpen: boolean;
  notifications: Notification[];
  userName: string;

  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: number) => void;
  clearComparison: () => void;
  isInComparison: (productId: number) => boolean;
  setPriceFilter: (maxPrice: number) => void;
  setCategoryFilter: (category: string | null) => void;
  resetFilters: () => void;
  setActiveProduct: (product: Product | null) => void;
  toggleSidebar: () => void;
  addNotification: (message: string, type?: Notification["type"]) => void;
  removeNotification: (id: number) => void;
  setUserName: (name: string) => void;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      products: [],
      filteredProducts: [],
      isLoading: false,
      error: null,
      cart: [],
      cartTotal: 0,
      comparisonItems: [],
      priceRange: { min: 0, max: 1000, current: 1000 },
      selectedCategory: null,
      activeProduct: null,
      sidebarOpen: true,
      notifications: [],
      userName: "",

      setProducts: (products) => {
        const maxPrice = Math.ceil(Math.max(...products.map((p) => p.price), 1000));
        set({
          products,
          filteredProducts: products,
          priceRange: { min: 0, max: maxPrice, current: maxPrice },
        });
      },

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      addToCart: (product) => {
        const { cart, addNotification } = get();
        const existingItem = cart.find((item) => item.id === product.id);

        let newCart: CartItem[];
        if (existingItem) {
          newCart = cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          newCart = [...cart, { ...product, quantity: 1 }];
        }

        const cartTotal = newCart.reduce((total, item) => total + item.price * item.quantity, 0);
        set({ cart: newCart, cartTotal });
        addNotification(`Added "${product.title.slice(0, 20)}..." to cart!`, "success");
      },

      removeFromCart: (productId) => {
        const { cart } = get();
        const newCart = cart.filter((item) => item.id !== productId);
        const cartTotal = newCart.reduce((total, item) => total + item.price * item.quantity, 0);
        set({ cart: newCart, cartTotal });
      },

      updateQuantity: (productId, quantity) => {
        const { cart, removeFromCart } = get();
        if (quantity <= 0) {
          removeFromCart(productId);
          return;
        }
        const newCart = cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );
        const cartTotal = newCart.reduce((total, item) => total + item.price * item.quantity, 0);
        set({ cart: newCart, cartTotal });
      },

      clearCart: () => {
        set({ cart: [], cartTotal: 0 });
        get().addNotification("Cart cleared", "info");
      },

      addToComparison: (product) => {
        const { comparisonItems, addNotification } = get();
        if (comparisonItems.some((item) => item.id === product.id)) {
          addNotification("Already in comparison", "info");
          return;
        }
        if (comparisonItems.length >= 4) {
          addNotification("Max 4 items for comparison", "warning");
          return;
        }
        set({ comparisonItems: [...comparisonItems, product] });
        addNotification("Added to comparison", "success");
      },

      removeFromComparison: (productId) => {
        set({ comparisonItems: get().comparisonItems.filter((item) => item.id !== productId) });
      },

      clearComparison: () => set({ comparisonItems: [] }),

      isInComparison: (productId) => get().comparisonItems.some((item) => item.id === productId),

      setPriceFilter: (maxPrice) => {
        const { products, selectedCategory } = get();
        let filtered = products.filter((p) => p.price <= maxPrice);
        if (selectedCategory) {
          filtered = filtered.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
        }
        set({ priceRange: { ...get().priceRange, current: maxPrice }, filteredProducts: filtered });
      },

      setCategoryFilter: (category) => {
        const { products, priceRange } = get();
        let filtered = products.filter((p) => p.price <= priceRange.current);
        if (category) {
          filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
        }
        set({ selectedCategory: category, filteredProducts: filtered });
      },

      resetFilters: () => {
        const { products, priceRange } = get();
        set({
          priceRange: { ...priceRange, current: priceRange.max },
          selectedCategory: null,
          filteredProducts: products,
        });
      },

      setActiveProduct: (product) => set({ activeProduct: product }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      addNotification: (message, type = "info") => {
        const id = Date.now();
        set((state) => ({ notifications: [...state.notifications, { id, message, type }] }));
        setTimeout(() => {
          set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) }));
        }, 3000);
      },

      removeNotification: (id) => {
        set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) }));
      },

      setUserName: (name) => set({ userName: name }),
    }),
    {
      name: "shopflow-storage",
      partialize: (state) => ({ cart: state.cart, cartTotal: state.cartTotal, userName: state.userName }),
    }
  )
);