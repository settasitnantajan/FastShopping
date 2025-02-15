import axios from "axios";

export const createAllProduct = async () => {

    return axios.get("https://dummyjson.com/products?limit=0")
}

export const listProductByBestSeller = async () => {

    return axios.get('https://dummyjson.com/products?sortBy=rating&order=desc&limit=12')
}

export const listProductByNewProduct = async () => {

    return axios.get('https://dummyjson.com/products?sortBy=discountPercentage&order=desc&limit=12')
}

