const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Register User
export const registerUser = async (formData) => {
  const { username, email, no_hp, password } = formData;
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        no_hp,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      let validationErrors = {};

      if (data.errors && Array.isArray(data.errors)) {
        data.errors.forEach((err) => {
          const fieldName = err.path.replace("body.", "");

          validationErrors[fieldName] = err.message;
        });
      } else {
        validationErrors = data.errors || null;
      }

      return {
        success: false,
        error: data.message,
        errors: validationErrors,
      };
    }

    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error di registerUser:", error);
    return { success: false, errors: "Tidak bisa terhubung ke server." };
  }
};

// Login User
export const loginUser = async (email, no_hp, password) => {
  try {
    const payload = { password };
    if (email) payload.email = email;
    if (no_hp) payload.no_hp = no_hp;

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      let validationErrors = {};

      if (data.errors && Array.isArray(data.errors)) {
        data.errors.forEach((err) => {
          const fieldName = err.path.replace("body.", "");

          validationErrors[fieldName] = err.message;
        });
      } else {
        validationErrors = data.errors || null;
      }

      return { success: false, error: data.message, errors: validationErrors };
    }

    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error di loginUser:", error);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};
