
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const AddProduct = () => {
    const [products, setProducts] = useState([]);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        product_name: "",
        description: "",
        mrp: "",
        price: "",
        image: "",
        rating: "",
        brand: "",
        category: "",
        visible: true,
    });

    // GET PRODUCTS
    const getProducts = async () => {
        try {
            const res = await axios.get(
                "https://zamart-backend3.onrender.com/api/getproduct"
            );

            setProducts(res.data.data || []);
        } catch (error) {
            console.log("GET ERROR:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    // EDIT BUTTON
    const handleEdit = (product) => {
        setEditId(product.id);

        setFormData({
            product_name: product.product_name || "",
            description: product.description || "",
            mrp: product.mrp || "",
            price: product.price || "",
            image: product.image || "",
            rating: product.rating || "",
            brand: product.brand || "",
            category: product.category || "",
            visible: product.visible ?? true,
        });
    };

    // INPUT CHANGE
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // UPDATE
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(
                `https://zamart-backend3.onrender.com/api/product/${editId}`,
                formData
            );

            console.log("UPDATE:", res.data);

            alert("Product updated successfully");

            // Modal close
            setEditId(null);

            // Products refresh
            getProducts();

        } catch (error) {
            console.log("UPDATE ERROR:", error);
            console.log("RESPONSE:", error.response?.data);

            alert(
                error.response?.data?.message ||
                "Product update nahi hua"
            );
        }
    };

    // DELETE
    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `https://zamart-backend3.onrender.com/api/product/${id}`
            );

            alert("Product deleted successfully");

            getProducts();

        } catch (error) {
            console.log("DELETE ERROR:", error);
            alert("Product delete nahi hua");
        }
    };

    return (
        <div className="w-full">

            {/* ========================= */}
            {/* PRODUCT TABLE */}
            {/* ========================= */}

            <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">

                <table className="w-full min-w-[1100px] text-left text-sm text-gray-600">

                    <thead className="bg-gray-50 text-xs uppercase">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Product Name</th>
                            <th className="px-6 py-4">Rating</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">MRP</th>
                            <th className="px-6 py-4">% OFF</th>
                            <th className="px-6 py-4">Description</th>
                            <th className="px-6 py-4">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">

                        {products.map((product) => (
                            <tr
                                key={product.id}
                                className="hover:bg-gray-50"
                            >

                                <td className="px-6 py-4 font-medium">
                                    {product.id}
                                </td>

                                <td className="px-6 py-4">
                                    <img
                                        src={product.image}
                                        alt={product.product_name}
                                        className="h-16 w-16 object-contain"
                                    />
                                </td>

                                <td className="px-6 py-4">
                                    {product.product_name}
                                </td>

                                <td className="px-6 py-4">
                                    {product.rating}
                                </td>

                                <td className="px-6 py-4">
                                    {product.price}
                                </td>

                                <td className="px-6 py-4">
                                    {product.mrp}
                                </td>

                                <td className="px-6 py-4">
                                    {product.mrp
                                        ? Math.round(
                                              ((product.mrp -
                                                  product.price) /
                                                  product.mrp) *
                                                  100
                                          )
                                        : 0}
                                    % OFF
                                </td>

                                <td className="px-6 py-4">
                                    {product.description}
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex gap-2">

                                        {/* EDIT */}
                                        <button
                                            onClick={() =>
                                                handleEdit(product)
                                            }
                                            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>

                                        {/* DELETE */}
                                        <button
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
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

            {/* ========================= */}
            {/* EDIT MODAL */}
            {/* ========================= */}

            {editId && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setEditId(null)}
                >

                    {/* MODAL BOX */}
                    <div
                        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* HEADER */}
                        <div className="mb-6 flex items-center justify-between border-b pb-4">

                            <h2 className="text-2xl font-bold text-gray-800">
                                Edit Product
                            </h2>

                            <button
                                type="button"
                                onClick={() => setEditId(null)}
                                className="text-2xl text-gray-500 hover:text-red-500"
                            >
                                ✕
                            </button>

                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={handleUpdate}
                            className="grid grid-cols-1 gap-5 md:grid-cols-2"
                        >

                            {/* Product Name */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    name="product_name"
                                    value={formData.product_name}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Brand */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Brand
                                </label>

                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Category
                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* MRP */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    MRP
                                </label>

                                <input
                                    type="number"
                                    name="mrp"
                                    value={formData.mrp}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Rating
                                </label>

                                <input
                                    type="number"
                                    step="0.1"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Image */}
                            <div className="md:col-span-2">

                                <label className="mb-2 block font-medium">
                                    Image URL
                                </label>

                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
                                />

                                {formData.image && (
                                    <img
                                        src={formData.image}
                                        alt="Product"
                                        className="mt-3 h-24 w-24 rounded-lg object-contain"
                                    />
                                )}

                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">

                                <label className="mb-2 block font-medium">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
                                />

                            </div>

                            {/* Visible */}
                            <div className="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    checked={formData.visible}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            visible: e.target.checked,
                                        })
                                    }
                                    className="h-4 w-4"
                                />

                                <label className="font-medium">
                                    Visible
                                </label>

                            </div>

                            {/* BUTTONS */}
                            <div className="flex justify-end gap-3 md:col-span-2">

                                <button
                                    type="button"
                                    onClick={() => setEditId(null)}
                                    className="rounded-lg bg-gray-500 px-6 py-2 text-white hover:bg-gray-600"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                                >
                                    Update Product
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AddProduct;

