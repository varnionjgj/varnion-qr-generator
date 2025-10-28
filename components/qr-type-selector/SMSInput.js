'use client';

import { useQRContext } from '../../lib/context/QRContext';

export default function SMSInput() {
  const { qrConfig, updateData } = useQRContext();

  const handleChange = (field) => (e) => {
    updateData({
      sms: {
        ...qrConfig.data.sms,
        [field]: e.target.value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="sms-phone" className="block text-sm font-medium text-gray-700">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="sms-phone"
          value={qrConfig.data.sms?.phone || ''}
          onChange={handleChange('phone')}
          placeholder="+1 234 567 8900"
          className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="sms-message" className="block text-sm font-medium text-gray-700">
          Message (optional)
        </label>
        <textarea
          id="sms-message"
          value={qrConfig.data.sms?.message || ''}
          onChange={handleChange('message')}
          placeholder="Pre-filled SMS message"
          rows={4}
          className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
        />
      </div>

      <p className="text-xs text-gray-500">
        Scanning this QR code will open an SMS app with the phone number and optional pre-filled message
      </p>
    </div>
  );
}
