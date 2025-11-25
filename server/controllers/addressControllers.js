import User from "../models/User.js";

// 📌 Add Address
export const addAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressData = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If first address → setDefault
    if (user.addresses.length === 0) {
      addressData.isDefault = true;
    }

    user.addresses.push(addressData);
    await user.save();

    res.json({ message: "Address added", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Update Address
export const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const user = await User.findById(req.user.id);

    const address = user.addresses.id(addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });

    Object.assign(address, req.body);
    await user.save();

    res.json({ message: "Address updated", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Delete Address
export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const user = await User.findById(req.user.id);

    user.addresses = user.addresses.filter(
      (a) => a._id.toString() !== addressId
    );
    await user.save();

    res.json({ message: "Address removed", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Set Default Address
export const setDefaultAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const user = await User.findById(req.user.id);

    user.addresses.forEach((addr) => {
      addr.isDefault = addr._id.toString() === addressId;
    });

    await user.save();

    res.json({ message: "Default address updated", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get All Addresses
export const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
