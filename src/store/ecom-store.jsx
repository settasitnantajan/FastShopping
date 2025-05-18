import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import _, { constant, update } from "lodash";
import { dateFormat } from "../utils/dateFormat";
import { createAllProduct } from "../api/Product";

const ecomStore = (set, get) => ({
  initialFilters: { // Define initial/default filters
    text: '',
    categories: [],
    price: [0, 35000],
  },
  user: [
    {
          email: "settasit.nantajan@gmail.com" // Removed comma as it's the only property in this object
        } // Close the object
      ], // Close the array and add a comma for the next property
      userStatus: false, // This is now correctly a top-level property
    userName: "",
    login: [],
    category: [],
    allProducts: [], // Store all products unfiltered
    products: [],
    currentFilters: {
      text: '',
      categories: [],
      price: [0, 35000], // Default price range
    },
    order: [],
    carts: [],
    modal: [],
    userAddress: null, // To store the user's shipping address


  logout: () => {
      set({
          // user: [],
          userStatus: false,
          userName: "",
          login: [],
          category: [],
          allProducts: [],
          products: [],
          currentFilters: get().initialFilters, // Reset to initial filters
          order: [],
          carts: [],
          userAddress: null,
    });
  },


  
  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];
    const uniqe = _.unionWith(updateCart, _.isEqual);
    set({ carts: uniqe });
  },

  saveUserAddress: (addressDetails) => {
    set({ userAddress: addressDetails });
  },




  actionCreateModal: (item) => {
    set({ modal: item });
    const data = get().modal;
    console.log("modal", data);
  },



  actionUpdateQuantity: (productID, newQuantity) => {
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productID
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },



  actionRemoveProduct: (productID) => {
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productID),
    }));
  },



  getTotalPrice: () => {
    return get()
      .carts.reduce((total, item) => {
        return total + item.price * item.count;
      }, 0)
      .toFixed(2);
  },



  actionLogin: (item) => {
    // const userLogin = get().login; // ไม่จำเป็นต้องใช้ตัวแปรนี้สำหรับการเปรียบเทียบอีกต่อไป
    const userLocalStorage = get().user;
     set({ userStatus: true });
     set({ login: item }); // เก็บข้อมูลการล็อกอินปัจจุบันลง store
    // เปรียบเทียบกับ `item` ที่รับเข้ามาในฟังก์ชัน actionLogin โดยตรง
    const getTrue = userLocalStorage.some(
      (storedUser) => // storedUser คือ user แต่ละคนใน userLocalStorage
        storedUser.email === item.email && storedUser.password === item.password
    );

    if (getTrue) {
      set({ userName: [item] });
      return true;
    } else {
      return false;
    }
  },



  actionRegister: async (data) => {
    const user =  await get().user;
    const updateUser = [...user, { ...data }];
    await set({ user: updateUser });
  },



  getCategory: async () => {
    try {
      const res = await createAllProduct();
      set({
        category: [
          ...new Set(res.data.products.map(({ category }) => category)),
        ],
      });
    } catch (error) {
      console.log(error);
    }
  },



  getProduct: async () => {
    try {
      const res = await createAllProduct();
      set({
        allProducts: res.data.products,
        // products: res.data.products, // Will be set by applyAllFilters
        // Optionally reset filters here if desired, or let them persist
        // currentFilters: { text: '', categories: [], price: get().currentFilters.price || [0, 35000] }
      });
      get().applyAllFilters(); // Apply current (possibly persisted) filters
    } catch (error) {
      console.log(error)
    }
  },

  setFilter: (filterType, value) => {
    set((state) => ({
      currentFilters: {
        ...state.currentFilters,
        [filterType]: value,
      },
    }));
    get().applyAllFilters();
  },

  clearAllFilters: () => {
    set((state) => ({
      currentFilters: state.initialFilters, // Reset to default
    }));
    get().applyAllFilters(); // Re-apply filters which will now be the defaults
  },


  applyAllFilters: () => {
    const { allProducts, currentFilters } = get();
    let filtered = [...allProducts];

    // Apply text filter
    if (currentFilters.text) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(currentFilters.text.toLowerCase())
      );
    }

    // Apply category filter
    if (currentFilters.categories && currentFilters.categories.length > 0) {
      filtered = filtered.filter((item) =>
        currentFilters.categories.includes(item.category)
      );
    }

    // Apply price filter
    if (currentFilters.price) {
      filtered = filtered.filter(
        (item) =>
          item.price >= currentFilters.price[0] && item.price <= currentFilters.price[1]
      );
    }

    set({ products: filtered });
  },

  // Old actionSearchFilter, actionSearchCategory, actionSearchPrice are replaced by setFilter and applyAllFilters



  clearCart: async (Order) => {
    const orders = get().order;
    const userName = get().userName;
    const carts = get().carts;
    const shippingAddress = get().userAddress; // Get the saved address
    const createUserName = userName[0].email;
    const createTime = new Date().toISOString(); // Store as ISO string
    const createOrderId = Math.random().toString(36).slice(2);
    const totalPrice = await carts
      .reduce((num, item) => num + item.price * item.count, 0)
      .toFixed(2);

    const updateOrder = [
      ...orders,
      {
        ...Order,
        orderCreateTime: createTime,
        orderID: createOrderId,
        userName: createUserName,
        totalPrice: totalPrice,
        shippingAddress: shippingAddress ? shippingAddress.address : "N/A", // Add shipping address to the order
      },
    ];

    const uniqe = _.unionWith(updateOrder, _.isEqual);
    await set({ order: uniqe });

    await set({ carts: [] });
  },
});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
