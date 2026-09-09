
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const API_URL = "https://zamart-backend3.onrender.com";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/getproduct`)
      .then((res) => {
        console.log("PRODUCT DATA:", res.data.data);
        setProducts(res.data.data || []);
      })
      .catch((err) => {
        console.log("PRODUCT ERROR:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#f1f3f8]">

      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[250px] bg-[#191f2d] text-white lg:block">

        {/* Logo */}
        <div className="flex h-[75px] items-center border-b border-gray-700 px-7">

          <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-400">
            ◉
          </div>

          <h1 className="text-lg font-bold">
            Dashboard
          </h1>

        </div>


        {/* Navigation */}
        <div className="px-5 py-7">

          <p className="mb-5 text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
            Navigation
          </p>

          <SidebarItem
            icon="⌂"
            title="Dashboard"
          />

          <Link
            href="/addnewproduct"
            className="block"
          >
            <SidebarItem
              icon="◇"
              title="Add product"
            />
          </Link>

          <Link
            href="/editanddelet"
            className="block"
          >
            <SidebarItem
              icon="▦"
              title="product edit & delete"
            />
          </Link>

          <Link
            href="/users"
            className="block"
          >
            <SidebarItem
              icon="♙"
              title="User"
            />
          </Link>

          <Link
            href="/orders"
            className="block"
          >
            <SidebarItem
              icon="▤"
              title="orders"
            />
          </Link>

        </div>

      </aside>


      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}


      {/* =====================================================
          MOBILE SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-[270px]
          bg-[#191f2d] text-white shadow-2xl
          transition-transform duration-300 ease-in-out
          lg:hidden
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* Mobile Sidebar Header */}
        <div className="flex h-[75px] items-center justify-between border-b border-gray-700 px-5">

          <div className="flex items-center">

            <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-400">
              ◉
            </div>

            <h1 className="text-lg font-bold">
              Dashboard
            </h1>

          </div>


          {/* Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-2xl text-gray-300 hover:bg-[#252d3d] hover:text-white"
            aria-label="Close menu"
          >
            ×
          </button>

        </div>


        {/* Mobile Navigation */}
        <div className="px-5 py-7">

          <p className="mb-5 text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
            Navigation
          </p>


          {/* Dashboard */}
          <div
            onClick={() => setSidebarOpen(false)}
          >
            <SidebarItem
              icon="⌂"
              title="Dashboard"
            />
          </div>


          {/* Add Product */}
          <Link
            href="/addnewproduct"
            onClick={() => setSidebarOpen(false)}
            className="block"
          >
            <SidebarItem
              icon="◇"
              title="Add product"
            />
          </Link>


          {/* Edit Delete */}
          <Link
            href="/editanddelet"
            onClick={() => setSidebarOpen(false)}
            className="block"
          >
            <SidebarItem
              icon="▦"
              title="product edit & delete"
            />
          </Link>


          {/* Users */}
          <Link
            href="/users"
            onClick={() => setSidebarOpen(false)}
            className="block"
          >
            <SidebarItem
              icon="♙"
              title="User"
            />
          </Link>


          {/* Orders */}
          <Link
            href="/orders"
            onClick={() => setSidebarOpen(false)}
            className="block"
          >
            <SidebarItem
              icon="▤"
              title="orders"
            />
          </Link>

        </div>

      </aside>


      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="lg:ml-[250px]">


        {/* =====================================================
            MOBILE TOP BAR
        ====================================================== */}

        <div className="sticky top-0 z-30 flex h-[60px] items-center bg-white px-4 shadow-sm lg:hidden">

          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-[#191f2d] text-xl text-white shadow-sm active:scale-95"
            aria-label="Open menu"
          >
            ☰
          </button>


          <h1 className="ml-3 text-base font-semibold text-gray-700">
            Dashboard
          </h1>

        </div>


        {/* =====================================================
            CONTENT
        ====================================================== */}

        <section className="p-3 sm:p-4 md:p-6">


          {/* =====================================================
              BREADCRUMB
          ====================================================== */}

          <div className="mb-4 sm:mb-5">

            <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
              Product
            </h2>

            <div className="mt-2 text-[11px] text-gray-400 sm:text-xs">

              Home

              <span className="mx-2">
                ›
              </span>

              E-Commerce

              <span className="mx-2">
                ›
              </span>

              Product

            </div>

          </div>


          {/* =====================================================
              MAIN FLEX
          ====================================================== */}

          <div className="flex gap-5">


            {/* =====================================================
                FILTER SIDEBAR
            ====================================================== */}

            <aside className="hidden w-[205px] shrink-0 rounded-md bg-white p-4 shadow-sm xl:block">

              <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-gray-600">

                <span>
                  ⚱
                </span>

                Filter

              </div>


              {/* Price */}
              <FilterSection title="Price">

                <div className="flex">

                  <select className="w-1/2 rounded-l border p-2 text-xs outline-none">
                    <option>
                      Min
                    </option>
                  </select>

                  <div className="flex items-center border-y px-2 text-xs text-gray-400">
                    To
                  </div>

                  <select className="w-1/2 rounded-r border p-2 text-xs outline-none">
                    <option>
                      Max
                    </option>
                  </select>

                </div>

              </FilterSection>


              {/* Size */}
              <FilterSection title="Size - UK/India">

                {[4, 5, 6, 6.5, 7, 8].map((size) => (
                  <Checkbox
                    key={size}
                    label={size}
                  />
                ))}

              </FilterSection>


              {/* Rating */}
              <FilterSection title="Customer Ratings">

                {[
                  "4★ & above",
                  "3★ & above",
                  "2★ & above",
                  "1★ & above",
                ].map((rating) => (
                  <Checkbox
                    key={rating}
                    label={rating}
                  />
                ))}

              </FilterSection>


              <FilterSection title="Discount" />

              <FilterSection title="Type of Shoes" />

              <FilterSection title="Color" />

            </aside>


            {/* =====================================================
                PRODUCTS AREA
            ====================================================== */}

            <div className="min-w-0 flex-1">


              {/* =====================================================
                  TOOLBAR
              ====================================================== */}

              <div className="mb-4 flex flex-col gap-3 rounded-md bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-4">


                {/* Sort */}
                <div className="flex items-center gap-4 text-xs text-gray-500 sm:gap-5">

                  <button className="flex items-center gap-1 whitespace-nowrap">

                    📅 By Date

                    <span>
                      ⌄
                    </span>

                  </button>


                  <button className="flex items-center gap-1 whitespace-nowrap">

                    ▤ By Price

                    <span>
                      ⌄
                    </span>

                  </button>

                </div>


                {/* View Mode */}
                <div className="flex items-center justify-between gap-2 text-xs text-gray-500 sm:justify-end">

                  <span>
                    View Mode:
                  </span>


                  {/* Grid */}
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`
                      rounded px-3 py-2 transition
                      ${
                        viewMode === "grid"
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    ▦
                  </button>


                  {/* List */}
                  <button
                    onClick={() => setViewMode("list")}
                    className={`
                      rounded px-3 py-2 transition
                      ${
                        viewMode === "list"
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    ☷
                  </button>

                </div>

              </div>


              {/* =====================================================
                  PRODUCT GRID
              ====================================================== */}

              <div
                className={
                  viewMode === "grid"
                    ? `
                      grid
                      grid-cols-1
                      min-[400px]:grid-cols-2
                      gap-3
                      sm:gap-4
                      xl:grid-cols-3
                    `
                    : "space-y-3 sm:space-y-4"
                }
              >

                {products.length > 0 ? (

                  products.map((product) => (

                    <ProductCard
                      key={product.id}
                      product={product}
                      listMode={viewMode === "list"}
                    />

                  ))

                ) : (

                  <div className="col-span-full rounded-md bg-white py-10 text-center text-sm text-gray-400">

                    No products found.

                  </div>

                )}

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}


/* =====================================================
   SIDEBAR ITEM
===================================================== */

function SidebarItem({ icon, title }) {

  return (

    <div className="mb-2 flex cursor-pointer items-center justify-between rounded-md px-3 py-3 text-sm text-gray-300 transition hover:bg-[#252d3d] hover:text-white">

      <div className="flex min-w-0 items-center gap-3">

        <span className="w-5 shrink-0 text-gray-400">
          {icon}
        </span>

        <span className="truncate">
          {title}
        </span>

      </div>


      <span className="text-gray-500">
        ›
      </span>

    </div>

  );
}


/* =====================================================
   FILTER SECTION
===================================================== */

function FilterSection({ title, children }) {

  return (

    <div className="border-b py-4">

      <div className="mb-3 flex items-center justify-between text-xs font-semibold text-gray-700">

        {title}

        <span>
          ⌄
        </span>

      </div>

      {children}

    </div>

  );

}


/* =====================================================
   CHECKBOX
===================================================== */

function Checkbox({ label }) {

  return (

    <label className="mb-2 flex cursor-pointer items-center gap-2 text-xs text-gray-500">

      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300"
      />

      {label}

    </label>

  );

}


/* =====================================================
   PRODUCT CARD
===================================================== */

function ProductCard({ product, listMode }) {

  return (

    <div
      className={`
        relative overflow-hidden rounded-md bg-white shadow-sm
        transition hover:shadow-md
        ${
          listMode
            ? "flex items-center gap-3 p-3 sm:gap-5 sm:p-4"
            : ""
        }
      `}
    >


      {/* =====================================================
          WISHLIST
      ====================================================== */}

      <button
        className="
          absolute right-3 top-3 z-10
          text-lg text-gray-400
          hover:text-red-500
          sm:right-4 sm:top-4 sm:text-xl
        "
      >
        ♡
      </button>


      {/* =====================================================
          IMAGE
      ====================================================== */}

      <div
        className={
          listMode
            ? "h-24 w-24 shrink-0 sm:h-32 sm:w-40"
            : `
              flex h-[175px] w-full
              items-center justify-center
              p-4
              sm:h-[190px] sm:p-5
            `
        }
      >

        <Image
          src={product.image}
          alt={
            product.product_name ||
            product.name ||
            "Product"
          }
          width={300}
          height={300}
          className="h-full w-full object-contain"
        />

      </div>


      {/* =====================================================
          DETAILS
      ====================================================== */}

      <div
        className={
          listMode
            ? "min-w-0 flex-1 pr-7"
            : "px-3 pb-4 sm:px-4 sm:pb-5"
        }
      >

        {/* Brand */}
        <p className="mb-1 text-[9px] font-semibold uppercase text-gray-400">

          {product.brand || "ADIDAS"}

        </p>


        {/* Product Name */}
        <h3 className="line-clamp-2 text-sm font-medium text-gray-700">

          {product.product_name || product.name}

        </h3>


        {/* Price */}
        <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">

          <span className="text-base font-semibold text-indigo-600">

            ₹
            {Number(
              product.price || 1499
            ).toLocaleString("en-IN")}

          </span>


          <span className="text-[11px] text-red-400 line-through sm:text-xs">
            ₹4,999
          </span>


          <span className="text-[9px] font-semibold text-green-500 sm:text-[10px]">
            70% off
          </span>

        </div>

      </div>

    </div>

  );
}

