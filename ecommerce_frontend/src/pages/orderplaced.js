import { Typography, Button, Box } from "@mui/material";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import Shop2Icon from "@mui/icons-material/Shop2";
import { useState, useEffect } from "react";

import { useRouter } from "next/router";

const orderplaced = () => {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState("Loading");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(router.query.email);
    setTotalPrice(router.query.totalprice);
  }, [router.query]);

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", margin: "20px" }}>
        Order Placed Successfully
      </Typography>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Total Price : {totalPrice}
      </Typography>
      <Box sx={{ textAlign: "center" }} p={10}>
        <div className="centered-container">
          <img
            src="https://i.pinimg.com/originals/35/f3/23/35f323bc5b41dc4269001529e3ff1278.gif"
            alt="Internet Connect Madi!"
            width="200px"
          />
        </div>
      </Box>
      <Box sx={{ textAlign: "center" }} p={10}>
        <Button
          variant="contained"
          sx={{ marginRight: "10px" }}
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
        <Button
          variant="contained"
          sx={{ marginLeft: "10px" }}
          startIcon={<Shop2Icon />}
          onClick={() => {
            router.push({
              pathname: "userorder",
              query: {
                email: email,
              },
            });
          }}
        >
          Manage Orders
        </Button>
      </Box>
    </>
  );
};

export default orderplaced;
