export const addproduct = async (product) => {
  try {
    const result = await fetch("http://localhost:8002/addproduct", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      return true;
    } else {
      console.log("Error in Node JS, Code : ", result.status);
      alert("Authentication Failed");
      return false;
    }
  } catch (error) {
    alert("Connection Error");
    return false;
  }
};

export const editproduct = async (product) => {
  try {
    const result = await fetch("http://localhost:8002/editproduct", {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      return true;
    } else {
      console.log("Error in Node JS, Code : ", result.status);
      alert("Authentication Failed");
      return false;
    }
  } catch (error) {
    alert("Connection Error");
    return false;
  }
};

export const deleteproduct = async (_id) => {
  try {
    const result = await fetch(`http://localhost:8002/deleteproduct/${_id}`, {
      method: "DELETE",
    });
    if (result.status === 200) {
      return true;
    } else {
      console.log("Error in Node JS, Code : ", result.status);
      alert("Authentication Failed");
      return false;
    }
  } catch (error) {
    alert("Connection Error");
    return false;
  }
};
