import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { addproduct, editproduct } from "@/helperfunctions/product";

const theme = createTheme();

export default function adminaddeditproduct() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const [_id, set_id] = useState("");
  const [pname, setPname] = useState("");
  const [pquantity, setPquantity] = useState("");
  const [pprice, setPprice] = useState("");

  useEffect(() => {
    setEmail(router.query.email);
    setIsEdit(router.query.isEdit);
    if (router.query.isEdit) {
      set_id(router.query._id);
      setPname(router.query.pname);
      setPquantity(router.query.pquantity);
      setPprice(router.query.pprice);
    }
  }, [router.query]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      pname,
      pquantity,
      pprice,
    };

    if (isEdit) data["_id"] = _id;
    let res;

    if (isEdit) res = await editproduct(data);
    else res = await addproduct(data);

    if (res) {
      router.push({
        pathname: "adminproduct",
        query: {
          email,
        },
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h2" sx={{ padding: "16px" }}>
        {isEdit ? "Edit Item" : "Add Item"}
      </Typography>
      <Container sx={{ padding: "10px" }}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            bgcolor: "#f5f5f5",
            margin: "16px",
            padding: "18px",
            borderRadius: "28px",
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="pname"
            label="Product Name"
            id="pname"
            autoComplete="pname"
            value={pname}
            onChange={(e) => setPname(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="pquantity"
            label="Product Quantity"
            id="pquantity"
            autoComplete="pquantity"
            value={pquantity}
            onChange={(e) => setPquantity(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="pprice"
            label="Product Price"
            id="pprice"
            autoComplete="pprice"
            value={pprice}
            onChange={(e) => setPprice(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              router.push({
                pathname: "adminproduct",
                query: {
                  email,
                },
              });
            }}
          >
            Cancel
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
