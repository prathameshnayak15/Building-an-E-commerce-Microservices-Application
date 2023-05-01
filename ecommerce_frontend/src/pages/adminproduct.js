import ProductList from "@/components/ProductList";
import { Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function adminproduct() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(router.query.email);
  }, [router.query]);

  return (
    <>
      <Typography variant="h2" sx={{ padding: "16px" }}>
        Admin Home Page
      </Typography>
      <ProductList />
      <Box sx={{ textAlign: "right" }}>
        <Button
          startIcon={<AddIcon />}
          type="add"
          variant="contained"
          color="success"
          sx={{ mt: 3, mb: 2, marginRight: "100px" }}
          onClick={() => {
            router.push({
              pathname: "adminaddeditproduct",
              query: {
                email,
              },
            });
          }}
        >
          Add Item
        </Button>
      </Box>
    </>
  );
}
