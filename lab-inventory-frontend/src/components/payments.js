import React, { useState, useEffect , useCallback} from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, TextField, MenuItem, Select } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // Fetch Payments (GET API)
    const fetchPayments = useCallback(async () => {
        try {
            // console.log(token);
            const response = await getPayments(token);
            setPayments(response.data); // Paginate (25 per page) .slice((page - 1) * 25, page * 25)
        } catch (error) {
            console.error("Error fetching payments:", error);
        }
    },[token]);

    // Fetch Vendors for the Form (Dropdown)
    const fetchVendors = useCallback(async () => {
        try {
            const response = await getVendors(token);
            setVendors(response.data);
        } catch (error) {
            console.error("Error fetching vendors:", error);
        }
    },[token]);

    // Handle Form Input Changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Form Submission (POST API)
    const handleSubmit = async () => {
        try {
            await addPayment(token,formData);
            alert("Payment added successfully!");
            setOpen(false);
            fetchPayments(); // Refresh Payments List
        } catch (error) {
            console.error("Error adding payment:", error);
        }
    };

    // Fetch Data on Component Mount
    useEffect(() => {
        fetchPayments();
        fetchVendors();
    }, [fetchPayments,fetchVendors]);

    return (
        <div style={styles.container}>
            <Button onClick={() => navigate(-1)} style={styles.backButton}>
                <ArrowBackIcon /> Back
            </Button>
            <div style={styles.content}>
                <h2>Payments</h2>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                    Add a Payment
                </Button>

                {/* Payments Table */}
                <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Vendor Name</b></TableCell>
                                <TableCell><b>Amount Paid</b></TableCell>
                                <TableCell><b>Payment Channel</b></TableCell>
                                <TableCell><b>Date</b></TableCell>
                                <TableCell><b>Done By</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payments.map((payment) => (
                                <TableRow key={payment._id}>
                                    <TableCell>{payment.vendor || "Unknown Vendor"}</TableCell>
                                    <TableCell>{payment.paid_amt}</TableCell>
                                    <TableCell>{payment.pay_channel}</TableCell>
                                    <TableCell>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
                                    <TableCell>{payment.done_by || "Unknown"}</TableCell>
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

            {/* Modal for Adding Payment */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={styles.modal}>
                    <h2>Add Payment</h2>
                    <Select fullWidth name="vendor_name" value={formData.vendor_name} onChange={handleChange} displayEmpty margin="normal">
                        <MenuItem value="">Select Vendor</MenuItem>
                        {vendors.map((vendor) => (
                            <MenuItem key={vendor._id} value={vendor.name}>{vendor.name}</MenuItem>
                        ))}
                    </Select>
                    <TextField fullWidth label="Amount Paid" name="paid_amt" type="number" value={formData.paid_amt} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Payment Channel" name="pay_channel" value={formData.pay_channel} onChange={handleChange} margin="normal" />
                    <TextField fullWidth type="date" label="Payment Date" name="payment_date" value={formData.payment_date} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Done By" name="done_by" value={formData.done_by} onChange={handleChange} margin="normal" />
                    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

// Styles
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
    modal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "white",
        boxShadow: 24,
        p: 4,
        borderRadius: 2
    }
};

export default PaymentsPage;
