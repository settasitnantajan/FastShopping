import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import _, { constant, update } from "lodash";
import { dateFormat } from "../utils/dateFormat";
import { createAllProduct } from "../api/Product";

const ecomStore = (set, get) => ({
  user: [
    {
      email: "settasit.nantajan@gmail.com",
      password: "Ad0833190809",
      confirmPassword: "Ad0833190809"
    },
  ],
    userStatus: false,
    userName: "",
    login: [],
    category: [],
    products: [],
    order: [],
    carts: [],
    modal: [],



  logout: () => {
      set({
          user: [],
          userStatus: false,
          userName: "",
          login: [],
          category: [],
          products: [],
          order: [],
          carts: [],
    });
  },


  
  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];
    const uniqe = _.unionWith(updateCart, _.isEqual);
    set({ carts: uniqe });
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
    const userLogin = get().login;
    const userLocalStorage = get().user;
     set({ userStatus: true });
     set({ login: item });
    const getTrue = userLocalStorage.some(
      (item) =>
        item.email === userLogin.email && item.password === userLogin.password
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

      set({ products: res.data.products });
    } catch (error) {
      console.log(error)
    }
  },



  actionSearchFilter: async (text) => {
    try {
      const res = await get().products
      const updateProduct = await set({
        products: res.filter((item) =>
          item.title.toLowerCase().includes(text)
      ),
    })
      const updateCartCard = [...res, {...updateProduct}]

      return updateCartCard

    } catch (error) {
      console.log(error.message);
    }
  },



  actionSearchCategory: async (text) => {
    try {
      const res = await get().products
      const getAllData = await createAllProduct()

      const updateProduct =  
      await set({
     
       products: getAllData.data.products.filter((item) =>
         text.includes(item.category)
     ),
   })
        
      const updateCartCard = [new Set( ...res, {...updateProduct})]
      return updateCartCard

    } catch (error) {
      console.log(error.message);
    }
  },



  actionSearchPrice: async (text) => {
    try {
      const res = await get().products
      const getAllData = await createAllProduct()
      const updateProduct = await set({
        products: getAllData.data.products.filter(
          (item) => item.price > text[0] && item.price < text[1]
        ),
      })
      const updateCartCard = [...res, {...updateProduct}]

      return updateCartCard

    } catch (error) {
      console.log(error.message);
    }
  },



  clearCart: async (Order) => {
    const orders = get().order;
    const userName = get().userName;
    const carts = get().carts;
    const createUserName = userName[0].email;
    const createTime = dateFormat(new Date().toUTCString());
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
