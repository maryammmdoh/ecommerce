"use server";

export async function forgotPassword(email: string) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    const payload = await res.json();
    return payload;
  } catch (err) {
    return err;
  }
}
