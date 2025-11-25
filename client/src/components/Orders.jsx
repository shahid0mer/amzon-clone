import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react";
import { getMyOrdersThunk } from "../Features/orderThunk";
import ProductCarousel from "./ProductCarousel";

const YourOrders = () => {
  const [selectedTab, setSelectedTab] = useState("orders");
  const [timeFilter, setTimeFilter] = useState("past-3-months");
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const {
    myOrders = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.order || {});

  useEffect(() => {
    dispatch(getMyOrdersThunk());
  }, [dispatch]);

  const tabs = [
    { id: "orders", label: "Orders" },
    { id: "buy-again", label: "Buy Again" },
    { id: "not-yet-shipped", label: "Not Yet Shipped" },
    { id: "cancelled", label: "Cancelled Orders" },
  ];

  const timeFilters = [
    { value: "past-3-months", label: "past 3 months" },
    { value: "past-6-months", label: "past 6 months" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
  ];

  // Filter orders based on time filter
  const getFilteredOrders = () => {
    const now = new Date();
    const cutoffDate = new Date();

    switch (timeFilter) {
      case "past-3-months":
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case "past-6-months":
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case "2024":
        return myOrders.filter(
          (order) => new Date(order.createdAt).getFullYear() === 2024
        );
      case "2023":
        return myOrders.filter(
          (order) => new Date(order.createdAt).getFullYear() === 2023
        );
      case "2022":
        return myOrders.filter(
          (order) => new Date(order.createdAt).getFullYear() === 2022
        );
      default:
        return myOrders;
    }

    return myOrders.filter((order) => new Date(order.createdAt) >= cutoffDate);
  };

  // Filter orders based on selected tab
  const getTabFilteredOrders = (orders) => {
    switch (selectedTab) {
      case "not-yet-shipped":
        return orders.filter(
          (order) => order.status === "pending" || order.status === "processing"
        );
      case "cancelled":
        return orders.filter((order) => order.status === "cancelled");
      default:
        return orders;
    }
  };

  // Search orders
  const getSearchedOrders = (orders) => {
    if (!searchQuery) return orders;

    return orders.filter(
      (order) =>
        order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items?.some((item) =>
          item.product?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  };

  const filteredOrders = getSearchedOrders(
    getTabFilteredOrders(getFilteredOrders())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "text-yellow-600",
      processing: "text-blue-600",
      shipped: "text-blue-600",
      delivered: "text-green-600",
      cancelled: "text-red-600",
    };
    return colors[status] || "text-gray-600";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm mb-4">
        <span className="text-gray-600">Your Account</span>
        <span className="mx-2 text-gray-400">›</span>
        <span className="text-orange-600">Your Orders</span>
      </div>

      {/* Header */}
      <h1 className="text-3xl font-normal mb-6">Your Orders</h1>

      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search all orders"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <button
          onClick={() => {}}
          className="px-6 py-2 bg-(--color-amazon-yellow) text-black rounded-md hover:bg-(--color-amazon-orange) transition-colors"
        >
          Search Orders
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-300 mb-6">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                selectedTab === tab.id
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-700 hover:text-orange-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Time Filter */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <span className="font-bold">{filteredOrders.length} orders</span>
        <span className="text-gray-600">placed in</span>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {timeFilters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-600">
            Error loading orders:{" "}
            {typeof error === "string"
              ? error
              : error.message || "An error occurred"}
          </p>
        </div>
      )}

      {/* Orders List */}
      {!loading && !error && filteredOrders.length > 0 && (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-300 rounded-lg overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-100 px-6 py-3 grid grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-600 text-xs mb-1">ORDER PLACED</div>
                  <div className="font-medium">
                    {formatDate(order.createdAt)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 text-xs mb-1">TOTAL</div>
                  <div className="font-medium">
                    ${order.totalAmount?.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 text-xs mb-1">SHIP TO</div>
                  <div className="font-medium text-blue-600 hover:text-orange-600 cursor-pointer">
                    {order.shippingAddress?.name || "Address"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-600 text-xs mb-1">
                    ORDER # {order._id?.slice(-8)}
                  </div>
                  <div className="text-blue-600 text-xs hover:text-orange-600 cursor-pointer">
                    View order details
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div
                  className={`font-bold text-lg mb-4 ${getStatusColor(order.status || "pending")}`}
                >
                  {order.status
                    ? order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)
                    : "Pending"}
                </div>

                {order.items?.map((item, index) => (
                  <div key={index} className="flex gap-4 mb-4">
                    <div className="w-32 h-32 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <img
                        src={
                          item.product?.images?.[0]?.url ||
                          "https://via.placeholder.com/128"
                        }
                        alt={item.product?.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/128?text=No+Image";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        {item.product?.name || "Product"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: ${item.price?.toFixed(2)}
                      </p>
                      <div className="mt-3 flex gap-3">
                        <button className="px-4 py-2  hover:bg-(--color-amazon-orange) text-gray-900 text-sm font-medium rounded-lg">
                          Buy it again
                        </button>
                        <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-900 text-sm font-medium rounded-lg">
                          View your item
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredOrders.length === 0 && (
        <div className="text-center py-12 border-t border-gray-200">
          <p className="text-gray-700 mb-2">
            Looks like you haven't placed an order in the last 3 months.{" "}
            <button
              onClick={() => setTimeFilter("2024")}
              className="text-blue-600 hover:text-orange-600 hover:underline"
            >
              View orders in 2024
            </button>
          </p>
        </div>
      )}

      <ProductCarousel />
    </div>
  );
};

export default YourOrders;
