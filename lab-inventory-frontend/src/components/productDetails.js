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
} from "@mui/material";
import { getProductDetails } from "../api";

const ProductDetail = () => {
  const { prd_name } = useParams();
  const [product, setProduct] = useState(null);
  const [vendors, setVendors] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails(token, prd_name)
      .then((response) => {
        setProduct(response.data.product);
        setVendors(response.data.vendors);
      })
      .catch((error) => console.error("Error fetching product details:", error));
  }, [prd_name, token]);

  if (!product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
      {/* Back Button */}
      <Button
        onClick={() => navigate(-1)}
        variant="contained"
        sx={{ marginBottom: 2, backgroundColor: "#1976d2", color: "white" }}
      >
        Back
      </Button>

      {/* Product Details Card */}
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, marginBottom: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 1 }}>
          {product.prd_name}
        </Typography>
        <Typography variant="body1">
          <strong>Price:</strong> ₹{product.price}
        </Typography>
        <Typography variant="body1">
          <strong>Quantity:</strong> {product.quant}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          <strong>Description:</strong> {product.description}
        </Typography>
      </Paper>

      {/* Vendor Table */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Vendor Details
      </Typography>
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
    </Box>
  );
};

export default ProductDetail;
