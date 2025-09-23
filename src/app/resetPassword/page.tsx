"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") ?? ""; // ✅ get email from query

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Password reset successful. Redirecting to login...");
        toast.success("✅ Password reset successful. Redirecting to login...", { position: "top-center" });
        // redirect to login page after 2s
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMessage(data.message || "❌ Failed to reset password.");
        toast.error(data.message || "❌ Failed to reset password.", { position: "top-center" });
      }
    } catch {
      setMessage("⚠️ An error occurred. Please try again.");
      toast.error("⚠️ An error occurred. Please try again.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 border rounded-lg shadow bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ✅ show email but disable editing */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <Input id="email" type="email" value={email} disabled />
        </div>

        <div>
          <label htmlFor="newPassword" className="block mb-1 font-medium">
            New Password
          </label>
          <Input
            id="newPassword"
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>

      {message && (
        <div className="mt-4 text-center text-blue-600">{message}</div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
