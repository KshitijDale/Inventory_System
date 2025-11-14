// import React, { useState, useEffect, useCallback } from "react";
// import { Autocomplete, Button, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material";
// import { getTransactions, searchProducts, getUsers, getTransactionsByUser, getTransactionsByProduct, getTransactionsByDate } from "../api";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate } from "react-router-dom";

// const StockTransaction = () => {
//     const [transactions, setTransactions] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [selectedDate, setSelectedDate] = useState("");
//     const [page, setPage] = useState(1);
//     const token = localStorage.getItem("token");
//     const navigate = useNavigate();

//     const fetchTransactions = useCallback(async () => {
//         try {
//             const response = await getTransactions(token, page);
//             setTransactions(response.data.movements);
//         } catch (error) {
//             console.error("Error fetching transactions:", error);
//         }
//     }, [token, page]);

//     const fetchUsers = useCallback(async () => {
//         try {
//             const response = await getUsers(token);
//             setUsers(response.data.users);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     }, [token]);

//     const handleUserChange = async (event) => {
//         const username = event.target.value;
//         setSelectedUser(username);
//         try {
//             const response = await getTransactionsByUser(token, page, username);
            
//             setTransactions(response.data.movements);
//         } catch (error) {
//             console.error("Error fetching transactions by user:", error);
//         }
//     };

//     const handleProductSearch = async (query) => {
//         if (query.length > 0) {
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

//     const handleProductSelect = async (event, newValue) => {
//         if (newValue) {
//             try {
//                 const response = await getTransactionsByProduct(token, page, newValue._id);
//                 setTransactions(response.data.movements);
                
//             } catch (error) {
//                 console.error("Error fetching transactions by product:", error);
//             }
//         }
//     };

//     const handleDateChange = async (event) => {
//         const date = event.target.value;
//         setSelectedDate(date);
//         try {
//             const response = await getTransactionsByDate(token, page, date);
//             setTransactions(response.data.movements);
//         } catch (error) {
//             console.error("Error fetching transactions by date:", error);
//         }
//     };

//     useEffect(() => {
//         fetchTransactions();
//         fetchUsers();
//     }, [fetchTransactions, fetchUsers]);

//     return (
//         <div style={styles.container}>
//             <Button onClick={() => navigate(-1)} style={styles.backButton}>
//                 <ArrowBackIcon /> Back
//             </Button>
//             <div style={styles.content}>
//                 <h2>Stock Transactions</h2>

//                 {/* User Filter */}
//                 <Select value={selectedUser} onChange={handleUserChange} displayEmpty fullWidth>
//                     <MenuItem value="">Select User</MenuItem>
//                     {users.map((user) => (
//                         <MenuItem key={user._id} value={user.name}>{user.name}</MenuItem>
//                     ))}
//                 </Select>

//                 {/* Product Search & Select */}
//                 <Autocomplete
//                     freeSolo
//                     options={searchResults}
//                     getOptionLabel={(option) => `${option.prd_name} (${option.pack} | ${option.mfg})`}
//                     onInputChange={(event, newValue) => {
//                         handleProductSearch(newValue); // Keep search functionality intact
//                     }}
//                     onChange= {handleProductSelect}
//                     renderInput={(params) => <TextField {...params} label="Search Product" fullWidth />}
//                 />

//                 {/* Date Filter */}
//                 <TextField
//                     type="date"
//                     value={selectedDate}
//                     onChange={handleDateChange}
//                     fullWidth
//                     style={{ marginTop: 10 }}
//                 />
                
//                 {/* Table for Transactions */}
//                 <TableContainer component={Paper} style={{ marginTop: 20 }}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell><b>Product Name | Pack | Manufacture</b></TableCell>
//                                 <TableCell><b>Quantity</b></TableCell>
//                                 <TableCell><b>Recorded By</b></TableCell>
//                                 <TableCell><b>Date</b></TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {transactions.map((transaction) => (
//                                 <TableRow key={transaction._id}>
//                                     <TableCell>{`${transaction.product?.prd_name} | ${transaction.product?.pack} |${transaction.product?.mfg}` || "Unknown Product"}</TableCell>
//                                     <TableCell>{transaction.quantity}</TableCell>
//                                     <TableCell>{transaction.recorded_by?.name || "Unknown User"}</TableCell>
//                                     <TableCell>{new Date(transaction.time).toLocaleDateString()}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>

//                 {/* Pagination Buttons */}
//                 <div style={styles.pagination}>
//                     <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
//                     <Button onClick={() => setPage(page + 1)}>Next</Button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         display: "flex",
//         flexDirection: "column",
//         padding: 20,
//     },
//     backButton: {
//         alignSelf: "flex-start",
//         marginBottom: 20,
//     },
//     content: {
//         width: "100%",
//     },
//     pagination: {
//         marginTop: 20,
//         display: "flex",
//         justifyContent: "center",
//         gap: 10,
//     },
// };

// export default StockTransaction;

import React, { useState, useEffect, useCallback } from "react";
import { 
  Autocomplete, 
  Button, 
  MenuItem, 
  Select, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField,
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  IconButton,
  Divider,
  useMediaQuery,
  Chip,
  Pagination,
  Stack,
  AppBar,
  Toolbar,
  FormHelperText
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getTransactions, searchProducts, getUsers, getTransactionsByUser, getTransactionsByProduct, getTransactionsByDate } from "../api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useNavigate } from "react-router-dom";

const StockTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10); // Assuming we have this data
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);
  
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getTransactions(token, page);
      setTransactions(response.data.movements);
      // If the API provides total pages info, you can set it here
      // setTotalPages(response.data.totalPages);
      setActiveFilters([]);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
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

  const clearFilters = () => {
    setSelectedUser("");
    setSelectedProduct(null);
    setSelectedDate("");
    setActiveFilters([]);
    fetchTransactions();
  };

  const handleUserChange = async (event) => {
    const username = event.target.value;
    setSelectedUser(username);
    
    if (username) {
      setLoading(true);
      try {
        const response = await getTransactionsByUser(token, page, username);
        setTransactions(response.data.movements);
        
        // Update active filters
        setActiveFilters(prev => {
          const newFilters = prev.filter(f => f.type !== 'user');
          return [...newFilters, { type: 'user', value: username }];
        });
      } catch (error) {
        console.error("Error fetching transactions by user:", error);
      } finally {
        setLoading(false);
      }
    } else {
      // If user selection is cleared, remove the user filter
      setActiveFilters(prev => prev.filter(f => f.type !== 'user'));
      fetchTransactions();
    }
  };

  const handleProductSearch = async (query) => {
    if (query.length > 0) {
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

  const handleProductSelect = async (event, newValue) => {
    setSelectedProduct(newValue);
    
    if (newValue) {
      setLoading(true);
      try {
        const response = await getTransactionsByProduct(token, page, newValue._id);
        setTransactions(response.data.movements);
        
        // Update active filters
        setActiveFilters(prev => {
          const newFilters = prev.filter(f => f.type !== 'product');
          return [...newFilters, { 
            type: 'product', 
            value: `${newValue.prd_name} (${newValue.pack})` 
          }];
        });
      } catch (error) {
        console.error("Error fetching transactions by product:", error);
      } finally {
        setLoading(false);
      }
    } else {
      // If product selection is cleared, remove the product filter
      setActiveFilters(prev => prev.filter(f => f.type !== 'product'));
      fetchTransactions();
    }
  };

  const handleDateChange = async (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    
    if (date) {
      setLoading(true);
      try {
        const response = await getTransactionsByDate(token, page, date);
        setTransactions(response.data.movements);
        
        // Format date for display in filter chip
        const displayDate = new Date(date).toLocaleDateString();
        
        // Update active filters
        setActiveFilters(prev => {
          const newFilters = prev.filter(f => f.type !== 'date');
          return [...newFilters, { type: 'date', value: displayDate }];
        });
      } catch (error) {
        console.error("Error fetching transactions by date:", error);
      } finally {
        setLoading(false);
      }
    } else {
      // If date selection is cleared, remove the date filter
      setActiveFilters(prev => prev.filter(f => f.type !== 'date'));
      fetchTransactions();
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Remove a specific filter
  const handleRemoveFilter = (filterType) => {
    setActiveFilters(prev => prev.filter(f => f.type !== filterType));
    
    if (filterType === 'user') {
      setSelectedUser("");
    } else if (filterType === 'product') {
      setSelectedProduct(null);
    } else if (filterType === 'date') {
      setSelectedDate("");
    }
    
    // Refetch data based on remaining filters
    if (activeFilters.length <= 1) {
      fetchTransactions();
    } else {
      // Apply remaining filters
      const remainingFilters = activeFilters.filter(f => f.type !== filterType);
      if (remainingFilters.some(f => f.type === 'user')) {
        handleUserChange({ target: { value: selectedUser } });
      } else if (remainingFilters.some(f => f.type === 'product')) {
        handleProductSelect(null, selectedProduct);
      } else if (remainingFilters.some(f => f.type === 'date')) {
        handleDateChange({ target: { value: selectedDate } });
      }
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchUsers();
  }, [fetchTransactions, fetchUsers]);

  const renderMobileTable = () => (
    <Box sx={{ mt: 2 }}>
      {transactions.map((transaction) => (
        <Card key={transaction._id} sx={{ mb: 2, boxShadow: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {transaction.product?.prd_name || "Unknown Product"}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {`${transaction.product?.pack || ""} | ${transaction.product?.mfg || ""}`}
            </Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Units:
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {transaction.units}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Date:
                </Typography>
                <Typography variant="body1">
                  {new Date(transaction.time).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Recorded By:
                </Typography>
                <Typography variant="body1">
                  {transaction.recorded_by?.name || "Unknown User"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  const renderDesktopTable = () => (
    <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
            <TableCell><Typography fontWeight="bold">Product Details</Typography></TableCell>
            <TableCell><Typography fontWeight="bold">Units</Typography></TableCell>
            <TableCell><Typography fontWeight="bold">Recorded By</Typography></TableCell>
            <TableCell><Typography fontWeight="bold">Date</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.length > 0 ? transactions.map((transaction) => (
            <TableRow key={transaction._id} hover>
              <TableCell>
                <Typography variant="body1">{transaction.product?.prd_name || "Unknown Product"}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {`${transaction.product?.pack || ""} | ${transaction.product?.mfg || ""}`}
                </Typography>
              </TableCell>
              <TableCell>{transaction.units}</TableCell>
              <TableCell>{transaction.recorded_by?.name || "Unknown User"}</TableCell>
              <TableCell>{new Date(transaction.time).toLocaleDateString()}</TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="body1" py={3}>No transactions found</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: theme.palette.grey[50]
    }}>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => navigate(-1)}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stock Transactions
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
        <Card sx={{ mb: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Filter Transactions
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="user-select-label">Select User</InputLabel>
                  <Select
                    labelId="user-select-label"
                    value={selectedUser}
                    onChange={handleUserChange}
                    displayEmpty
                    label="Select User"
                    startAdornment={<PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                  >
                    <MenuItem value="">All Users</MenuItem>
                    {users.map((user) => (
                      <MenuItem key={user._id} value={user.name}>{user.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <Autocomplete
                  value={selectedProduct}
                  onChange={handleProductSelect}
                  options={searchResults}
                  getOptionLabel={(option) => `${option.prd_name} (${option.pack} | ${option.mfg})`}
                  onInputChange={(event, newValue) => handleProductSearch(newValue)}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      label="Search Product" 
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <InventoryIcon sx={{ mr: 1, color: 'text.secondary' }} />
                            {params.InputProps.startAdornment}
                          </>
                        )
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  fullWidth
                  label="Select Date"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>
            </Grid>

            {activeFilters.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <FilterAltIcon color="primary" fontSize="small" />
                  <Typography variant="body2" color="primary">Active Filters:</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {activeFilters.map((filter) => (
                      <Chip
                        key={filter.type}
                        label={`${filter.type === 'user' ? 'User' : filter.type === 'product' ? 'Product' : 'Date'}: ${filter.value}`}
                        onDelete={() => handleRemoveFilter(filter.type)}
                        size="small"
                        sx={{ my: 0.5 }}
                      />
                    ))}
                    <Button 
                      size="small" 
                      onClick={clearFilters} 
                      startIcon={<ClearIcon />}
                      sx={{ ml: 1 }}
                    >
                      Clear All
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            )}
          </CardContent>
        </Card>

        <Card sx={{ overflow: 'hidden' }}>
          <CardContent sx={{ p: isMobile ? 1 : 2 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 2
            }}>
              <Typography variant="h6" component="h3">
                Transaction List
              </Typography>
              {isTablet ? (
                <Typography variant="body2" color="text.secondary">
                  {transactions.length} results
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Page {page} • Showing {transactions.length} results
                </Typography>
              )}
            </Box>
            
            {loading ? (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography>Loading transactions...</Typography>
              </Box>
            ) : transactions.length === 0 ? (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography>No transactions found matching your criteria</Typography>
                <Button 
                  variant="outlined" 
                  onClick={clearFilters} 
                  sx={{ mt: 2 }}
                >
                  Clear Filters
                </Button>
              </Box>
            ) : (
              <>
                {isMobile ? renderMobileTable() : renderDesktopTable()}

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  pt: 2,
                  pb: 1
                }}>
                  <Pagination 
                    count={totalPages} 
                    page={page} 
                    onChange={handlePageChange} 
                    color="primary"
                    size={isMobile ? "small" : "medium"}
                  />
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default StockTransaction;