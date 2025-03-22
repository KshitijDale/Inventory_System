
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, IconButton, Modal, Box, TextField, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ProductList from "../components/productList";
import { Logout , addVendor, addStock} from "./../api";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        prd_name: "",
        quantity: "",
        comment: "",
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
    const [vendorName, setVendorName] = useState("");
    const [vendorAddress, setVendorAddress] = useState("");
    const openVendorModal = () => {
        setIsVendorModalOpen(true);
    };

    const closeVendorModal = () => {
        setIsVendorModalOpen(false);
    };

    const handleVendorSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await addVendor(token,vendorName, vendorAddress);
            alert(response.data.message);
            setVendorName("");
            setVendorAddress("");
            closeVendorModal();
        } catch (error) {
            console.error("Error adding vendor:", error);
            alert("Failed to add vendor");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await addStock(token,formData)
            alert(response.data.message);
            setOpen(false); // Close Modal
        } catch (error) {
            console.error("Error adding stock transaction:", error);
        }
    };


    const navigate = useNavigate();
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const logout = async () =>{
        toggleSidebar();
        try{
            const token = localStorage.getItem("token");
            Logout(token);
            
            localStorage.removeItem("token");
            navigate('/');
        }
        catch(error){
            console.error("Logout Failed");
        }
    };

    return (
        <div style={styles.container}>
            <IconButton onClick={toggleSidebar} style={styles.menuButton}>
                <MenuIcon />
            </IconButton>
            <Drawer open={isSidebarOpen} onClose={toggleSidebar}>
                <List style={styles.sidebar}>
                    <ListItem button>
                        <ListItemText primary="Product List" />
                    </ListItem>
                    <ListItem button onClick={openVendorModal}>
                        <ListItemText primary="Vendor Management" />
                    </ListItem>
                    <ListItem button component={Link} to="/payments" onClick={toggleSidebar}>
                        <ListItemText primary="Payment and Bills" />
                    </ListItem>
                    <ListItem button onClick={()=>setOpen(true)}>
                        <ListItemText primary="Add a Stock Transaction" />
                    </ListItem>
                    <ListItem button component = {Link} to="/stock-transaction" onClick={toggleSidebar}>
                        <ListItemText primary="Stock Transaction" />
                    </ListItem>
                    <ListItem button component={Link} to="/add-inventory" onClick={toggleSidebar}>
                        <ListItemText primary="Add to Inventory" />
                    </ListItem>
                    <ListItem button onClick={logout} style={{ color: "red" }}>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Drawer>
            <div style={styles.content}>
                <h1>Welcome to Inventory Management</h1>
                <ProductList />
            </div>

            {/* Vendor Modal */}
            <Modal open={isVendorModalOpen} onClose={closeVendorModal}>
                <Box style={styles.modalBox}>
                    <h2>Add Vendor</h2>
                    <TextField 
                        label="Vendor Name" 
                        variant="outlined" 
                        fullWidth 
                        value={vendorName} 
                        onChange={(e) => setVendorName(e.target.value)} 
                        style={styles.input}
                    />
                    <TextField 
                        label="Vendor Address" 
                        variant="outlined" 
                        fullWidth 
                        value={vendorAddress} 
                        onChange={(e) => setVendorAddress(e.target.value)} 
                        style={styles.input}
                    />
                    <Button variant="contained" color="primary" onClick={handleVendorSubmit} style={styles.button}>
                        Submit
                    </Button>
                </Box>
            </Modal>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "white",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}>
                    <h2>Add Stock Transaction</h2>
                    <TextField
                        fullWidth
                        label="Product Name"
                        name="prd_name"
                        value={formData.prd_name}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Quantity"
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
    },
    menuButton: {
        position: "absolute",
        top: 20,
        left: 20,
    },
    sidebar: {
        width: 250,
    },
    content: {
        marginLeft: 260,
        padding: 20,
        width: "100%",
    },
    modalBox: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    },
    input: {
        marginBottom: "15px",
    },
    button: {
        marginTop: "10px",
    },
};

export default Dashboard;
