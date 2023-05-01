import OrderList from "@/components/OrderList";
import { Typography, Box, Button } from "@mui/material";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function userorder() {
  const [orderList, setOrderList] = useState([]);
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getOrders = async (email) => {
      try {
        const result = await fetch("http://localhost:8001/getorders", {
          method: "POST",
          body: JSON.stringify(email),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await result.json();
        if (result.status === 200) {
          console.log("Success:", data);
          setOrderList(data);
        } else {
          console.log("Error in Node JS, Code : ", result.status);
          setOrderList([]);
        }
      } catch (error) {
        console.error("Error:", error);
        setOrderList([]);
      }
    };

    if (router.query.email) {
      setEmail(router.query.email);
      // console.log(router.query.email);
      getOrders({ email: router.query.email });
    }
  }, [router.query]);

  return (
    <>
      <Typography variant="h2" sx={{ padding: "16px" }}>
        User Order Page
      </Typography>
      <OrderList products={orderList} email={email} />
      <Box sx={{ textAlign: "right", marginRight: "92px" }}>
        <Button
          variant="contained"
          startIcon={<FastRewindIcon />}
          onClick={() => {
            router.push({
              pathname: "userproduct",
              query: {
                email: email,
              },
            });
          }}
        >
          Back
        </Button>
      </Box>
    </>
  );
}
