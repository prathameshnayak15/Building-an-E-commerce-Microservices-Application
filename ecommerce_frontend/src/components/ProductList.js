import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Container,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { deleteproduct } from "@/helperfunctions/product";

const theme = createTheme();

const ProductList = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getproducts = async () => {
      try {
        const result = await fetch("http://localhost:8002/getproducts", {
          method: "GET",
        });
        if (result.status === 200) {
          const data = await result.json();
          setProducts(data);
        } else {
          console.log("Error in Node JS, Code : ", result.status);
          alert("Could Not Get Products");
          setProducts([]);
        }
      } catch (error) {
        console.log(error);
        alert("Connection Error");
        setProducts([]);
      }
    };

    getproducts();
  }, []);

  const handleDelete = async (_id) => {
    const res = await deleteproduct(_id);
    if (res) {
      setProducts((prevProducts) => {
        return prevProducts.filter((product) => product._id != _id);
      });
    }
  };

  const handleEdit = (product) => {
    // Handle edit logic here
    router.push({
      pathname: "adminaddeditproduct",
      query: {
        isEdit: true,
        _id: product._id,
        pname: product.pname,
        pquantity: product.pquantity,
        pprice: product.pprice,
      },
    });
  };
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setProducts((prevProducts) => {
      return prevProducts.filter((product) =>
        product.pname.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
  };

  // const products =

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ padding: "16px" }}>
        {/* <Typography variant="h6">Product List</Typography> */}
        <TextField
          label="Search Products"
          value={searchText}
          onChange={(e)=>setSearchText(e.target.value.toLowerCase())}
          sx={{ margin: "16px" }}
        />
        <Box
          sx={{
            bgcolor: products.length === 0 ? "#eba1a1" : "#f5f5f5",
            margin: "16px",
            borderRadius: "28px",
          }}
        >
          {products.length === 0 ? (
            <Typography sx={{ padding: "20px" }}>No products found</Typography>
          ) : (
            <List>
              {products.filter((product) =>
        product.pname.toLowerCase().includes(searchText)).map((product) => (
                <ListItem key={product._id}>
                  <ListItemText primary={product.pname} />
                  <ListItemText primary={product.pquantity} />
                  <ListItemText primary={product.pprice} />
                  <IconButton onClick={() => handleDelete(product._id)}>
                    <DeleteIcon sx={{ margin: "5px" }} />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(product)}>
                    <EditIcon sx={{ margin: "5px" }} />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ProductList;
