import React from 'react';
import { CheckCircle, Package, Truck } from 'lucide-react';

// OrderSuccess.jsx
// Props:
// - orderId: string
// - items: [{ product: { title, images: [{url}] }, quantity, price }]
// - totalAmount: number
// - shippingAddress: { name, street, city, state, zipCode, country }
// - estimatedDelivery: string (e.g. "Nov 27, 2025")
// - onViewOrder: () => void
// - onContinueShopping: () => void
// - onTrackOrder: () => void

export default function OrderSuccess({
  orderId = 'ORD-123456',
  items = [],
  totalAmount = 0,
  shippingAddress = {
    name: 'Jacob Jones',
    street: '2972 Westheimer Rd.',
    city: 'Santa Ana',
    state: 'Illinois',
    zipCode: '85486',
    country: 'USA',
  },
  estimatedDelivery = null,
  onViewOrder = () => {},
  onContinueShopping = () => {},
  onTrackOrder = () => {},
}) {
  const firstItem = items[0];
  const displayDelivery =
    estimatedDelivery || new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toDateString();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">Thank you — your order is confirmed</h1>
              <p className="text-sm text-gray-600 mt-1">Order <span className="font-medium">{orderId}</span> — we've emailed your receipt.</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Order snapshot */}
            <div className="md:col-span-2 bg-gray-50 p-4 rounded">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white rounded overflow-hidden border">
                  <img
                    src={firstItem?.product?.images?.[0]?.url || 'https://via.placeholder.com/150'}
                    alt={firstItem?.product?.title || 'Product image'}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p className="font-medium">{firstItem?.product?.title || 'Your items will be shipped soon'}</p>
                  <p className="text-sm text-gray-500 mt-1">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">RS {totalAmount}</p>
                  <p className="text-xs text-gray-500">Paid • {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              {/* Item list (collapsible feel) */}
              {items.length > 1 && (
                <div className="mt-4 border-t pt-4">
                  {items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 text-sm">
                      <div className="flex items-center gap-3">
                        <img src={it.product.images?.[0]?.url || 'https://via.placeholder.com/60'} alt={it.product.title} className="w-12 h-12 object-cover rounded"/>
                        <div>
                          <div className="font-medium">{it.product.title}</div>
                          <div className="text-gray-500">Qty: {it.quantity}</div>
                        </div>
                      </div>

                      <div className="font-medium">RS {it.price * it.quantity}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Delivery & Actions */}
            <aside className="space-y-4">
              <div className="bg-white border rounded p-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Estimated delivery</p>
                    <p className="font-medium">{displayDelivery}</p>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  <div>{shippingAddress.name}</div>
                  <div>{shippingAddress.street}</div>
                  <div>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</div>
                  <div>{shippingAddress.country}</div>
                </div>
              </div>

              <div className="bg-white border rounded p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Order total</div>
                  <div className="font-semibold">RS {totalAmount}</div>
                </div>

                <div className="mt-4 grid gap-2">
                  <button
                    onClick={onViewOrder}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-teal-600 text-white font-medium hover:bg-teal-700"
                  >
                    <Package className="w-4 h-4" /> View order
                  </button>

                  <button
                    onClick={onTrackOrder}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded border border-gray-200 font-medium hover:bg-gray-50"
                  >
                    Track order
                  </button>

                  <button
                    onClick={onContinueShopping}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded  font-medium hover:bg-(--color-amazon-orange)"
                  >
                    Continue shopping
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-3">We’ll send updates about your shipment to your email.</p>
              </div>
            </aside>
          </div>

          {/* Footer note */}
          <div className="mt-8 border-t pt-6 text-sm text-gray-600">
            <p>
              Need help? Visit your <button onClick={onViewOrder} className="text-teal-700 font-medium hover:underline">orders</button> page or contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
