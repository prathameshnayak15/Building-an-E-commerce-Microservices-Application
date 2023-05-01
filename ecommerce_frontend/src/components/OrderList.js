import React, { useEffect, useState } from "react";
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
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { cancelorder } from "@/helperfunctions/order";

const theme = createTheme();

const OrderList = ({ products: ordersList, email: email }) => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(ordersList);
  }, [ordersList]);

  const handleCancelOrder = async (_id) => {
    const res = await cancelorder(email, _id);
    if (res) {
      setOrders((prevOrders) => {
        return prevOrders.map((order) => {
          const temp = { ...order };
          if (temp["_id"] == _id) {
            temp["ostatus"] = "Cancelled";
          }
          return temp;
        });
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ padding: "16px" }}>
        {/* <Typography variant="h6">Product List</Typography> */}
        <Box
          sx={{
            bgcolor: orders.length === 0 ? "#eba1a1" : "#f5f5f5",
            margin: "16px",
            borderRadius: "28px",
          }}
        >
          {orders.length === 0 ? (
            <Typography sx={{ padding: "20px" }}>No orders found</Typography>
          ) : (
            <List>
              {orders.map((order) => (
                <ListItem key={order._id}>
                  <ListItemText primary={order._id} />
                  <ListItemText secondary={"Time : " + order.otime} />
                  <ListItemText secondary={"Total : " + order.ototal} />
                  <ListItemText secondary={"Status : " + order.ostatus} />

                  <IconButton onClick={() => handleCancelOrder(order._id)}>
                    <RemoveCircleOutlineIcon sx={{ margin: "5px" }} />
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

export default OrderList;
