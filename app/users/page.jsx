

"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const Registration = () => {
    const [product, setProduct] = useState([]);
    const [editUser, setEditUser] = useState(null);

    // GET USERS
    const getUsers = () => {
        axios
            .get("https://zamart-backend3.onrender.com/api/users")
            .then((res) => {
                setProduct(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getUsers();
    }, []);

    // DELETE USER
    const deleteUser = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const res = await axios.delete(
                `https://zamart-backend3.onrender.com/api/users/${id}`
            );

            console.log("DELETE RESPONSE:", res.data);

            alert("User deleted successfully");

            // List refresh
            getUsers();

        } catch (err) {
            console.log(
                "DELETE ERROR:",
                err.response?.data || err.message
            );

            alert("Delete failed");
        }
    };

    // EDIT BUTTON
    const handleEdit = (user) => {
        setEditUser({ ...user });
    };

    // INPUT CHANGE
    const handleChange = (e) => {
        setEditUser({
            ...editUser,
            [e.target.name]: e.target.value,
        });
    };

    // UPDATE USER
    const updateUser = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(
                `https://zamart-backend3.onrender.com/api/users/${editUser.id}`,
                {
                    name: editUser.name,
                    email: editUser.email,
                    password: editUser.password,
                    mobile: editUser.mobile,
                    address: editUser.address,
                    city: editUser.city,
                    state: editUser.state,
                    pincode: editUser.pincode,
                }
            );

            console.log("UPDATE RESPONSE:", res.data);

            alert("User updated successfully");

            setEditUser(null);
            getUsers();

        } catch (err) {
            console.log("UPDATE ERROR:", err.response?.data || err.message);

            alert(
                err.response?.data?.message ||
                "Update failed"
            );
        }
    };
    return (
        <div>

            {/* EDIT FORM */}
            {editUser && (
                <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">

                    <div className="mb-5 flex items-center justify-between">

                        <h2 className="text-xl font-bold">
                            Edit User
                        </h2>

                        <button
                            onClick={() => setEditUser(null)}
                            className="text-xl text-red-500"
                        >
                            ✕
                        </button>

                    </div>

                    <form
                        onSubmit={updateUser}
                        className="grid grid-cols-1 gap-4 md:grid-cols-2"
                    >

                        <input
                            type="text"
                            name="name"
                            value={editUser.name || ""}
                            onChange={handleChange}
                            placeholder="Name"
                            className="rounded-lg border p-3 outline-none focus:border-blue-500"
                        />

                        <input
                            type="email"
                            name="email"
                            value={editUser.email || ""}
                            onChange={handleChange}
                            placeholder="Email"
                            className="rounded-lg border p-3 outline-none focus:border-blue-500"
                        />

                        <input
                            type="text"
                            name="mobile"
                            value={editUser.mobile || ""}
                            onChange={handleChange}
                            placeholder="Mobile"
                            className="rounded-lg border p-3 outline-none focus:border-blue-500"
                        />

                        <input
                            type="text"
                            name="password"
                            value={editUser.password || ""}
                            onChange={handleChange}
                            placeholder="Password"
                            className="rounded-lg border p-3"
                        />

                        <input
                            type="text"
                            name="address"
                            value={editUser.address || ""}
                            onChange={handleChange}
                            placeholder="Address"
                            className="rounded-lg border p-3 outline-none focus:border-blue-500"
                        />

                        <input
                            type="text"
                            name="city"
                            value={editUser.city || ""}
                            onChange={handleChange}
                            placeholder="City"
                            className="rounded-lg border p-3 outline-none focus:border-blue-500"
                        />

                        <input
                            type="text"
                            name="state"
                            value={editUser.state || ""}
                            onChange={handleChange}
                            placeholder="State"
                            className="rounded-lg border p-3 outline-none focus:border-blue-500"
                        />

                        <input
                            type="text"
                            name="pincode"
                            value={editUser.pincode || ""}
                            onChange={handleChange}
                            placeholder="Pincode"
                            className="rounded-lg border p-3 outline-none focus:border-blue-500"
                        />

                        <div className="flex gap-3 md:col-span-2">

                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                            >
                                Update User
                            </button>

                            <button
                                type="button"
                                onClick={() => setEditUser(null)}
                                className="rounded-lg border px-6 py-3"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>
                </div>
            )}

            {/* USERS TABLE */}
            <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">

                <table className="w-full min-w-[1100px] text-left text-sm text-gray-600">

                    <thead className="bg-gray-50 text-xs uppercase text-gray-600">

                        <tr className="bg-blue-500">
                            <th className="px-6 py-4 font-semibold">ID</th>
                            <th className="px-6 py-4 font-semibold">Name</th>
                            <th className="px-6 py-4 font-semibold">Email</th>
                            <th className="px-6 py-4 font-semibold">Password</th>
                            <th className="px-6 py-4 font-semibold">Mobile</th>
                            <th className="px-6 py-4 font-semibold">Address</th>
                            <th className="px-6 py-4 font-semibold">City</th>
                            <th className="px-6 py-4 font-semibold">State</th>
                            <th className="px-6 py-4 font-semibold">Pincode</th>
                            <th className="px-6 py-4 font-semibold">Action</th>
                        </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {product.map((post) => (

                            <tr
                                key={post.id}
                                className="transition hover:bg-gray-50"
                            >

                                <td className="px-6 py-4 font-medium text-gray-900">
                                    #{post.id}
                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                            {post.name?.charAt(0).toUpperCase()}
                                        </div>

                                        <span className="font-medium text-gray-900">
                                            {post.name}
                                        </span>

                                    </div>

                                </td>

                                <td className="px-6 py-4">
                                    {post.email}
                                </td>

                                <td className="px-6 py-4">
                                    <span className="text-gray-400">
                                        ********
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    {post.mobile}
                                </td>

                                <td className="max-w-[200px] truncate px-6 py-4">
                                    {post.address}
                                </td>

                                <td className="px-6 py-4">
                                    {post.city}
                                </td>

                                <td className="px-6 py-4">
                                    {post.state}
                                </td>

                                <td className="px-6 py-4">
                                    {post.pincode}
                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex gap-2">

                                        {/* EDIT */}
                                        <button
                                            onClick={() => handleEdit(post)}
                                            className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
                                        >
                                            Edit
                                        </button>

                                        {/* DELETE */}
                                        <button
                                            onClick={() => deleteUser(post.id)}
                                            className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Registration;