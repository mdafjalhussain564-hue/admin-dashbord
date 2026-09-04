
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://zamart-backend3.onrender.com";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("adminToken");

      console.log("ADMIN TOKEN:", token);

      const res = await axios.get(
        `${API_URL}/api/orders/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("ADMIN ORDERS:", res.data);

      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("Orders fetch error:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Payment Status
  const getPaymentStatus = (status) => {
    if (status === "paid") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
          ● PAID
        </span>
      );
    }

    if (status === "failed") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
          ● FAILED
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
        ● PENDING
      </span>
    );
  };

  // Order Status
  const getOrderStatus = (status) => {
    const currentStatus = status?.toLowerCase();

    if (currentStatus === "delivered") {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
          Delivered
        </span>
      );
    }

    if (currentStatus === "cancelled") {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
          Cancelled
        </span>
      );
    }

    if (currentStatus === "shipped") {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
          Shipped
        </span>
      );
    }

    if (currentStatus === "processing") {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
          Processing
        </span>
      );
    }

    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
        {status || "Pending"}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-500 text-lg">
          Loading orders...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Orders
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage and monitor all customer orders
          </p>
        </div>

        <div className="bg-white border rounded-lg px-4 py-2">
          <span className="text-sm text-gray-500">
            Total Orders
          </span>

          <span className="ml-2 font-bold text-gray-800">
            {orders.length}
          </span>
        </div>

      </div>

      {/* EMPTY STATE */}
      {orders.length === 0 ? (
        <div className="bg-white border rounded-xl p-12 text-center">
          <div className="text-5xl mb-4">
            📦
          </div>

          <h2 className="text-xl font-semibold text-gray-700">
            No orders found
          </h2>

          <p className="text-gray-500 mt-1">
            Customer orders will appear here.
          </p>
        </div>
      ) : (

        /* TABLE */
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

          {/* TABLE SCROLL */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[1300px] text-sm">

              {/* TABLE HEADER */}
              <thead className="bg-gray-50 border-b">

                <tr>

                  <th className="px-5 py-4 text-left font-semibold text-gray-600">
                    Order
                  </th>

                  <th className="px-5 py-4 text-left font-semibold text-gray-600">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left font-semibold text-gray-600">
                    Product
                  </th>

                  <th className="px-5 py-4 text-center font-semibold text-gray-600">
                    Qty
                  </th>

                  <th className="px-5 py-4 text-left font-semibold text-gray-600">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-left font-semibold text-gray-600">
                    Payment
                  </th>

                  <th className="px-5 py-4 text-left font-semibold text-gray-600">
                    Payment Status
                  </th>

                  <th className="px-5 py-4 text-left font-semibold text-gray-600">
                    Order Status
                  </th>

                  <th className="px-5 py-4 text-left font-semibold text-gray-600">
                    Date
                  </th>

                  <th className="px-5 py-4 text-center font-semibold text-gray-600">
                    Action
                  </th>

                </tr>

              </thead>

              {/* TABLE BODY */}
              <tbody className="divide-y">

                {orders.map((order, index) => (
                  <tr key={`${order.id}-${index}`}>

                    {/* ORDER */}
                    <td className="px-5 py-4">

                      <div className="font-semibold text-gray-800">
                        #{order.order_id}
                      </div>

                      <div className="text-xs text-gray-500 mt-1">
                        User ID: {order.user_id}
                      </div>

                    </td>

                    {/* CUSTOMER */}
                    <td className="px-5 py-4">

                      <div className="font-medium text-gray-800">
                        {order.delivery_name}
                      </div>

                      <div className="text-xs text-gray-500 mt-1">
                        {order.delivery_mobile}
                      </div>

                    </td>

                    {/* PRODUCT */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <img
                          src={
                            order.image ||
                            "/placeholder.png"
                          }
                          alt={order.product_name}
                          className="w-12 h-12 rounded-lg border object-contain bg-white"
                        />

                        <div className="max-w-[220px]">

                          <div className="font-medium text-gray-800 truncate">
                            {order.product_name}
                          </div>

                          <div className="text-xs text-gray-500 mt-1">
                            ₹{order.price}
                          </div>

                        </div>

                      </div>

                    </td>

                    {/* QUANTITY */}
                    <td className="px-5 py-4 text-center">

                      <span className="font-medium">
                        {order.quantity}
                      </span>

                    </td>

                    {/* AMOUNT */}
                    <td className="px-5 py-4">

                      <span className="font-bold text-gray-800">
                        ₹{order.total_amount}
                      </span>

                    </td>

                    {/* PAYMENT METHOD */}
                    <td className="px-5 py-4">

                      <span className="capitalize text-gray-700">
                        {order.payment_method || "-"}
                      </span>

                    </td>

                    {/* PAYMENT STATUS */}
                    <td className="px-5 py-4">

                      {getPaymentStatus(
                        order.payment_status
                      )}

                    </td>

                    {/* ORDER STATUS */}
                    <td className="px-5 py-4">

                      {getOrderStatus(order.status)}

                    </td>

                    {/* DATE */}
                    <td className="px-5 py-4">

                      <div className="text-gray-700">
                        {new Date(
                          order.created_at
                        ).toLocaleDateString("en-IN")}
                      </div>

                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(
                          order.created_at
                        ).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>

                    </td>

                    {/* ACTION */}
                    <td className="px-5 py-4 text-center">

                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition"
                      >
                        View
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* FOOTER */}
          <div className="border-t bg-gray-50 px-5 py-3">

            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {orders.length}
              </span>{" "}
              orders
            </p>

          </div>

          {/* ORDER DETAILS MODAL */}
          {selectedOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

              <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">

                {/* MODAL HEADER */}
                <div className="flex items-center justify-between px-6 py-4 border-b">

                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Order #{selectedOrder.order_id}
                    </h2>

                    <p className="text-sm text-gray-500">
                      Order Details
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-500 hover:text-red-500 text-2xl"
                  >
                    ×
                  </button>

                </div>

                {/* MODAL BODY */}
                <div className="p-6 space-y-6">

                  {/* CUSTOMER */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3">
                      Customer Details
                    </h3>

                    <div className="grid md:grid-cols-2 gap-3 text-sm">

                      <p>
                        <b>Name:</b>{" "}
                        {selectedOrder.delivery_name}
                      </p>

                      <p>
                        <b>Mobile:</b>{" "}
                        {selectedOrder.delivery_mobile}
                      </p>

                      <p>
                        <b>User ID:</b>{" "}
                        {selectedOrder.user_id}
                      </p>

                    </div>
                  </div>

                  {/* ADDRESS */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3">
                      Delivery Address
                    </h3>

                    <div className="bg-gray-50 rounded-lg p-4 text-sm">

                      <p>
                        {selectedOrder.delivery_address}
                      </p>

                      <p>
                        {selectedOrder.delivery_city},{" "}
                        {selectedOrder.delivery_state}
                      </p>

                      <p>
                        Pincode: {selectedOrder.delivery_pincode}
                      </p>

                    </div>
                  </div>

                  {/* PRODUCT */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3">
                      Product
                    </h3>

                    <div className="flex items-center gap-4 border rounded-lg p-4">

                      <img
                        src={
                          selectedOrder.image ||
                          "/placeholder.png"
                        }
                        alt={selectedOrder.product_name}
                        className="w-20 h-20 object-contain border rounded-lg"
                      />

                      <div>

                        <h4 className="font-semibold text-gray-800">
                          {selectedOrder.product_name}
                        </h4>

                        <p className="text-sm text-gray-500">
                          Quantity: {selectedOrder.quantity}
                        </p>

                        <p className="font-semibold mt-1">
                          ₹{selectedOrder.price}
                        </p>

                      </div>

                    </div>
                  </div>

                  {/* PAYMENT */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3">
                      Payment Details
                    </h3>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">

                      <p>
                        <b>Method:</b>{" "}
                        {selectedOrder.payment_method || "-"}
                      </p>

                      <p>
                        <b>Status:</b>{" "}
                        {selectedOrder.payment_status || "-"}
                      </p>

                      {selectedOrder.payment_id && (
                        <p className="break-all">
                          <b>Payment ID:</b>{" "}
                          {selectedOrder.payment_id}
                        </p>
                      )}

                    </div>
                  </div>

                  {/* ORDER STATUS */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3">
                      Order Status
                    </h3>

                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {selectedOrder.status || "Pending"}
                    </span>
                  </div>

                  {/* TOTAL */}
                  <div className="border-t pt-4 flex justify-between items-center">

                    <span className="text-lg font-semibold">
                      Total Amount
                    </span>

                    <span className="text-2xl font-bold text-gray-800">
                      ₹{selectedOrder.total_amount}
                    </span>

                  </div>

                </div>

                {/* MODAL FOOTER */}
                <div className="border-t px-6 py-4 flex justify-end">

                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                  >
                    Close
                  </button>

                </div>

              </div>

            </div>
          )}

        </div>

      )}

    </div>
  );
}

