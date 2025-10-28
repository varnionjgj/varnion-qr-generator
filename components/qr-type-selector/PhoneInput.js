'use client';

import { useQRContext } from '../../lib/context/QRContext';

export default function PhoneInput() {
  const { qrConfig, updateData } = useQRContext();

  const handleChange = (e) => {
    updateData({ phone: e.target.value });
  };

  return (
    <div className="space-y-2">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
        Phone Number <span className="text-red-500">*</span>
      </label>
      <input
        type="tel"
        id="phone"
        value={qrConfig.data.phone}
        onChange={handleChange}
        placeholder="+1 234 567 8900"
        className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
      />
      <p className="text-xs text-gray-500">
        Include country code for international numbers (e.g., +1 for USA)
      </p>
    </div>
  );
}
