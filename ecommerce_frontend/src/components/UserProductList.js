import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Container,
  Typography,
  Button,
  Box,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { placeorder } from "@/helperfunctions/order";

const theme = createTheme();

const UserProductList = ({ email }) => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({
    total: 0,
  });

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

  const [searchText, setSearchText] = useState("");

  const addTocart = (product) => {
    const tempCart = { ...cart };
    if (tempCart[product._id]) {
      tempCart[product._id] += 1;
    } else {
      tempCart[product._id] = 1;
    }
    tempCart.total += 1;
    setCart(tempCart);
  };

  const removeFromCart = (product) => {
    const tempCart = { ...cart };
    if (tempCart[product._id]) {
      tempCart[product._id] -= 1;
      tempCart.total -= 1;
    }
    setCart(tempCart);
  };

  const placeOrder = async () => {
    let ototal = 0;
    const productDict = products.reduce((dict, product) => {
      dict[product._id] = product.pprice;
      return dict;
    }, {});

    Object.keys(cart).forEach((_id) => {
      if (_id != "total") ototal += cart[_id] * productDict[_id];
    });

    if (ototal > 0) {
      console.log(email);
      const res = await placeorder({ ototal, email });
      if (res)
        router.push({
          pathname: "orderplaced",
          query: {
            email: email,
            totalprice: ototal,
          },
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ padding: "16px" }}>
        <TextField
          label="Search Products"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
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
              {products
                .filter(
                  (product) =>
                    product.pname
                      .toLowerCase()
                      .includes(searchText.toLowerCase()) &&
                    parseInt(product.pquantity) != 0
                )
                .map((product) => (
                  <ListItem key={product._id}>
                    <ListItemText primary={product.pname} />
                    <ListItemText secondary={"price : " + product.pprice} />
                    <ListItemText
                      secondary={
                        cart[product._id] === undefined ? 0 : cart[product._id]
                      }
                    />

                    <IconButton onClick={() => addTocart(product)}>
                      <AddCircleOutlineIcon sx={{ margin: "5px" }} />
                    </IconButton>
                    <IconButton onClick={() => removeFromCart(product)}>
                      <RemoveCircleOutlineIcon sx={{ margin: "5px" }} />
                    </IconButton>
                  </ListItem>
                ))}
            </List>
          )}
        </Box>
        <Box sx={{ textAlign: "right", marginRight: "30px" }}>
          <Button
            variant="contained"
            startIcon={<ShoppingCartCheckoutIcon />}
            onClick={placeOrder}
          >
            Place Order
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserProductList;
