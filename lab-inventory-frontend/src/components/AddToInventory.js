import { useState } from "react";
import { TextField, Button, Stack, Card, CardContent, Typography, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { addInventory } from "../api"; // Import API function

const AddToInventory = ({ token }) => {
    const [vendorName, setVendorName] = useState("");
    const [billDate, setBillDate] = useState("");
    const [billAmount, setBillAmount] = useState("");
    const [productDetails, setProductDetails] = useState([{ product_name: "", quantity: 0, price: 0 }]);

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...productDetails];
        updatedProducts[index][field] = value;
        setProductDetails(updatedProducts);
    };

    const addProductField = () => {
        setProductDetails([...productDetails, { product_name: "", quantity: 0, price: 0 }]);
    };

    const removeProductField = (index) => {
        setProductDetails(productDetails.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { vendor_name: vendorName, bill_date: billDate, bill_amount: billAmount, product_details: productDetails };

        try {
            const token = localStorage.getItem("token");
            // console.log("checking token: ",token);
            if (!token) {

                alert("Unauthorized! Please login.");
                return;
            }
            await addInventory(token, payload);
            alert("Inventory added successfully!");

            // Reset form fields
            setVendorName("");
            setBillDate("");
            setBillAmount("");
            setProductDetails([{ product_name: "", quantity: 0, price: 0 }]);
        } catch (error) {
            alert(error.response?.data?.message || "Error adding inventory");
        }
    };

    return (
        <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 2 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Add to Inventory
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField label="Vendor Name" fullWidth value={vendorName} onChange={(e) => setVendorName(e.target.value)} required />
                        <TextField type="date" label="Bill Date" fullWidth InputLabelProps={{ shrink: true }} value={billDate} onChange={(e) => setBillDate(e.target.value)} required />
                        <TextField type="number" label="Bill Amount" fullWidth value={billAmount} onChange={(e) => setBillAmount(e.target.value)} required />

                        {productDetails.map((product, index) => (
                            <Stack key={index} direction="row" spacing={1} alignItems="center">
                                <TextField label="Product Name" fullWidth value={product.product_name} onChange={(e) => handleProductChange(index, "product_name", e.target.value)} required />
                                <TextField type="number" label="Quantity" fullWidth value={product.quantity} onChange={(e) => handleProductChange(index, "quantity", e.target.value)} required />
                                <TextField type="number" label="Price" fullWidth value={product.price} onChange={(e) => handleProductChange(index, "price", e.target.value)} required />
                                <IconButton onClick={() => removeProductField(index)} color="error">
                                    <Remove />
                                </IconButton>
                                {index === productDetails.length - 1 && (
                                    <IconButton onClick={addProductField} color="primary">
                                        <Add />
                                    </IconButton>
                                )}
                            </Stack>
                        ))}

                        <Button type="submit" variant="contained" color="primary">
                            Add Inventory
                        </Button>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddToInventory;
