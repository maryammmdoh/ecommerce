"use client";
import { userInfo } from "@/types/userInfo.type";
import { useEffect, useState } from "react";
import getMyToken from "@/utilities/getMyToken";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ProfilePage() {
    const [profile, setProfile] = useState<userInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

    // Password change state
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        password: "",
        rePassword: "",
    });
    const [passwordLoading, setPasswordLoading] = useState(false);
    useEffect(() => {
        async function fetchProfile() {
            try {
                const token = await getMyToken();
                if (!token) throw new Error("User not logged in");

                const decoded = jwtDecode<{ id: string }>(token);
                const userId = decoded.id;

                const res = await fetch(
                    `https://ecommerce.routemisr.com/api/v1/users/${userId}`
                );
                if (!res.ok) throw new Error("Failed to fetch profile");

                const data = await res.json();
                setProfile(data);
                setFormData({
                    name: data.data.name || "",
                    email: data.data.email || "",
                    phone: data.data.phone || "",
                });
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError("Error fetching profile");
                } else {
                    setError("Unknown error fetching profile");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    async function handleUpdate() {
        try {
            const token = await getMyToken();
            if (!token) throw new Error("User not logged in");

            const res = await fetch(
                "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
                {
                    method: "PUT",
                    headers: {
                        token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: formData.name, phone: formData.phone }),
                }
            );

            const data = await res.json();

            if (res.ok) {
                toast.success("Profile updated successfully ✅", {
                    position: "top-center",
                });
                setProfile({ data });
                setEditMode(false);
            } else {
                toast.error(data.message || "Failed to update profile ❌", {
                    position: "top-center",
                });
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error("Error updating profile ❌");
            } else {
                toast.error("Unknown error updating profile ❌");
            }
        }
    }

    async function handleChangePassword(e: React.FormEvent) {
        e.preventDefault();
        if (passwordData.password !== passwordData.rePassword) {
            toast.error("Passwords do not match ❌", { position: "top-center" });
            return;
        }
        setPasswordLoading(true);
        try {
            const token = await getMyToken();
            if (!token) throw new Error("User not logged in");

            const res = await fetch(
                "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
                {
                    method: "PUT",
                    headers: {
                        token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        currentPassword: passwordData.currentPassword,
                        password: passwordData.password,
                        rePassword: passwordData.rePassword,
                    }),
                }
            );
            const data = await res.json();
            if (res.ok) {
                toast.success("Password changed successfully ✅", {
                    position: "top-center",
                });
                setShowPasswordForm(false);
                setPasswordData({ currentPassword: "", password: "", rePassword: "" });
            } else {
                toast.error(data.message || "Failed to change password ❌", {
                    position: "top-center",
                });
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error("Error changing password ❌");
            } else {
                toast.error("Unknown error changing password ❌");
            }
        } finally {
            setPasswordLoading(false);
        }
    }

    if (loading)
        return (
            <div className="text-lg text-gray-600 p-6 flex justify-center mt-20 ">
                Loading...
            </div>
        );
    if (error)
        return (
            <div className="text-red-600 bg-red-50 rounded p-6 flex justify-center mt-20 ">
                {error}
            </div>
        );
    if (!profile)
        return (
            <div className="text-gray-500 p-6 flex justify-center mt-24 ">
                No profile data.
            </div>
        );

    return (
        <div className="flex justify-center mt-12">
            <Card className="w-full max-w-md mt-24 shadow-lg">
                <CardHeader>
                    <div className="flex items-center justify-center mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-purple-600 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5.121 17.804A13.937 13.937 0 0112 15c2.486 0 4.807.64 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <CardTitle>User Profile</CardTitle>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Profile Form */}
                    <div className="space-y-4 text-gray-800">
                        {editMode ? (
                            <>
                                <div>
                                    <label className="block text-sm font-medium dark:text-white">Name</label>
                                    <Input
                                        value={formData.name}
                                        className="dark:text-white"
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium dark:text-white">Email</label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        className="dark:text-white"
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium dark:text-white">Phone</label>
                                    <Input
                                        value={formData.phone}
                                        className="dark:text-white"
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center">
                                    <span className="w-24 font-semibold text-gray-600">Name:</span>
                                    <span className="text-gray-900 dark:text-white">{formData.name || "N/A"}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-24 font-semibold text-gray-600">
                                        Email:
                                    </span>
                                    <span className="text-gray-900 dark:text-white">
                                        {formData.email || "N/A"}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-24 font-semibold text-gray-600">
                                        Phone:
                                    </span>
                                    <span className="text-gray-900 dark:text-white">
                                        {formData.phone || "N/A"}
                                    </span>
                                </div>
                            </>
                        )}
                        {/* Change Password Form */}
                        {showPasswordForm && (
                            <form onSubmit={handleChangePassword} className="space-y-3 mt-4 dark:text-white">
                                <div>
                                    <label className="block text-sm font-medium">
                                        Current Password
                                    </label>
                                    <Input
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                currentPassword: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">
                                        New Password
                                    </label>
                                    <Input
                                        type="password"
                                        value={passwordData.password}
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                password: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">
                                        Confirm New Password
                                    </label>
                                    <Input
                                        type="password"
                                        value={passwordData.rePassword}
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                rePassword: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        type="submit"
                                        className="bg-purple-500 text-white hover:bg-purple-600"
                                        disabled={passwordLoading}
                                    >
                                        {passwordLoading ? "Changing..." : "Change Password"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowPasswordForm(false)}
                                        className="text-gray-600"
                                        disabled={passwordLoading}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-2">
                    <div className="flex w-full gap-2">
                        {editMode ? (
                            <>
                                <Button
                                    onClick={handleUpdate}
                                    className="bg-purple-500 text-white hover:bg-purple-600"
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setEditMode(false)}
                                    className="text-gray-600"
                                >
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button
                                className="bg-purple-400 text-white w-full hover:bg-purple-500"
                                onClick={() => setEditMode(true)}
                            >
                                Edit Profile
                            </Button>
                        )}
                    </div>
                    {!showPasswordForm && (
                        <Button
                            variant="outline"
                            className="w-full mt-2"
                            onClick={() => setShowPasswordForm(true)}
                        >
                            Change Password
                        </Button>
                    )}
                </CardFooter>

                
            </Card>
        </div>
    );
}
