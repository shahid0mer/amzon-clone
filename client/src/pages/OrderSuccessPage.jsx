import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderSuccess from '../components/OrderSuccess'; // Adjust the path

function OrderSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the order details from navigation state
  const {
    orderId,
    items = [],
    totalAmount = 0,
    shippingAddress,
    estimatedDelivery
  } = location.state || {};

  const handleViewOrder = () => {
    navigate('/orders');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleTrackOrder = () => {
    navigate('/orders');
  };

  return (
    <OrderSuccess
      orderId={orderId}
      items={items}
      totalAmount={totalAmount}
      shippingAddress={shippingAddress}
      estimatedDelivery={estimatedDelivery}
      onViewOrder={handleViewOrder}
      onContinueShopping={handleContinueShopping}
      onTrackOrder={handleTrackOrder}
    />
  );
}

export default OrderSuccessPage;