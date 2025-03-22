import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/products">Product List</Link></li>
                <li><Link to="/vendors">Vendor Management</Link></li>
                <li><Link to="/billing">Billing & Transactions</Link></li>
                <li><Link to="/inventory">Inventory Summary</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
