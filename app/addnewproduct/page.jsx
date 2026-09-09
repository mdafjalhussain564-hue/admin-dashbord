
// "use client";

// import { useState } from "react";
// import axios from "axios";
// import Link from "next/link";

// const Page = () => {

//     const [product, setProduct] = useState({
//         product_name: "",
//         brand: "",
//         description: "",
//         mrp: "",
//         price: "",
//         rating: "",
//         image: null,
//         category: "",
//         visible: 1,
//     });

//     const handleChange = (e) => {
//         setProduct({
//             ...product,
//             [e.target.name]: e.target.value,
//         });
//     };

//     // Image file select
//     const handleImageChange = (e) => {
//         setProduct({
//             ...product,
//             image: e.target.files[0],
//         });
//     };

//     const handleSubmit = async () => {

//         if (!product.category) {
//             alert("Please select a category");
//             return;
//         }

//         if (!product.image) {
//             alert("Please select an image");
//             return;
//         }

//         try {

//             const formData = new FormData();

//             formData.append("product_name", product.product_name);
//             formData.append("brand", product.brand);
//             formData.append("description", product.description);
//             formData.append("mrp", product.mrp);
//             formData.append("price", product.price);
//             formData.append("rating", product.rating);
//             formData.append("category", product.category);
//             formData.append("visible", product.visible);

//             // Actual image file
//             formData.append("image", product.image);

//             await axios.post(
//                 "https://zamart-backend3.onrender.com/api/product",
//                 formData
//             );

//             alert("Product Added Successfully");

//             // Form reset
//             setProduct({
//                 product_name: "",
//                 brand: "",
//                 description: "",
//                 mrp: "",
//                 price: "",
//                 rating: "",
//                 image: null,
//                 category: "",
//                 visible: 1,
//             });

//         } catch (err) {
//             console.log(err);
//             alert("Product add nahi hua");
//         }
//     };

//     return (
//         <div>
//             <div className="max-w-3xl mx-auto p-8">

//                 <h1 className="text-3xl font-bold mb-6">
//                     Add Product
//                 </h1>

//                 <div className="grid grid-cols-2 gap-4">

//                     <input
//                         type="text"
//                         name="product_name"
//                         placeholder="Product Name"
//                         value={product.product_name}
//                         onChange={handleChange}
//                         className="border p-2 rounded"
//                     />

//                     <input
//                         type="text"
//                         name="brand"
//                         placeholder="Brand"
//                         value={product.brand}
//                         onChange={handleChange}
//                         className="border p-2 rounded"
//                     />

//                     <input
//                         type="text"
//                         name="mrp"
//                         placeholder="MRP"
//                         value={product.mrp}
//                         onChange={handleChange}
//                         className="border p-2 rounded"
//                     />

//                     <input
//                         type="text"
//                         name="price"
//                         placeholder="Price"
//                         value={product.price}
//                         onChange={handleChange}
//                         className="border p-2 rounded"
//                     />

//                     <input
//                         type="text"
//                         name="rating"
//                         placeholder="Rating"
//                         value={product.rating}
//                         onChange={handleChange}
//                         className="border p-2 rounded"
//                     />

//                     {/* IMAGE FILE */}
//                     <input
//                         type="file"
//                         name="image"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="border p-2 rounded"
//                     />

//                     <select
//                         name="category"
//                         value={product.category}
//                         onChange={handleChange}
//                         required
//                         className="border p-2 rounded"
//                     >
//                         <option value="">Select Category</option>
//                         <option value="Men's">Men's</option>
//                         <option value="Women's">Women's</option>
//                         <option value="Electronics">Electronics</option>
//                         <option value="Footwear">Footwear</option>
//                         <option value="Home & Kitchen">
//                             Home & Kitchen
//                         </option>
//                         <option value="Beauty">Beauty</option>
//                     </select>

//                 </div>

//                 <textarea
//                     name="description"
//                     placeholder="Description"
//                     value={product.description}
//                     onChange={handleChange}
//                     className="border p-2 rounded w-full mt-4"
//                 />

//                 <button
//                     onClick={handleSubmit}
//                     className="bg-blue-600 text-white px-6 py-2 rounded mt-5"
//                 >
//                     Save Product
//                 </button>


//                 <Link href="/"><button className="bg-black ml-3 text-white px-6 py-2 rounded mt-5">back to home</button></Link>

//             </div>
//         </div>
//     );
// };

// export default Page;





"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

const Page = () => {
    const [product, setProduct] = useState({
        product_name: "",
        brand: "",
        description: "",
        mrp: "",
        price: "",
        rating: "",
        image: null,
        category: "",
        visible: 1,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduct({
            ...product,
            [name]: value,
        });

        // Field type karte hi uski error remove
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // Image file select
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        setProduct({
            ...product,
            image: file || null,
        });

        setErrors((prev) => ({
            ...prev,
            image: "",
        }));
    };

    // VALIDATION
    const validateForm = () => {
        const newErrors = {};

        if (!product.product_name.trim()) {
            newErrors.product_name = "Product name is required";
        }

        if (!product.brand.trim()) {
            newErrors.brand = "Brand is required";
        }

        if (!product.mrp.trim()) {
            newErrors.mrp = "MRP is required";
        } else if (Number(product.mrp) <= 0) {
            newErrors.mrp = "MRP must be greater than 0";
        }

        if (!product.price.trim()) {
            newErrors.price = "Price is required";
        } else if (Number(product.price) <= 0) {
            newErrors.price = "Price must be greater than 0";
        }

        if (!product.rating.trim()) {
            newErrors.rating = "Rating is required";
        } else if (
            Number(product.rating) < 0 ||
            Number(product.rating) > 5
        ) {
            newErrors.rating = "Rating must be between 0 and 5";
        }

        if (!product.image) {
            newErrors.image = "Product image is required";
        }

        if (!product.category) {
            newErrors.category = "Please select a category";
        }

        if (!product.description.trim()) {
            newErrors.description = "Description is required";
        }

        setErrors(newErrors);

        // Agar error hai to false
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!validateForm()) {
            return;
        }

        try {
            const formData = new FormData();

            formData.append(
                "product_name",
                product.product_name
            );

            formData.append(
                "brand",
                product.brand
            );

            formData.append(
                "description",
                product.description
            );

            formData.append(
                "mrp",
                product.mrp
            );

            formData.append(
                "price",
                product.price
            );

            formData.append(
                "rating",
                product.rating
            );

            formData.append(
                "category",
                product.category
            );

            formData.append(
                "visible",
                product.visible
            );

            // Actual image file
            formData.append(
                "image",
                product.image
            );

            await axios.post(
                "https://zamart-backend3.onrender.com/api/product",
                formData
            );

            alert("Product Added Successfully");

            // Form reset
            setProduct({
                product_name: "",
                brand: "",
                description: "",
                mrp: "",
                price: "",
                rating: "",
                image: null,
                category: "",
                visible: 1,
            });

            setErrors({});

        } catch (err) {
            console.log(err);

            setErrors({
                submit:
                    err.response?.data?.message ||
                    "Product add nahi hua",
            });
        }
    };

    return (
        <div className="w-full">
            <div className="mx-auto w-full max-w-3xl p-4 sm:p-6 md:p-8">

                {/* TITLE */}
                <h1 className="mb-6 text-2xl font-bold text-gray-800 sm:text-3xl">
                    Add Product
                </h1>

                <form onSubmit={handleSubmit}>

                    {/* INPUT GRID */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {/* PRODUCT NAME */}
                        <div>
                            <input
                                type="text"
                                name="product_name"
                                placeholder="Product Name"
                                value={product.product_name}
                                onChange={handleChange}
                                className={`w-full rounded-lg border p-3 outline-none ${
                                    errors.product_name
                                        ? "border-red-500"
                                        : "border-gray-300 focus:border-blue-500"
                                }`}
                            />

                            {errors.product_name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.product_name}
                                </p>
                            )}
                        </div>

                        {/* BRAND */}
                        <div>
                            <input
                                type="text"
                                name="brand"
                                placeholder="Brand"
                                value={product.brand}
                                onChange={handleChange}
                                className={`w-full rounded-lg border p-3 outline-none ${
                                    errors.brand
                                        ? "border-red-500"
                                        : "border-gray-300 focus:border-blue-500"
                                }`}
                            />

                            {errors.brand && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.brand}
                                </p>
                            )}
                        </div>

                        {/* MRP */}
                        <div>
                            <input
                                type="number"
                                name="mrp"
                                placeholder="MRP"
                                value={product.mrp}
                                onChange={handleChange}
                                min="1"
                                className={`w-full rounded-lg border p-3 outline-none ${
                                    errors.mrp
                                        ? "border-red-500"
                                        : "border-gray-300 focus:border-blue-500"
                                }`}
                            />

                            {errors.mrp && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.mrp}
                                </p>
                            )}
                        </div>

                        {/* PRICE */}
                        <div>
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={product.price}
                                onChange={handleChange}
                                min="1"
                                className={`w-full rounded-lg border p-3 outline-none ${
                                    errors.price
                                        ? "border-red-500"
                                        : "border-gray-300 focus:border-blue-500"
                                }`}
                            />

                            {errors.price && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.price}
                                </p>
                            )}
                        </div>

                        {/* RATING */}
                        <div>
                            <input
                                type="number"
                                name="rating"
                                placeholder="Rating (0 - 5)"
                                value={product.rating}
                                onChange={handleChange}
                                min="0"
                                max="5"
                                step="0.1"
                                className={`w-full rounded-lg border p-3 outline-none ${
                                    errors.rating
                                        ? "border-red-500"
                                        : "border-gray-300 focus:border-blue-500"
                                }`}
                            />

                            {errors.rating && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.rating}
                                </p>
                            )}
                        </div>

                        {/* IMAGE */}
                        <div>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className={`w-full rounded-lg border p-2.5 ${
                                    errors.image
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />

                            {errors.image && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.image}
                                </p>
                            )}

                            {/* SELECTED FILE */}
                            {product.image && (
                                <p className="mt-1 text-xs text-green-600">
                                    ✓ {product.image.name}
                                </p>
                            )}
                        </div>

                        {/* CATEGORY */}
                        <div className="sm:col-span-2">

                            <select
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                className={`w-full rounded-lg border p-3 outline-none ${
                                    errors.category
                                        ? "border-red-500"
                                        : "border-gray-300 focus:border-blue-500"
                                }`}
                            >
                                <option value="">
                                    Select Category
                                </option>

                                <option value="Men's">
                                    Men's
                                </option>

                                <option value="Women's">
                                    Women's
                                </option>

                                <option value="Electronics">
                                    Electronics
                                </option>

                                <option value="Footwear">
                                    Footwear
                                </option>

                                <option value="Home & Kitchen">
                                    Home & Kitchen
                                </option>

                                <option value="Beauty">
                                    Beauty
                                </option>
                            </select>

                            {errors.category && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.category}
                                </p>
                            )}
                        </div>

                    </div>

                    {/* DESCRIPTION */}
                    <div className="mt-4">

                        <textarea
                            name="description"
                            placeholder="Description"
                            value={product.description}
                            onChange={handleChange}
                            rows={5}
                            className={`w-full resize-none rounded-lg border p-3 outline-none ${
                                errors.description
                                    ? "border-red-500"
                                    : "border-gray-300 focus:border-blue-500"
                            }`}
                        />

                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* SUBMIT ERROR */}
                    {errors.submit && (
                        <p className="mt-3 text-sm text-red-500">
                            {errors.submit}
                        </p>
                    )}

                    {/* BUTTONS */}
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 sm:w-auto"
                        >
                            Save Product
                        </button>

                        <Link
                            href="/"
                            className="w-full sm:w-auto"
                        >
                            <button
                                type="button"
                                className="w-full rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800 sm:w-auto"
                            >
                                Back to Home
                            </button>
                        </Link>

                    </div>

                </form>

            </div>
        </div>
    );
};

export default Page;

