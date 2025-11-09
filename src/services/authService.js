const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Register User
export const registerUser = async (formData) => {
  const { username, email, password } = formData;
  try {
    if (!API_URL) {
      throw new Error("API_URL belum dikonfigurasi di .env.local");
    }

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || "Registrasi gagal." };
    }

    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error di registerUser:", error);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};

// Login User
export const loginUser = async (email, password) => {
  try {
    if (!API_URL) {
      throw new Error("API_URL belum dikonfigurasi di .env.local");
    }

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || "Login gagal." };
    }

    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error di loginUser:", error);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};
