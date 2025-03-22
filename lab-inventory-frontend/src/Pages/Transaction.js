import React, { useState, useEffect, useCallback  } from "react";
import { Button, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper ,TextField} from "@mui/material";
import { getTransactions, getUsers, getTransactionsByUser, getProductList, getTransactionsByProduct, getTransactionsByDate } from "../api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const StockTransaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [page, setPage] = useState(1);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await getTransactions(token, page);
            setTransactions(response.data.movements);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }, [token, page]);

    const fetchUsers = useCallback(async () => {
        try {
            const response = await getUsers(token);
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }, [token]);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await getProductList(token, 1); // Assuming products come from transactions
            setProducts(response.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [token]);

    const handleUserChange = async (event) => {
        const username = event.target.value;
        setSelectedUser(username);
        try {
            const response = await getTransactionsByUser(token, page, username);
            setTransactions(response.data.movements);
        } catch (error) {
            console.error("Error fetching transactions by user:", error);
        }
    };


    const handleProductChange = async (event) => {
        const productName = event.target.value;
        setSelectedProduct(productName);
        try {
            const response = await getTransactionsByProduct(token, page, productName);
            setTransactions(response.data.movements);
        } catch (error) {
            console.error("Error fetching transactions by product:", error);
        }
    };

    const handleDateChange = async (event) => {
        const date = event.target.value;
        setSelectedDate(date);
        try {
            const response = await getTransactionsByDate(token, page, date);
            setTransactions(response.data.movements);
        } catch (error) {
            console.error("Error fetching transactions by date:", error);
        }
    };


    useEffect(() => {
        fetchTransactions();
        fetchUsers();
        fetchProducts();
    }, [fetchTransactions, fetchUsers, fetchProducts]);


    return (
        <div style={styles.container}>
            <Button onClick={() => navigate(-1)} style={styles.backButton}>
                <ArrowBackIcon /> Back
            </Button>
            <div style={styles.content}>
                <h2>Stock Transactions</h2>

                {/* User Filter */}
                <Select value={selectedUser} onChange={handleUserChange} displayEmpty fullWidth>
                    <MenuItem value="">Select User</MenuItem>
                    {users.map((user) => (
                        <MenuItem key={user._id} value={user.name}>{user.name}</MenuItem>
                    ))}
                </Select>

                {/* Product Filter */}
                <Select value={selectedProduct} onChange={handleProductChange} displayEmpty fullWidth style={{ marginTop: 10 }}>
                    <MenuItem value="">Select Product</MenuItem>
                    {products.map((product, index) => (
                        <MenuItem key={product._id} value={product.prd_name}>{product.prd_name}</MenuItem>
                    ))}
                </Select>
                 {/* Date Filter */}
                 <TextField
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    fullWidth
                    style={{ marginTop: 10 }}
                />
                {/* Table for Transactions */}
                <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Product Name</b></TableCell>
                                <TableCell><b>Quantity</b></TableCell>
                                <TableCell><b>Recorded By</b></TableCell>
                                <TableCell><b>Date</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow key={transaction._id}>
                                    <TableCell>{transaction.product?.prd_name || "Unknown Product"}</TableCell>
                                    <TableCell>{transaction.quantity}</TableCell>
                                    <TableCell>{transaction.recorded_by?.name || "Unknown User"}</TableCell>
                                    <TableCell>{new Date(transaction.time).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination Buttons */}
                <div style={styles.pagination}>
                    <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
                    <Button onClick={() => setPage(page + 1)}>Next</Button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        padding: 20,
    },
    backButton: {
        alignSelf: "flex-start",
        marginBottom: 20,
    },
    content: {
        width: "100%",
    },
    pagination: {
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
        gap: 10,
    },
};

export default StockTransaction;
