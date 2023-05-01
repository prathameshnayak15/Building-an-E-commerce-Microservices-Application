import UserProductList from "@/components/UserProductList";
import { Typography, Button, Box } from "@mui/material";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const productList = [
  {
    _id: "01",
    pname: "Santoor",
    pquantity: 300,
    pprice: 100,
  },
  {
    _id: "02",
    pname: "Gandor",
    pquantity: 10,
    pprice: 200,
  },
  {
    _id: "03",
    pname: "Hunter",
    pquantity: 100,
    pprice: 200,
  },
];

const orderList = [
  {
    _id: "01",
    otime: "2023-04-30",
    ototal: 500,
    ostatus: "New",
  },
  {
    _id: "01",
    otime: "2023-04-30",
    ototal: 500,
    ostatus: "New",
  },
  {
    _id: "01",
    otime: "2023-04-30",
    ototal: 500,
    ostatus: "New",
  },
];

export default function userproduct() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (router.query.email) setEmail(router.query.email);
  }, [router.query]);

  return (
    <>
      <Typography variant="h2" sx={{ padding: "16px" }}>
        User Order Page
      </Typography>
      <UserProductList email={email} />
      <Box sx={{ textAlign: "right", marginRight: "93px" }}>
        <Button
          variant="contained"
          onClick={() => {
            router.push({
              pathname: "userorder",
              query: {
                email,
              },
            });
          }}
        >
          Manage Orders
        </Button>
      </Box>
    </>
  );
}
