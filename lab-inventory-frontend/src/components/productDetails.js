import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getProductDetails } from "../api";

const ProductDetail = () => {
  const { prd_name, pack, mfg } = useParams();
  const [product, setProduct] = useState(null);
  const [vendors, setVendors] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getProductDetails(token, prd_name, pack, mfg)
      .then((response) => {
        setProduct(response.data.product);
        setVendors(response.data.vendors);
      })
      .catch((error) => console.error("Error fetching product details:", error));
  }, [prd_name, pack, mfg, token]);

  if (!product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Render vendor details based on device
  const renderVendorDetails = () => {
    if (isMobile) {
      // Card-based layout for mobile
      return vendors.length > 0 ? (
        <Grid container spacing={2}>
          {vendors.map((vendor, index) => (
            <Grid item xs={12} key={index}>
              <Card elevation={2} sx={{ borderRadius: 2, mb: 1 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {vendor.vendor.name}
                  </Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      <strong>Price:</strong> ₹{vendor.latest_price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Date:</strong> {new Date(vendor.latest_date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
          <Typography align="center">No vendor details available</Typography>
        </Paper>
      );
    } else {
      // Table layout for desktop/laptop
      return (
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Vendor</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Latest Price</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Latest Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors.length > 0 ? (
                vendors.map((vendor, index) => (
                  <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                    <TableCell>{vendor.vendor.name}</TableCell>
                    <TableCell>₹{vendor.latest_price}</TableCell>
                    <TableCell>{new Date(vendor.latest_date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No vendor details available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  };

  return (
    <Box sx={{ 
      maxWidth: isMobile ? "100%" : 800, 
      margin: "auto", 
      padding: isMobile ? 2 : 3,
      mt: isMobile ? 2 : 0
    }}>
      {/* Back Button - Icon for mobile, Button for desktop */}
      {isMobile ? (
        <IconButton 
          onClick={() => navigate(-1)} 
          sx={{ mb: 2 }}
          color="primary"
        >
          <ArrowBackIcon />
        </IconButton>
      ) : (
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{ marginBottom: 2, backgroundColor: "#1976d2", color: "white" }}
        >
          Back
        </Button>
      )}

      {/* Product Details Card */}
      <Paper elevation={3} sx={{ padding: isMobile ? 2 : 3, borderRadius: 2, marginBottom: 3 }}>
        <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", marginBottom: 1 }}>
          {product.prd_name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {product.pack} | {product.mfg}
        </Typography>
        <Divider sx={{ my: 1.5 }} />
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Price:</strong> ₹{product.price}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Quantity:</strong> {product.quant}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          <strong>Description:</strong> {product.description}
        </Typography>
      </Paper>

      {/* Vendor Details Section */}
      <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Vendor Details
      </Typography>
      {renderVendorDetails()}
    </Box>
  );
};

export default ProductDetail;