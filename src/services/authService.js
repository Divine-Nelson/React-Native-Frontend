export const fetchUserDetails = async (token) => {
  try {
    const response = await fetch("http://172.20.10.5:8000/api/userDetails/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User details fetched from API:", data);
      return {
        initials: data.initials || "",
        fullName: data.full_name || "",
        email: data.email || "",
      };
    } else {
      console.error("Failed to fetch user details. Status:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

