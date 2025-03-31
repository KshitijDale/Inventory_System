// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//     Drawer, List, ListItem, ListItemText, IconButton, Modal, Box, TextField, Button, Stack, Autocomplete
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import Add from "@mui/icons-material/Add";
// import Remove from "@mui/icons-material/Remove";
// import ProductList from "../components/productList";
// import { Logout, searchProducts, addStockTransaction } from "./../api";
// import { useNavigate } from "react-router-dom";

// const StockTransactionModal = ({ open, setOpen }) => {
//     const [products, setProducts] = useState([]);
// // eslint-disable-next-line
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const token = localStorage.getItem("token");

//     // Fetch products only when modal is open
//     useEffect(() => {
//         if (!open) {
//             setProducts([]); // Reset products when modal closes
//             setSearchResults([]);
//             setSearchQuery("");
//         }
//     }, [open]);

//     // Handle product search
//     const handleProductSearch = async (query) => {
//         setSearchQuery(query);
//         if (query.length > 1 && open) {
//             try {
//                 const response = await searchProducts(query, token);
//                 setSearchResults(response.data);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             }
//         } else {
//             setSearchResults([]);
//         }
//     };

//     // Handle product selection
//     const handleProductSelect = (index, product) => {
//         const updatedProducts = [...products];
//         updatedProducts[index] = {
//             prd_name: product.prd_name,
//             pack: product.pack,
//             mfg: product.mfg,
//             quantity: 0,
//             comment: ""
//         };
//         setProducts(updatedProducts);
//         setSearchQuery("");
//         setSearchResults([]);
//     };

//     // Add a new product row
//     const addProductField = () => {
//         setProducts([...products, { prd_name: "", pack:"", mfg:"", quantity: 0, comment: "" }]);
//     };

//     // Remove a product row
//     const removeProductField = (index) => {
//         setProducts(products.filter((_, i) => i !== index));
//     };

//     // Handle input change
//     const handleChange = (index, field, value) => {
//         const updatedProducts = [...products];
//         updatedProducts[index][field] = value;
//         setProducts(updatedProducts);
//     };

//     // Submit transaction
//     const handleSubmit = async () => {
//         if (products.length === 0) {
//             alert("Please add at least one product.");
//             return;
//         }
//         try {
//             await addStockTransaction(token, products);
//             alert("Stock Transaction Added Successfully!");
//             setProducts([]);
//             setOpen(false);
//         } catch (error) {
//             alert("Error submitting transaction.");
//             console.error(error);
//         }
//     };

//     return (
//         <Modal open={open} onClose={() => setOpen(false)}>
//             <Box sx={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: 500,
//                 bgcolor: "white",
//                 boxShadow: 24,
//                 p: 4,
//                 borderRadius: 2
//             }}>
//                 <h2>Add Stock Transaction</h2>

//                 {products.map((product, index) => (
//                     <Stack key={index} direction="row" spacing={1} alignItems="center">
//                         <Autocomplete
//                             freeSolo
//                             options={searchResults}
//                             getOptionLabel={(option) => `${option.prd_name} (${option.pack} | ${option.mfg})`}
//                             onInputChange={(event, newValue) => handleProductSearch(newValue)}
//                             onChange={(event, newValue) => newValue && handleProductSelect(index, newValue)}
//                             renderInput={(params) => <TextField {...params} label="Search Product" fullWidth />}
//                             sx={{ flex: 3 }}
//                         />
//                         <TextField
//                             label="Quantity"
//                             type="number"
//                             value={product.quantity}
//                             onChange={(e) => handleChange(index, "quantity", e.target.value)}
//                             sx={{ flex: 1 }}
//                         />
//                         <TextField
//                             label="Comment"
//                             value={product.comment}
//                             onChange={(e) => handleChange(index, "comment", e.target.value)}
//                             sx={{ flex: 2 }}
//                         />
//                         <IconButton onClick={() => removeProductField(index)} color="error">
//                             <Remove />
//                         </IconButton>
//                     </Stack>
//                 ))}

//                 {/* Add Product Button */}
//                 <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
//                     <IconButton onClick={addProductField} color="primary">
//                         <Add />
//                     </IconButton>
//                 </Stack>

//                 {/* Submit Button */}
//                 <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ mt: 2 }}>
//                     Submit
//                 </Button>
//             </Box>
//         </Modal>
//     );
// };

// const Dashboard = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [open, setOpen] = useState(false);
//     const navigate = useNavigate();

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     const logout = async () => {
//         toggleSidebar();
//         try {
//             const token = localStorage.getItem("token");
//             Logout(token);
//             localStorage.removeItem("token");
//             navigate('/');
//         } catch (error) {
//             console.error("Logout Failed");
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <IconButton onClick={toggleSidebar} style={styles.menuButton}>
//                 <MenuIcon />
//             </IconButton>
//             <Drawer open={isSidebarOpen} onClose={toggleSidebar}>
//                 <List style={styles.sidebar}>
//                     <ListItem button component={Link} to="/products" onClick={toggleSidebar}>
//                         <ListItemText primary="Product List" />
//                     </ListItem>
//                     <ListItem button component={Link} to="/vendor" onClick={toggleSidebar}>
//                         <ListItemText primary="Vendor Management" />
//                     </ListItem>
//                     <ListItem button component={Link} to="/payments" onClick={toggleSidebar}>
//                         <ListItemText primary="Payment" />
//                     </ListItem>
//                     <ListItem button component={Link} to="/bills" onClick={toggleSidebar}>
//                         <ListItemText primary="Bills" />
//                     </ListItem>
//                     <ListItem button onClick={() => setOpen(true)}>
//                         <ListItemText primary="Add a Stock Transaction" />
//                     </ListItem>
//                     <ListItem button component={Link} to="/add-inventory" onClick={toggleSidebar}>
//                         <ListItemText primary="Add to Inventory" />
//                     </ListItem>
//                     <ListItem button component={Link} to="/stock-transaction" onClick={toggleSidebar}>
//                         <ListItemText primary="Stock Transactions" />
//                     </ListItem>
//                     <ListItem button onClick={logout} style={{ color: "red" }}>
//                         <ListItemText primary="Logout" />
//                     </ListItem>
//                 </List>
//             </Drawer>
//             <div style={styles.content}>
//                 <h1>Welcome to Inventory Management</h1>
//                 <ProductList />
//             </div>
//             {/* Stock Transaction Modal */}
//             <StockTransactionModal open={open} setOpen={setOpen} />
//         </div>
//     );
// };

// const styles = {
//     container: { display: "flex" },
//     menuButton: { position: "absolute", top: 20, left: 20 },
//     sidebar: { width: 250 },
//     content: { marginLeft: 260, padding: 20, width: "100%" }
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Drawer, List, ListItem, ListItemText, IconButton, Modal, Box, TextField, Button, Stack, Autocomplete,
    AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, useMediaQuery, Divider, Paper
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";
import StoreIcon from "@mui/icons-material/Store";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ProductList from "../components/productList";
import { Logout, searchProducts, addStockTransaction } from "./../api";
import { useNavigate } from "react-router-dom";

const StockTransactionModal = ({ open, setOpen }) => {
    const [products, setProducts] = useState([]);
    // eslint-disable-next-line
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const token = localStorage.getItem("token");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Fetch products only when modal is open
    useEffect(() => {
        if (!open) {
            setProducts([]); // Reset products when modal closes
            setSearchResults([]);
            setSearchQuery("");
        }
    }, [open]);

    // Handle product search
    const handleProductSearch = async (query) => {
        setSearchQuery(query);
        if (query.length > 1 && open) {
            try {
                const response = await searchProducts(query, token);
                setSearchResults(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    // Handle product selection
    const handleProductSelect = (index, product) => {
        const updatedProducts = [...products];
        updatedProducts[index] = {
            prd_name: product.prd_name,
            pack: product.pack,
            mfg: product.mfg,
            quantity: 0,
            comment: ""
        };
        setProducts(updatedProducts);
        setSearchQuery("");
        setSearchResults([]);
    };

    // Add a new product row
    const addProductField = () => {
        setProducts([...products, { prd_name: "", pack: "", mfg: "", quantity: 0, comment: "" }]);
    };

    // Remove a product row
    const removeProductField = (index) => {
        setProducts(products.filter((_, i) => i !== index));
    };

    // Handle input change
    const handleChange = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
        setProducts(updatedProducts);
    };

    // Submit transaction
    const handleSubmit = async () => {
        if (products.length === 0) {
            alert("Please add at least one product.");
            return;
        }
        try {
            await addStockTransaction(token, products);
            alert("Stock Transaction Added Successfully!");
            setProducts([]);
            setOpen(false);
        } catch (error) {
            alert("Error submitting transaction.");
            console.error(error);
        }
    };

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: isMobile ? '90%' : 500,
                maxHeight: '90vh',
                overflow: 'auto',
                bgcolor: "white",
                boxShadow: 24,
                p: 3,
                borderRadius: 2
            }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Add Stock Transaction
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {products.map((product, index) => (
                    <Paper key={index} elevation={1} sx={{ mb: 2, p: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Autocomplete
                                    freeSolo
                                    options={searchResults}
                                    getOptionLabel={(option) => `${option.prd_name} (${option.pack} | ${option.mfg})`}
                                    onInputChange={(event, newValue) => handleProductSearch(newValue)}
                                    onChange={(event, newValue) => newValue && handleProductSelect(index, newValue)}
                                    renderInput={(params) => <TextField {...params} label="Search Product" fullWidth />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Quantity"
                                    type="number"
                                    value={product.quantity}
                                    onChange={(e) => handleChange(index, "quantity", e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <TextField
                                        label="Comment"
                                        value={product.comment}
                                        onChange={(e) => handleChange(index, "comment", e.target.value)}
                                        fullWidth
                                    />
                                    <IconButton onClick={() => removeProductField(index)} color="error" size="small">
                                        <Remove />
                                    </IconButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}

                {/* Add Product Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
                    <Button 
                        variant="outlined" 
                        startIcon={<Add />} 
                        onClick={addProductField}
                    >
                        Add Product
                    </Button>
                </Box>

                {/* Submit Button */}
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    onClick={handleSubmit} 
                    sx={{ mt: 2 }}
                    size="large"
                >
                    Submit Transaction
                </Button>
            </Box>
        </Modal>
    );
};

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const logout = async () => {
        toggleSidebar();
        try {
            const token = localStorage.getItem("token");
            Logout(token);
            localStorage.removeItem("token");
            navigate('/');
        } catch (error) {
            console.error("Logout Failed");
        }
    };

    const menuItems = [
        { text: "Product List", path: "/products", icon: <InventoryIcon /> },
        { text: "Vendor Management", path: "/vendor", icon: <StoreIcon /> },
        { text: "Payment", path: "/payments", icon: <PaymentIcon /> },
        { text: "Bills", path: "/bills", icon: <ReceiptIcon /> },
        { text: "Add to Inventory", path: "/add-inventory", icon: <Add /> },
        { text: "Stock Transactions", path: "/stock-transaction", icon: <InventoryIcon /> }
    ];

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleSidebar}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Inventory Management
                    </Typography>
                    <Button color="inherit" onClick={logout}>
                        <LogoutIcon sx={{ mr: isMobile ? 0 : 1 }} />
                        {!isMobile && "Logout"}
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer 
                anchor="left"
                open={isSidebarOpen} 
                onClose={toggleSidebar}
                variant={isMobile ? "temporary" : "temporary"}
            >
                <Box sx={{ 
                    width: isMobile ? 250 : 280,
                    pt: 2,
                    pb: 2
                }} role="presentation">
                    <Typography variant="h6" component="div" align="center" sx={{ mb: 2 }}>
                        Menu
                    </Typography>
                    <Divider />
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem 
                                button 
                                component={Link} 
                                to={item.path} 
                                onClick={toggleSidebar}
                                key={index}
                            >
                                <IconButton size="small" sx={{ mr: 1 }}>
                                    {item.icon}
                                </IconButton>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                        <ListItem button onClick={() => {
                            setOpen(true);
                            toggleSidebar();
                        }}>
                            <IconButton size="small" sx={{ mr: 1 }}>
                                <Add />
                            </IconButton>
                            <ListItemText primary="Add a Stock Transaction" />
                        </ListItem>
                        <Divider sx={{ my: 2 }} />
                        <ListItem button onClick={logout} sx={{ color: "red" }}>
                            <IconButton size="small" sx={{ mr: 1 }}>
                                <LogoutIcon />
                            </IconButton>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" component="h1">
                        Welcome to Inventory Management
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => setOpen(true)}
                        startIcon={<Add />}
                        sx={{ display: { xs: 'none', md: 'flex' } }}
                    >
                        New Transaction
                    </Button>
                </Box>

                <Card sx={{ mb: 4, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Products Overview
                        </Typography>
                        <ProductList />
                    </CardContent>
                </Card>

                {/* Mobile Floating Action Button for adding transaction */}
                {isMobile && (
                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: 20,
                            right: 20,
                            zIndex: 1000
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setOpen(true)}
                            sx={{ 
                                borderRadius: '50%', 
                                width: 56, 
                                height: 56,
                                minWidth: 0
                            }}
                        >
                            <Add />
                        </Button>
                    </Box>
                )}
            </Container>

            {/* Stock Transaction Modal */}
            <StockTransactionModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default Dashboard;