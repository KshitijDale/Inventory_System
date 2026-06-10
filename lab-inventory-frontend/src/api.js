import axios from "axios";

// const API_BASE_URL = " http://10.30.37.130:5000/api";
const API_BASE_URL = " https://inventory-system-op9e.onrender.com/api"; // Adjust as per backend

export const loginUser = async (credentials) => {
    return axios.post(`${API_BASE_URL}/user/login`, credentials);
};

export const getProducts = async (token, page = 1, limit = 25) => {
    return axios.get(`${API_BASE_URL}/product/all_products?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true 
    });
};

export const getProductDetails = async(token, prd_name,pack,mfg) =>{
    return axios.get(`${API_BASE_URL}/product/get_detail?prd_name=${prd_name}&pack=${pack}&mfg=${mfg}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
};

export const addInventory = async(token, payload)=>{
    return axios.post(`${API_BASE_URL}/add_inventory`, payload,{
        headers: {Authorization: `Bearer ${token}`},
        withCredentials: true 
    });
};

export const getPayments = async (token) => {
    return axios.get(`${API_BASE_URL}/payment`,{
        headers: {Authorization: `Bearer ${token}`},
        withCredentials: true 
    });
};

export const addPayment  = async (token, formData) =>{
    return axios.post(`${API_BASE_URL}/payment`, formData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getVendors = async (token) => {
    return axios.get(`${API_BASE_URL}/vendor/get_vendors`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const addStockTransaction = async (token, stockData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/movement`, stockData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        console.error("Error adding stock transaction:", error);
        throw error;
    }
};

// export const addStock = async(token, formData) => {
//     return axios.post(
//         `${API_BASE_URL}/movement`,
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//     );
// }
export const Logout = async(token)=>{
    return axios.post(`${API_BASE_URL}/user/logout`,{} ,{
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true 
    });
};

export const addVendor = async (token, vendorName, vendorAddress) => {
    return axios.post(`${API_BASE_URL}/vendor`, { 
        vendor_name: vendorName, 
        vendor_addr: vendorAddress 
    }, { 
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true 
    });
};

export const getTransactions = async (token, page = 1) => {
    return axios.get(`${API_BASE_URL}/movement?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true 
    });
};

export const getUsers = async (token) => {
    return axios.get(`${API_BASE_URL}/user/getUsers`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true 
    });
};

export const getTransactionsByUser = async (token, page = 1, name = "") => {
    return axios.get(`${API_BASE_URL}/movement?page=${page}&name=${name}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true 
    });
};

export const getProductList = async (token) => {
    return axios.get(`${API_BASE_URL}/product/productList`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true 
    });
};

export const getTransactionsByProduct = async (token, page = 1, product = "") => {
    return axios.get(`${API_BASE_URL}/movement?page=${page}&product=${product}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true 
    });
};

export const getTransactionsByDate = async (token, page = 1, date = "") => {
    return axios.get(`${API_BASE_URL}/movement?page=${page}&date=${date}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true 
    });
};

export const getBills = (token, page = 1, limit = 10) => {
    return axios.get(`${API_BASE_URL}/bills?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true 
    });
  };
  
  export const getBillDetails = (token, bill_id) => {
    return axios.get(`${API_BASE_URL}/bills/detail?bill_id=${bill_id}`,{
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true 
    });
  };

  export const getLedger = (token,vendor_id, start_date)=>{
    
    return axios.get(`${API_BASE_URL}/vendor/get_ledger?vendor_id=${vendor_id}`, {
        params: { start_date },
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
    });
  };

  export const searchProducts = async (query, token) => {
    return await axios.get(`${API_BASE_URL}/search?query=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
  };

