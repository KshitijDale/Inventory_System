// import React, { useState, useEffect , useCallback} from "react";
// import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, TextField, MenuItem, Select } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate } from "react-router-dom";
// import { getPayments, getVendors, addPayment } from "../api";

// const PaymentsPage = () => {
//     const [payments, setPayments] = useState([]);
//     const [vendors, setVendors] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         vendor_name: "",
//         paid_amt: "",
//         pay_channel: "",
//         payment_date: "",
//         done_by: "",
//     });
//     const [page, setPage] = useState(1);
//     const token = localStorage.getItem("token");
//     const navigate = useNavigate();

//     // Fetch Payments (GET API)
//     const fetchPayments = useCallback(async () => {
//         try {
//             // console.log(token);
//             const response = await getPayments(token);
//             setPayments(response.data); // Paginate (25 per page) .slice((page - 1) * 25, page * 25)
//         } catch (error) {
//             console.error("Error fetching payments:", error);
//         }
//     },[token]);

//     // Fetch Vendors for the Form (Dropdown)
//     const fetchVendors = useCallback(async () => {
//         try {
//             const response = await getVendors(token);
//             setVendors(response.data);
//         } catch (error) {
//             console.error("Error fetching vendors:", error);
//         }
//     },[token]);

//     // Handle Form Input Changes
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Handle Form Submission (POST API)
//     const handleSubmit = async () => {
//         try {
//             await addPayment(token,formData);
//             alert("Payment added successfully!");
//             setOpen(false);
//             fetchPayments(); // Refresh Payments List
//         } catch (error) {
//             console.error("Error adding payment:", error);
//         }
//     };

//     // Fetch Data on Component Mount
//     useEffect(() => {
//         fetchPayments();
//         fetchVendors();
//     }, [fetchPayments,fetchVendors]);

//     return (
//         <div style={styles.container}>
//             <Button onClick={() => navigate(-1)} style={styles.backButton}>
//                 <ArrowBackIcon /> Back
//             </Button>
//             <div style={styles.content}>
//                 <h2>Payments</h2>
//                 <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
//                     Add a Payment
//                 </Button>

//                 {/* Payments Table */}
//                 <TableContainer component={Paper} style={{ marginTop: 20 }}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell><b>Vendor Name</b></TableCell>
//                                 <TableCell><b>Amount Paid</b></TableCell>
//                                 <TableCell><b>Payment Channel</b></TableCell>
//                                 <TableCell><b>Date</b></TableCell>
//                                 <TableCell><b>Done By</b></TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {payments.map((payment) => (
//                                 <TableRow key={payment._id}>
//                                     <TableCell>{payment.vendor || "Unknown Vendor"}</TableCell>
//                                     <TableCell>{payment.paid_amt}</TableCell>
//                                     <TableCell>{payment.pay_channel}</TableCell>
//                                     <TableCell>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
//                                     <TableCell>{payment.done_by || "Unknown"}</TableCell>
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

//             {/* Modal for Adding Payment */}
//             <Modal open={open} onClose={() => setOpen(false)}>
//                 <Box sx={styles.modal}>
//                     <h2>Add Payment</h2>
//                     <Select fullWidth name="vendor_name" value={formData.vendor_name} onChange={handleChange} displayEmpty margin="normal">
//                         <MenuItem value="">Select Vendor</MenuItem>
//                         {vendors.map((vendor) => (
//                             <MenuItem key={vendor._id} value={vendor.name}>{vendor.name}</MenuItem>
//                         ))}
//                     </Select>
//                     <TextField fullWidth label="Amount Paid" name="paid_amt" type="number" value={formData.paid_amt} onChange={handleChange} margin="normal" />
//                     <TextField fullWidth label="Payment Channel" name="pay_channel" value={formData.pay_channel} onChange={handleChange} margin="normal" />
//                     <TextField fullWidth type="date" label="Payment Date" name="payment_date" value={formData.payment_date} onChange={handleChange} margin="normal" />
//                     <TextField fullWidth label="Done By" name="done_by" value={formData.done_by} onChange={handleChange} margin="normal" />
//                     <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
//                         Submit
//                     </Button>
//                 </Box>
//             </Modal>
//         </div>
//     );
// };

// // Styles
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
//     modal: {
//         position: "absolute",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         width: 400,
//         bgcolor: "white",
//         boxShadow: 24,
//         p: 4,
//         borderRadius: 2
//     }
// };

// export default PaymentsPage;

import React, { useState, useEffect, useCallback } from "react";
import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Modal, 
  Box, 
  TextField, 
  MenuItem, 
  Select,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  IconButton,
  FormControl,
  InputLabel,
  Divider,
  Chip,
  Pagination,
  useMediaQuery,
  useTheme,
  InputAdornment,
  FormHelperText,
  Skeleton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import PaymentIcon from "@mui/icons-material/Payment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import { useNavigate } from "react-router-dom";
import { getPayments, getVendors, addPayment } from "../api";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    vendor_name: "",
    paid_amt: "",
    pay_channel: "",
    payment_date: "",
    done_by: "",
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const itemsPerPage = 10;

  // Fetch Payments (GET API)
  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getPayments(token);
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Fetch Vendors for the Form (Dropdown)
  const fetchVendors = useCallback(async () => {
    try {
      const response = await getVendors(token);
      setVendors(response.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  }, [token]);

  // Handle Form Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission (POST API)
  const handleSubmit = async () => {
    try {
      await addPayment(token, formData);
      alert("Payment added successfully!");
      setOpen(false);
      setFormData({
        vendor_name: "",
        paid_amt: "",
        pay_channel: "",
        payment_date: "",
        done_by: "",
      });
      fetchPayments(); // Refresh Payments List
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  };

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(value);
  };

  // Fetch Data on Component Mount
  useEffect(() => {
    fetchPayments();
    fetchVendors();
  }, [fetchPayments, fetchVendors]);

  // Calculate pagination
  const paginatedPayments = payments.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  // Render mobile view with cards
  const renderMobileView = () => (
    <>
      {paginatedPayments.map((payment) => (
        <Card key={payment._id} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" component="div">
                {payment.vendor || "Unknown Vendor"}
              </Typography>
              <Chip 
                icon={<PaymentIcon />} 
                label={payment.pay_channel} 
                size="small" 
                color="primary" 
                variant="outlined"
              />
            </Box>
            
            <Typography variant="h5" sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 'bold' }}>
              {formatCurrency(payment.paid_amt)}
            </Typography>
            
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(payment.payment_date).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {payment.done_by || "Unknown"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );

  // Render desktop view with table
  const renderDesktopView = () => (
    <TableContainer component={Paper} elevation={2} sx={{ mt: 3, mb: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
            <TableCell><Typography variant="subtitle2">Vendor Name</Typography></TableCell>
            <TableCell align="right"><Typography variant="subtitle2">Amount Paid</Typography></TableCell>
            <TableCell><Typography variant="subtitle2">Payment Channel</Typography></TableCell>
            <TableCell><Typography variant="subtitle2">Date</Typography></TableCell>
            <TableCell><Typography variant="subtitle2">Done By</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedPayments.map((payment) => (
            <TableRow 
              key={payment._id}
              sx={{ 
                '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
                '&:hover': { backgroundColor: theme.palette.action.selected }
              }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StoreIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  {payment.vendor || "Unknown Vendor"}
                </Box>
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                {formatCurrency(payment.paid_amt)}
              </TableCell>
              <TableCell>
                <Chip 
                  label={payment.pay_channel} 
                  size="small" 
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
              <TableCell>{payment.done_by || "Unknown"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // Loading skeleton
  const renderLoadingSkeleton = () => (
    isMobile ? (
      <>
        {[1, 2, 3].map((item) => (
          <Card key={item} variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Skeleton variant="text" width="50%" height={28} />
                <Skeleton variant="rectangular" width={80} height={24} />
              </Box>
              <Skeleton variant="text" width="30%" height={40} />
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Skeleton variant="text" width="80%" height={24} />
                </Grid>
                <Grid item xs={6}>
                  <Skeleton variant="text" width="80%" height={24} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </>
    ) : (
      <TableContainer component={Paper} elevation={2} sx={{ mt: 3, mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
              <TableCell>Vendor Name</TableCell>
              <TableCell align="right">Amount Paid</TableCell>
              <TableCell>Payment Channel</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Done By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3, 4, 5].map((item) => (
              <TableRow key={item}>
                <TableCell><Skeleton variant="text" /></TableCell>
                <TableCell><Skeleton variant="text" /></TableCell>
                <TableCell><Skeleton variant="text" /></TableCell>
                <TableCell><Skeleton variant="text" /></TableCell>
                <TableCell><Skeleton variant="text" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton 
          onClick={() => navigate(-1)} 
          sx={{ mr: 2 }}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1">
          Payments
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          size={isMobile ? "medium" : "large"}
        >
          Add Payment
        </Button>
      </Box>

      {loading ? (
        renderLoadingSkeleton()
      ) : payments.length > 0 ? (
        <>
          {isMobile ? renderMobileView() : renderDesktopView()}
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              size={isMobile ? "small" : "medium"}
            />
          </Box>
        </>
      ) : (
        <Card variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No payment records found. Add a new payment to get started.
          </Typography>
        </Card>
      )}

      {/* Modal for Adding Payment */}
      <Modal 
        open={open} 
        onClose={() => setOpen(false)}
        aria-labelledby="add-payment-modal"
      >
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "90%" : 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: "90vh",
          overflowY: "auto"
        }}>
          <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
            Add Payment
          </Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel id="vendor-select-label">Select Vendor</InputLabel>
            <Select
              labelId="vendor-select-label"
              name="vendor_name"
              value={formData.vendor_name}
              onChange={handleChange}
              label="Select Vendor"
              startAdornment={
                <InputAdornment position="start">
                  <StoreIcon fontSize="small" />
                </InputAdornment>
              }
            >
              <MenuItem value="">
                <em>Select a vendor</em>
              </MenuItem>
              {vendors.map((vendor) => (
                <MenuItem key={vendor._id} value={vendor.name}>{vendor.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField 
            fullWidth 
            label="Amount Paid" 
            name="paid_amt" 
            type="number" 
            value={formData.paid_amt} 
            onChange={handleChange} 
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
          />

          <TextField 
            fullWidth 
            label="Payment Channel" 
            name="pay_channel" 
            value={formData.pay_channel} 
            onChange={handleChange} 
            margin="normal"
            placeholder="UPI, Bank Transfer, Cash, etc."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PaymentIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField 
            fullWidth 
            type="date" 
            label="Payment Date" 
            name="payment_date" 
            value={formData.payment_date} 
            onChange={handleChange} 
            margin="normal"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField 
            fullWidth 
            label="Done By" 
            name="done_by" 
            value={formData.done_by} 
            onChange={handleChange} 
            margin="normal"
            placeholder="Enter name of person who made the payment"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button 
              variant="outlined" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSubmit}
              disabled={!formData.vendor_name || !formData.paid_amt || !formData.payment_date}
            >
              Add Payment
            </Button>
          </Box>
          
          {(!formData.vendor_name || !formData.paid_amt || !formData.payment_date) && (
            <FormHelperText error sx={{ mt: 2, textAlign: 'right' }}>
              * Vendor, Amount, and Date are required fields
            </FormHelperText>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default PaymentsPage;