import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Divider,
  Grid
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getBills } from "../api"; // API call function

const BillsList = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalBills, setTotalBills] = useState(0); // Total number of bills
  const limit = 10; // Number of bills per page
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Fetch token for API
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setLoading(true);
    getBills(token, page, limit)
      .then((response) => {
        setBills(response.data.bills); // Assuming the API returns { bills: [], total: num }
        setTotalBills(response.data.total); // Store total count
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bills:", error);
        setLoading(false);
      });
  }, [token, page]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const totalPages = Math.ceil(totalBills / limit);

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Format time function
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Box sx={{ 
      maxWidth: { xs: '100%', md: 1000 }, 
      margin: "auto", 
      padding: { xs: 2, md: 3 }
    }}>
      {/* Header with back button */}
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton 
          onClick={() => navigate(-1)} 
          sx={{ mr: 1 }}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          Bills List
        </Typography>
      </Box>

      {/* Desktop view - Table */}
      {!isMobile && (
        <TableContainer component={Paper} sx={{ mb: 3, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.action.hover }}>
                <TableCell>Vendor Name</TableCell>
                <TableCell>Bill Date</TableCell>
                <TableCell>Recorded Time</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Added By</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill._id} hover>
                  <TableCell>{bill.vendor?.name || "Unknown"}</TableCell>
                  <TableCell>{formatDate(bill.bill_date)}</TableCell>
                  <TableCell>{formatDateTime(bill.bill_record_ts)}</TableCell>
                  <TableCell>${bill.bill_amt}</TableCell>
                  <TableCell>{bill.added_by?.name || "Unknown"}</TableCell>
                  <TableCell align="center">
                    <Button 
                      variant="contained" 
                      size="small"
                      startIcon={<VisibilityIcon />} 
                      onClick={() => navigate(`/bill/${bill._id}`)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Mobile view - Cards */}
      {isMobile && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {bills.map((bill) => (
            <Grid item xs={12} key={bill._id}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {bill.vendor?.name || "Unknown"}
                  </Typography>
                  
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Date:
                      </Typography>
                      <Typography variant="body1">
                        {formatDate(bill.bill_date)}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Amount:
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        ${bill.bill_amt}
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  <Divider sx={{ my: 1.5 }} />
                  
                  <Grid container spacing={1}>
                    <Grid item xs={8}>
                      <Typography variant="body2" color="text.secondary">
                        Added by:
                      </Typography>
                      <Typography variant="body2">
                        {bill.added_by?.name || "Unknown"}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Button 
                        variant="contained" 
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => navigate(`/bill/${bill._id}`)}
                      >
                        View
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination Controls */}
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{ 
          p: 2, 
          backgroundColor: theme.palette.background.paper,
          borderRadius: 1,
          boxShadow: 1
        }}
      >
        <Button 
          variant="outlined" 
          disabled={page === 1} 
          onClick={() => setPage(page - 1)}
          startIcon={<ArrowBackIcon />}
          size={isMobile ? "small" : "medium"}
        >
          Previous
        </Button>
        <Typography variant="body2">
          Page {page} of {totalPages} ({totalBills} bills)
        </Typography>
        <Button 
          variant="outlined" 
          disabled={page >= totalPages} 
          onClick={() => setPage(page + 1)}
          endIcon={<ArrowBackIcon sx={{ transform: 'rotate(180deg)' }} />}
          size={isMobile ? "small" : "medium"}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default BillsList;