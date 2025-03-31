
    // import React, { useEffect, useState } from "react";
    // import { getProducts } from "../api";
    // import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
    // import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

    // const ProductList = () => {
    //     const [products, setProducts] = useState([]);
    //     const [currentPage, setCurrentPage] = useState(1);
    //     const productsPerPage = 10;

    //     useEffect(() => {
    //         const token = localStorage.getItem("token");
    //         if (!token) {
    //             alert("Unauthorized! Please login.");
    //             return;
    //         }

    //         getProducts(token)
    //             .then((response) => setProducts(response.data.products))
    //             .catch((error) => console.error("Error fetching products:", error));
    //     }, []);

    //     // Get current products for the page
    //     const indexOfLastProduct = currentPage * productsPerPage;
    //     const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    //     // console.log("product list", products);
    //     const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    //     // Bar chart data
    //     const chartData = currentProducts.map((product) => ({
    //         name: product.prd_name,
    //         quantity: product.quant,
    //     }));

    //     return (
    //         <div>
    //             <h2>Product List</h2>
    //             <TableContainer component={Paper}>
    //                 <Table>
    //                     <TableHead>
    //                         <TableRow>
    //                             <TableCell>Name</TableCell>
    //                             <TableCell>Price</TableCell>
    //                             <TableCell>Quantity</TableCell>
    //                         </TableRow>
    //                     </TableHead>
    //                     <TableBody>
    //                         {currentProducts.map((product) => (
    //                             <TableRow key={product.id}>
    //                                 <TableCell>{product.prd_name}</TableCell>
    //                                 <TableCell>{product.price}</TableCell>
    //                                 <TableCell>{product.quant}</TableCell>
    //                             </TableRow>
    //                         ))}
    //                     </TableBody>
    //                 </Table>
    //             </TableContainer>

    //             {/* Pagination Buttons */}
    //             <div style={{ marginTop: "10px" }}>
    //                 <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
    //                     Previous
    //                 </Button>
    //                 <Button disabled={indexOfLastProduct >= products.length} onClick={() => setCurrentPage(currentPage + 1)}>
    //                     Next
    //                 </Button>
    //             </div>

    //             {/* Bar Chart for current page's products */}
    //             <h2>Inventory Overview</h2>
    //             <ResponsiveContainer width="100%" height={300}>
    //                 <BarChart data={chartData}>
    //                     <XAxis dataKey="name" />
    //                     <YAxis />
    //                     <Tooltip />
    //                     <Bar dataKey="quantity" fill="#8884d8" />
    //                 </BarChart>
    //             </ResponsiveContainer>
    //         </div>
    //     );
    // };

    // export default ProductList;




    import React, { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { getProducts } from "../api";
    import {
      Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button
    } from "@mui/material";
    import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
    
    const ProductList = () => {
      const [products, setProducts] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const productsPerPage = 10;
      const navigate = useNavigate();
    
      useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Unauthorized! Please login.");
          return;
        }
    
        getProducts(token)
          .then((response) => setProducts(response.data.products))
          .catch((error) => console.error("Error fetching products:", error));

        
      }, []);
      
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    
      const chartData = currentProducts.map((product) => ({
        name: `${product.prd_name} ${product.mfg}`,
        quantity: product.quant,
      }));
    
      return (
        <div>
          <h2>Product List</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Pack</TableCell>
                  <TableCell>Manufacture</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentProducts.map((product) => (
                  <TableRow
                    key={product.id || product.prd_name}
                    hover
                    onClick={() => navigate(`/product/${product.prd_name}/${product.pack}/${product.mfg}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{product.prd_name}</TableCell>
                    <TableCell>{product.pack}</TableCell>
                    <TableCell>{product.mfg}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.quant}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    
          {/* Pagination */}
          <div style={{ marginTop: "10px" }}>
            <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </Button>
            <Button disabled={indexOfLastProduct >= products.length} onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </Button>
          </div>
    
          {/* Bar Chart */}
          <h2>Inventory Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    };
    
    export default ProductList;
    