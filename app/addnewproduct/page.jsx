"use client"
import { useState } from "react"
import axios from "axios";

const page = () => {

    const [product, setProduct] = useState({
        product_name: "",
        brand: "",
        description: "",
        mrp: "",
        price: "",
        rating: "",
        image: "",
        category: "",
        visible: 1,
    });

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async () => {

        if (!product.category) {
            alert("Please select a category");
            return;
        }

        try {
            await axios.post(
                "https://zamart-backend3.onrender.com/api/product",
                product
            );

            alert("Product Added Successfully");

        } catch (err) {
            console.log(err);
            alert("Product add nahi hua");
        }
    };


    return (
        <div>
            <div className="max-w-3xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6">Add Product</h1>

                <div className="grid grid-cols-2 gap-4">

                    <input
                        type="text"
                        name="product_name"
                        placeholder="Product Name"
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="text"
                        name="mrp"
                        placeholder="MRP"
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="text"
                        name="rating"
                        placeholder="Rating"
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    >
                        <option value="">Select Category</option>
                        <option value="Men's">Men's</option>
                        <option value="Women's">Women's</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Footwear">Footwear</option>
                        <option value="Home & Kitchen">Home & Kitchen</option>
                        <option value="Beauty">Beauty</option>
                    </select>

                </div>

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    className="border p-2 rounded w-full mt-4"
                />

                <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded mt-5">
                    Save Product
                </button>
            </div>

        </div>
    )
}

export default page

