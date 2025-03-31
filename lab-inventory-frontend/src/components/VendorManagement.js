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
  Modal, 
  Box, 
  TextField,
  Typography,
  IconButton,
  Container,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  useTheme
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { addVendor, getVendors } from "../api";

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [isVendorModalOpen, setVendorModalOpen] = useState(false);
  const [vendorName, setVendorName] = useState("");
  const [vendorAddress, setVendorAddress] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Fetch all vendors from API
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await getVendors(token);
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, [token]);

  // Open and close modal
  const openVendorModal = () => setVendorModalOpen(true);
  const closeVendorModal = () => setVendorModalOpen(false);

  // Add new vendor
  const handleVendorSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await addVendor(token, vendorName, vendorAddress);
      alert(response.data.message);
      setVendorName("");
      setVendorAddress("");
      closeVendorModal();
      
      // Refresh vendor list after adding new vendor
      const updatedVendors = await getVendors(token);
      setVendors(updatedVendors.data);
    } catch (error) {
      console.error("Error adding vendor:", error);
      alert("Failed to add vendor");
    }
  };

  // Render card view for mobile
  const renderMobileView = () => (
    <Grid container spacing={2}>
      {vendors.map((vendor) => (
        <Grid item xs={12} key={vendor._id}>
          <Card variant="outlined" sx={{ mb: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {vendor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {vendor.address}
              </Typography>
              <Button
                variant="contained"
                size="small"
                startIcon={<AccountBalanceIcon />}
                fullWidth
                onClick={() => navigate(`/ledger/${vendor._id}`)}
              >
                View Ledger
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  // Render table view for desktop
  const renderDesktopView = () => (
    <TableContainer component={Paper} sx={{ mt: 3, mb: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vendor Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor._id}>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>{vendor.address}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AccountBalanceIcon />}
                  onClick={() => navigate(`/ledger/${vendor._id}`)}
                >
                  View Ledger
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Vendor Management
      </Typography>

      {/* Conditional rendering based on screen size */}
      {isMobile ? renderMobileView() : renderDesktopView()}

      {/* Floating Add Button - more compact on mobile */}
      <Box sx={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <IconButton
          color="secondary"
          sx={{ 
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.secondary.dark,
            },
            width: isMobile ? 56 : 64,
            height: isMobile ? 56 : 64
          }}
          onClick={openVendorModal}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Add Vendor Modal */}
      <Modal open={isVendorModalOpen} onClose={closeVendorModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "90%" : 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Add Vendor
          </Typography>
          <TextField
            label="Vendor Name"
            fullWidth
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Vendor Address"
            fullWidth
            value={vendorAddress}
            onChange={(e) => setVendorAddress(e.target.value)}
            margin="normal"
            variant="outlined"
            multiline
            rows={2}
          />
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={closeVendorModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleVendorSubmit}
              disabled={!vendorName.trim() || !vendorAddress.trim()}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default VendorManagement;