export const signup = async (userData) => {
  try {
    console.log("Sending register request")
    const result = await fetch("http://localhost:8001/register", {
      method: "POST",
      body: JSON.stringify(userData),
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

export const login = async (userData) => {
  try {
    const result = await fetch("http://localhost:8001/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      return true;
    } else {
      alert("Authentication Failed, Wrong Email/Password?");
      return false;
    }
  } catch (error) {
    alert("Connection Error");
    return false;
  }
};
