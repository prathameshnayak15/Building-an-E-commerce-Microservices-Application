export const cancelorder = async (email, _id) => {
  try {
    const result = await fetch("http://localhost:8004/cancelorder", {
      method: "PATCH",
      body: JSON.stringify({ email, _id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      return true;
    } else {
      console.log("Error in Node JS, Code : ", result.status);
      alert("Sorry, Could Not Cancel Order");
      return false;
    }
  } catch (error) {
    alert("Connection Error");
    return false;
  }
};

export const placeorder = async (order) => {
  try {
    console.log("Sending place order request")
    const result = await fetch("http://localhost:8004/placeorder", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      return true;
    } else {
      console.log("Error in Node JS, Code : ", result.status);
      alert("Sorry, Could Not Place Order");
      return false;
    }
  } catch (error) {
    alert("Connection Error");
    return false;
  }
};
