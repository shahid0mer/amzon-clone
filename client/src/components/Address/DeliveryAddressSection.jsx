import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../Features/addressThunk";
import AddressModal from "./AddressModal";

const DeliveryAddressSection = ({ onAddressSelect }) => {
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.address);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selected, setSelected] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
  const def = addresses.find(a => a.isDefault);
  if (def) {
    setSelected(def._id);  
  }
}, [addresses]);

  const openAdd = () => {
    setEditing(null);
    setFormData({
      name: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      country: "India"
    });
    setModalOpen(true);
  };

  const openEdit = (a) => {
    setEditing(a);
    setFormData(a);
    setModalOpen(true);
  };

  const saveAddress = () => {
    if (editing) {
      dispatch(updateAddress({ id: editing._id, data: formData }));
    } else {
      dispatch(addAddress(formData));
    }
    setModalOpen(false);
  };

  return (
    <div className="border border-gray-300 rounded p-4 mb-4 bg-white shadow-sm">
      <h2 className="text-lg font-bold mb-3">Select Delivery Address</h2>

      {/* 🔥 IMPORTANT: FORCE BLOCK RENDERING */}
      <div className="space-y-3">
        {addresses.length === 0 && (
          <p className="text-sm text-gray-500">No saved addresses.</p>
        )}

                    {addresses.map((a) => (
            <div
                key={a._id}
                onClick={() => {
                setSelected(a._id);
                onAddressSelect(a);
                }}
                className={`p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                selected === a._id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
            >
                <div className="flex-1">
                <p className="font-semibold">{a.name}</p>
                <p className="text-sm text-gray-700">
                    {a.addressLine1}, {a.city}, {a.state}, {a.pincode}
                </p>
                <p className="text-sm">Phone: {a.phone}</p>

                <div className="text-xs mt-2 flex gap-4 text-blue-600">
                    <button onClick={() => openEdit(a)}>Edit</button>
                    <button onClick={() => dispatch(deleteAddress(a._id))}>
                    Delete
                    </button>
                    {!a.isDefault && (
                    <button onClick={() => dispatch(setDefaultAddress(a._id))}>
                        Set Default
                    </button>
                    )}
                </div>
                </div>
            </div>
            ))}
      </div>

      <button
        onClick={openAdd}
        className="mt-3 text-sm text-blue-600 hover:underline"
      >
        + Add New Address
      </button>

      <AddressModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">
          {editing ? "Edit Address" : "Add New Address"}
        </h2>

        <div className="space-y-2">
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              type="text"
              placeholder={key}
              className="w-full border px-2 py-1 rounded"
              value={formData[key]}
              onChange={(e) =>
                setFormData({ ...formData, [key]: e.target.value })
              }
            />
          ))}
        </div>

        <button
          className="w-full bg-(--color-amazon-yellow) py-2 rounded mt-4"
          onClick={saveAddress}
        >
          {editing ? "Update" : "Add"} Address
        </button>
      </AddressModal>
    </div>
  );
};

export default DeliveryAddressSection;
