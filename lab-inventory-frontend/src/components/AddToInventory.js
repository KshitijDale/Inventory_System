

// import { useState, useEffect, useCallback } from "react";
// import { TextField, Button, Stack, Card, CardContent, Typography, IconButton, MenuItem, Select, Autocomplete } from "@mui/material";
// import { Edit ,Add, Remove, Search } from "@mui/icons-material";
// import { addInventory, getVendors, searchProducts } from "../api";

// const AddToInventory = () => {
//     const [vendorName, setVendorName] = useState("");
//     const [vendors, setVendors] = useState([]);
//     const [billDate, setBillDate] = useState("");
//     const [billAmount, setBillAmount] = useState("");
//     const [productDetails, setProductDetails] = useState([]);
// // eslint-disable-next-line no-unused-vars
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const token = localStorage.getItem("token");
//     const [hasStarted, setHasStarted] = useState(false); // Controls if first row is added

//     // Fetch Vendors
//     const fetchVendors = useCallback(async () => {
//         try {
//             const response = await getVendors(token);
//             setVendors(response.data);
//         } catch (error) {
//             console.error("Error fetching vendors:", error);
//         }
//     }, [token]);

//     useEffect(() => {
//         fetchVendors();
//     }, [fetchVendors]);

//     // Search Products
//     const handleProductSearch = async (query) => {
//         setSearchQuery(query);
//         if (query.length > 1) {
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

//     // Select Product from Search
//     const handleProductSelect = (index, product) => {
//         const updatedProducts = [...productDetails];
//         updatedProducts[index] = { 
//             product_name: product.prd_name, 
//             pack: product.pack, 
//             mfg: product.mfg, 
//             type: "search"
//         };
//         setProductDetails(updatedProducts);
//         setSearchQuery(""); // Clear search field
//         setSearchResults([]);
//     };

//     // Add a new manual product row
//     const addManualProductField = () => {
//         setProductDetails([...productDetails, { product_name: "", pack: "", mfg: "", quantity: 0, price: 0, type: "manual" }]);
//         setHasStarted(true);
//     };

//     // Add a new searched product row
//     const addSearchProductField = () => {
//         setProductDetails([...productDetails, { product_name: "", pack: "", mfg: "", quantity: 0, price: 0, type: "search" }]);
//         setHasStarted(true);
//     };

//     // Remove a product row
//     const removeProductField = (index) => {
//         setProductDetails(productDetails.filter((_, i) => i !== index));
//     };

//     // Handle Form Submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const payload = { vendor_name: vendorName, bill_date: billDate, bill_amount: billAmount, product_details: productDetails };

//         try {
//             if (!token) {
//                 alert("Unauthorized! Please login.");
//                 return;
//             }
//             await addInventory(token, payload);
//             alert("Inventory added successfully!");
//             setVendorName("");
//             setBillDate("");
//             setBillAmount("");
//             setProductDetails([]);
//             setHasStarted(false);
//         } catch (error) {
//             alert(error.response?.data?.message || "Error adding inventory");
//         }
//     };

//     return (
//         <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 2 }}>
//             <CardContent>
//                 <Typography variant="h5" gutterBottom>
//                     Add to Inventory
//                 </Typography>
//                 <form onSubmit={handleSubmit}>
//                     <Stack spacing={2}>
//                         {/* Vendor Selection */}
//                         <Select fullWidth name="vendor_name" value={vendorName} onChange={(e) => setVendorName(e.target.value)} required displayEmpty>
//                             <MenuItem value="">Select Vendor</MenuItem>
//                             {vendors.map((vendor) => (
//                                 <MenuItem key={vendor._id} value={vendor.name}>{vendor.name}</MenuItem>
//                             ))}
//                         </Select>
//                         {/* Bill Details */}
//                         <TextField type="date" label="Bill Date" fullWidth InputLabelProps={{ shrink: true }} value={billDate} onChange={(e) => setBillDate(e.target.value)} required />
//                         <TextField type="number" label="Bill Amount" fullWidth value={billAmount} onChange={(e) => setBillAmount(e.target.value)} required />

//                         {/* Initial Buttons to Start */}
//                         {!hasStarted && (
//                             <Stack direction="row" spacing={2} justifyContent="center">
//                                 <Button variant="outlined" startIcon={<Search />} onClick={addSearchProductField}>
//                                     Search Product
//                                 </Button>
//                                 <Button variant="outlined" startIcon={<Add />} onClick={addManualProductField}>
//                                     Add Product
//                                 </Button>
//                             </Stack>
//                         )}

//                         {/* Product List */}
//                         {productDetails.map((product, index) => (
//                             <Stack key={index} direction="row" spacing={1}>
//                                 {product.type === "search" ? (
//                                     <Autocomplete
//                                         freeSolo
//                                         options={searchResults}
//                                         getOptionLabel={(option) => `${option.prd_name} (${option.pack} | ${option.mfg})`}
//                                         onInputChange={(event, newInputValue) => handleProductSearch(newInputValue)}
//                                         onChange={(event, newValue) => newValue && handleProductSelect(index, newValue)}
//                                         renderInput={(params) => <TextField {...params} label="Search Product" fullWidth />}
//                                         sx={{ flex: 3 }} 
//                                     />
//                                 ) : (
//                                     <Stack direction="row" spacing={1} sx={{ flex: 3 }}>
//                                         <TextField label="Product Name" fullWidth value={product.product_name} onChange={(e) => {
//                                             const updatedProducts = [...productDetails];
//                                             updatedProducts[index].product_name = e.target.value;
//                                             setProductDetails(updatedProducts);
//                                         }} required />
//                                         <TextField label="Pack" fullWidth value={product.pack} onChange={(e) => {
//                                             const updatedProducts = [...productDetails];
//                                             updatedProducts[index].pack = e.target.value;
//                                             setProductDetails(updatedProducts);
//                                         }} />
//                                         <TextField label="Mfg" fullWidth value={product.mfg} onChange={(e) => {
//                                             const updatedProducts = [...productDetails];
//                                             updatedProducts[index].mfg = e.target.value;
//                                             setProductDetails(updatedProducts);
//                                         }} />
//                                     </Stack>
//                                 )}
//                                 <TextField type="number" label="Quantity" fullWidth value={product.quantity} onChange={(e) => {
//                                     const updatedProducts = [...productDetails];
//                                     updatedProducts[index].quantity = e.target.value;
//                                     setProductDetails(updatedProducts);
//                                 }} sx={{ flex: 1 }} required />
//                                 <TextField type="number" label="Price" fullWidth value={product.price} onChange={(e) => {
//                                     const updatedProducts = [...productDetails];
//                                     updatedProducts[index].price = e.target.value;
//                                     setProductDetails(updatedProducts);
//                                 }} sx={{ flex: 1 }} required />
//                                 <IconButton onClick={() => removeProductField(index)} color="error">
//                                     <Remove />
//                                 </IconButton>
//                                 {index === productDetails.length - 1 && (
//                                         <>
//                                             <IconButton onClick={addSearchProductField} color="primary">
//                                                 <Add />
//                                             </IconButton>
//                                             <IconButton onClick={addManualProductField} color="secondary">
//                                                 <Edit />
//                                             </IconButton>
//                                         </>
//                                     )}
//                             </Stack>
//                         ))}

//                         <Button type="submit" variant="contained" color="primary">
//                             Add Inventory
//                         </Button>
//                     </Stack>
//                 </form>
//             </CardContent>
//         </Card>
//     );
// };

// export default AddToInventory;

import { useState, useEffect, useCallback } from "react";
import { 
  TextField, 
  Button, 
  Stack, 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  MenuItem, 
  Select, 
  Autocomplete,
  Box,
  Divider,
  Paper,
  FormControl,
  InputLabel,
  useMediaQuery,
  useTheme,
  Tooltip,
  Grid
} from "@mui/material";
import { Edit, Add, Remove, Search, Receipt, Inventory } from "@mui/icons-material";
import { addInventory, getVendors, searchProducts } from "../api";

const AddToInventory = () => {
    const [vendorName, setVendorName] = useState("");
    const [vendors, setVendors] = useState([]);
    const [billDate, setBillDate] = useState("");
    const [billAmount, setBillAmount] = useState("");
    const [productDetails, setProductDetails] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const token = localStorage.getItem("token");
    const [hasStarted, setHasStarted] = useState(false);
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Fetch Vendors
    const fetchVendors = useCallback(async () => {
        try {
            const response = await getVendors(token);
            setVendors(response.data);
        } catch (error) {
            console.error("Error fetching vendors:", error);
        }
    }, [token]);

    useEffect(() => {
        fetchVendors();
    }, [fetchVendors]);

    // Search Products
    const handleProductSearch = async (query) => {
        setSearchQuery(query);
        if (query.length > 1) {
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

    // Select Product from Search
    const handleProductSelect = (index, product) => {
        const updatedProducts = [...productDetails];
        updatedProducts[index] = { 
            product_name: product.prd_name, 
            pack: product.pack, 
            mfg: product.mfg, 
            quantity: 0, 
            price: 0, 
            type: "search"
        };
        setProductDetails(updatedProducts);
        setSearchQuery(""); // Clear search field
        setSearchResults([]);
    };

    // Add a new manual product row
    const addManualProductField = () => {
        setProductDetails([...productDetails, { product_name: "", pack: "", mfg: "", quantity: 0, price: 0, type: "manual" }]);
        setHasStarted(true);
    };

    // Add a new searched product row
    const addSearchProductField = () => {
        setProductDetails([...productDetails, { product_name: "", pack: "", mfg: "", quantity: 0, price: 0, type: "search" }]);
        setHasStarted(true);
    };

    // Remove a product row
    const removeProductField = (index) => {
        setProductDetails(productDetails.filter((_, i) => i !== index));
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { vendor_name: vendorName, bill_date: billDate, bill_amount: billAmount, product_details: productDetails };

        try {
            if (!token) {
                alert("Unauthorized! Please login.");
                return;
            }
            await addInventory(token, payload);
            alert("Inventory added successfully!");
            setVendorName("");
            setBillDate("");
            setBillAmount("");
            setProductDetails([]);
            setHasStarted(false);
        } catch (error) {
            alert(error.response?.data?.message || "Error adding inventory");
        }
    };

    // Render a product row based on type and device
    const renderProductRow = (product, index) => {
        if (isMobile) {
            return (
                <Paper elevation={2} sx={{ p: 2, mb: 2, position: 'relative' }} key={index}>
                    {/* Product Details */}
                    {product.type === "search" ? (
                        <Autocomplete
                            freeSolo
                            options={searchResults}
                            getOptionLabel={(option) => `${option.prd_name} (${option.pack} | ${option.mfg})`}
                            onInputChange={(event, newInputValue) => handleProductSearch(newInputValue)}
                            onChange={(event, newValue) => newValue && handleProductSelect(index, newValue)}
                            renderInput={(params) => <TextField {...params} label="Search Product" fullWidth margin="normal" />}
                        />
                    ) : (
                        <>
                            <TextField 
                                label="Product Name" 
                                fullWidth 
                                value={product.product_name} 
                                onChange={(e) => {
                                    const updatedProducts = [...productDetails];
                                    updatedProducts[index].product_name = e.target.value;
                                    setProductDetails(updatedProducts);
                                }} 
                                required 
                                margin="normal"
                            />
                            <Grid container spacing={2} sx={{ mt: 0 }}>
                                <Grid item xs={6}>
                                    <TextField 
                                        label="Pack" 
                                        fullWidth 
                                        value={product.pack} 
                                        onChange={(e) => {
                                            const updatedProducts = [...productDetails];
                                            updatedProducts[index].pack = e.target.value;
                                            setProductDetails(updatedProducts);
                                        }}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField 
                                        label="Mfg" 
                                        fullWidth 
                                        value={product.mfg} 
                                        onChange={(e) => {
                                            const updatedProducts = [...productDetails];
                                            updatedProducts[index].mfg = e.target.value;
                                            setProductDetails(updatedProducts);
                                        }}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                        </>
                    )}
                    
                    {/* Quantity and Price */}
                    <Grid container spacing={2} sx={{ mt: 0 }}>
                        <Grid item xs={6}>
                            <TextField 
                                type="number" 
                                label="Quantity" 
                                fullWidth 
                                value={product.quantity} 
                                onChange={(e) => {
                                    const updatedProducts = [...productDetails];
                                    updatedProducts[index].quantity = e.target.value;
                                    setProductDetails(updatedProducts);
                                }} 
                                required
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                type="number" 
                                label="Price" 
                                fullWidth 
                                value={product.price} 
                                onChange={(e) => {
                                    const updatedProducts = [...productDetails];
                                    updatedProducts[index].price = e.target.value;
                                    setProductDetails(updatedProducts);
                                }} 
                                required
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                    
                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        <Tooltip title="Remove">
                            <IconButton onClick={() => removeProductField(index)} color="error" size="small">
                                <Remove />
                            </IconButton>
                        </Tooltip>
                        {index === productDetails.length - 1 && (
                            <>
                                <Tooltip title="Add Search Product">
                                    <IconButton onClick={addSearchProductField} color="primary" size="small">
                                        <Search />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Add Manual Product">
                                    <IconButton onClick={addManualProductField} color="secondary" size="small">
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                    </Box>
                </Paper>
            );
        } else {
            // Desktop layout
            return (
                <Stack key={index} direction="row" spacing={1} sx={{ mb: 2, alignItems: 'center' }}>
                    {product.type === "search" ? (
                        <Autocomplete
                            freeSolo
                            options={searchResults}
                            getOptionLabel={(option) => `${option.prd_name} (${option.pack} | ${option.mfg})`}
                            onInputChange={(event, newInputValue) => handleProductSearch(newInputValue)}
                            onChange={(event, newValue) => newValue && handleProductSelect(index, newValue)}
                            renderInput={(params) => <TextField {...params} label="Search Product" fullWidth />}
                            sx={{ flex: 3 }} 
                        />
                    ) : (
                        <Stack direction="row" spacing={1} sx={{ flex: 3 }}>
                            <TextField 
                                label="Product Name" 
                                fullWidth 
                                value={product.product_name} 
                                onChange={(e) => {
                                    const updatedProducts = [...productDetails];
                                    updatedProducts[index].product_name = e.target.value;
                                    setProductDetails(updatedProducts);
                                }} 
                                required 
                            />
                            <TextField 
                                label="Pack" 
                                fullWidth 
                                value={product.pack} 
                                onChange={(e) => {
                                    const updatedProducts = [...productDetails];
                                    updatedProducts[index].pack = e.target.value;
                                    setProductDetails(updatedProducts);
                                }} 
                            />
                            <TextField 
                                label="Mfg" 
                                fullWidth 
                                value={product.mfg} 
                                onChange={(e) => {
                                    const updatedProducts = [...productDetails];
                                    updatedProducts[index].mfg = e.target.value;
                                    setProductDetails(updatedProducts);
                                }} 
                            />
                        </Stack>
                    )}
                    <TextField 
                        type="number" 
                        label="Quantity" 
                        fullWidth 
                        value={product.quantity} 
                        onChange={(e) => {
                            const updatedProducts = [...productDetails];
                            updatedProducts[index].quantity = e.target.value;
                            setProductDetails(updatedProducts);
                        }} 
                        sx={{ flex: 1 }} 
                        required 
                    />
                    <TextField 
                        type="number" 
                        label="Price" 
                        fullWidth 
                        value={product.price} 
                        onChange={(e) => {
                            const updatedProducts = [...productDetails];
                            updatedProducts[index].price = e.target.value;
                            setProductDetails(updatedProducts);
                        }} 
                        sx={{ flex: 1 }} 
                        required 
                    />
                    <Tooltip title="Remove">
                        <IconButton onClick={() => removeProductField(index)} color="error">
                            <Remove />
                        </IconButton>
                    </Tooltip>
                    {index === productDetails.length - 1 && (
                        <>
                            <Tooltip title="Add Search Product">
                                <IconButton onClick={addSearchProductField} color="primary">
                                    <Search />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Add Manual Product">
                                <IconButton onClick={addManualProductField} color="secondary">
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                </Stack>
            );
        }
    };

    return (
        <Card sx={{ 
            maxWidth: isMobile ? '100%' : 800, 
            margin: "auto", 
            mt: 4, 
            p: isMobile ? 1 : 2,
            borderRadius: 2,
            boxShadow: 3
        }}>
            <CardContent>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Inventory sx={{ mr: 1 }} /> Add to Inventory
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                            <Receipt sx={{ mr: 1, fontSize: 20 }} /> Bill Information
                        </Typography>
                        
                        <Grid container spacing={isMobile ? 2 : 3}>
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth sx={{ mb: isMobile ? 2 : 0 }}>
                                    <InputLabel id="vendor-select-label">Select Vendor</InputLabel>
                                    <Select
                                        labelId="vendor-select-label"
                                        label="Select Vendor"
                                        value={vendorName}
                                        onChange={(e) => setVendorName(e.target.value)}
                                        required
                                        displayEmpty
                                    >
                                        <MenuItem value="">Select Vendor</MenuItem>
                                        {vendors.map((vendor) => (
                                            <MenuItem key={vendor._id} value={vendor.name}>{vendor.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField 
                                    type="date" 
                                    label="Bill Date" 
                                    fullWidth 
                                    InputLabelProps={{ shrink: true }} 
                                    value={billDate} 
                                    onChange={(e) => setBillDate(e.target.value)} 
                                    required 
                                    sx={{ mb: isMobile ? 2 : 0 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField 
                                    type="number" 
                                    label="Bill Amount" 
                                    fullWidth 
                                    value={billAmount} 
                                    onChange={(e) => setBillAmount(e.target.value)} 
                                    required 
                                    InputProps={{ 
                                        startAdornment: <Typography variant="body2" sx={{ mr: 0.5 }}>₹</Typography> 
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider sx={{ my: 3 }} />
                    
                    <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Inventory sx={{ mr: 1, fontSize: 20 }} /> Product Details
                    </Typography>

                    {/* Initial Buttons to Start */}
                    {!hasStarted && (
                        <Stack 
                            direction={isMobile ? "column" : "row"} 
                            spacing={2} 
                            justifyContent="center"
                            sx={{ mb: 3, mt: 3 }}
                        >
                            <Button 
                                variant="outlined" 
                                startIcon={<Search />} 
                                onClick={addSearchProductField}
                                fullWidth={isMobile}
                                sx={{ py: isMobile ? 1.5 : 1 }}
                            >
                                Search Existing Product
                            </Button>
                            <Button 
                                variant="outlined" 
                                startIcon={<Add />} 
                                onClick={addManualProductField}
                                fullWidth={isMobile}
                                sx={{ py: isMobile ? 1.5 : 1 }}
                            >
                                Add New Product
                            </Button>
                        </Stack>
                    )}

                    {/* Product List */}
                    <Box sx={{ mt: 2 }}>
                        {productDetails.map((product, index) => renderProductRow(product, index))}
                    </Box>

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            size={isMobile ? "large" : "medium"}
                            sx={{ minWidth: isMobile ? '100%' : 200, py: isMobile ? 1.5 : 1 }}
                        >
                            Add Inventory
                        </Button>
                    </Box>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddToInventory;