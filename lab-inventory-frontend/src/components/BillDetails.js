// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Typography } from "@mui/material";
// import { getBillDetails } from "../api"; // API function

// const BillDetails = () => {
//   const { bill_id } = useParams();
//   const [billItems, setBillItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     getBillDetails(token, bill_id)
//       .then((response) => {
//         setBillItems(response.data);
//         setLoading(false);
//       })
//       .catch((error) => console.error("Error fetching bill details:", error));
//   }, [token, bill_id]);

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </div>
//     );
//   }

//   return (
//     <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
//       <Button onClick={() => navigate(-1)} variant="contained" style={{ marginBottom: "10px" }}>
//         Back
//       </Button>
//       <Typography variant="h4" gutterBottom>
//         Bill Details
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Product Name</TableCell>
//               <TableCell>Quantity</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Total Price</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {billItems.map((item) => (
//               <TableRow key={item._id}>
//                 <TableCell>{item.product?.prd_name || "Unknown"}</TableCell>
//                 <TableCell>{item.quantity}</TableCell>
//                 <TableCell>{item.price}</TableCell>
//                 <TableCell>{(item.quantity * item.price).toFixed(2)}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default BillDetails;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Divider,
  IconButton
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getBillDetails } from "../api"; // API function

const BillDetails = () => {
  const { bill_id } = useParams();
  const [billItems, setBillItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    getBillDetails(token, bill_id)
      .then((response) => {
        setBillItems(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching bill details:", error));
  }, [token, bill_id]);

  // Calculate total bill amount
  const totalBillAmount = billItems.reduce(
    (sum, item) => sum + item.quantity * item.price, 
    0
  ).toFixed(2);

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Mobile view - Card-based layout
  if (isMobile) {
    return (
      <Box sx={{ px: 2, py: 3, maxWidth: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton 
            onClick={() => navigate(-1)} 
            sx={{ mr: 1 }}
            color="primary"
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h1">
            Bill Details
          </Typography>
        </Box>

        {billItems.map((item) => (
          <Card key={item._id} sx={{ mb: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {item.product?.prd_name || "Unknown"}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Quantity:
                </Typography>
                <Typography variant="body1">{item.quantity}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Price:
                </Typography>
                <Typography variant="body1">${item.price}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2">Total:</Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  ${(item.quantity * item.price).toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}

        <Card sx={{ mt: 3, bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Total Bill Amount:</Typography>
              <Typography variant="h6" fontWeight="bold">${totalBillAmount}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // Desktop view - Table layout with enhancements
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button 
          onClick={() => navigate(-1)} 
          variant="contained" 
          startIcon={<ArrowBackIcon />}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4">Bill Details</Typography>
      </Box>

      <Paper sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Product Name</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Quantity</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Price</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billItems.map((item) => (
                <TableRow key={item._id} hover>
                  <TableCell>{item.product?.prd_name || "Unknown"}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ bgcolor: theme.palette.grey[100] }}>
                <TableCell colSpan={2} />
                <TableCell sx={{ fontWeight: "bold" }}>Total Amount:</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>${totalBillAmount}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default BillDetails;