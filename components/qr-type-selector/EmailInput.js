'use client';

import { useQRContext } from '../../lib/context/QRContext';

export default function EmailInput() {
  const { qrConfig, updateData } = useQRContext();

  const handleChange = (field) => (e) => {
    updateData({
      email: {
        ...qrConfig.data.email,
        [field]: e.target.value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email-address"
          value={qrConfig.data.email?.address || ''}
          onChange={handleChange('address')}
          placeholder="example@email.com"
          className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email-subject" className="block text-sm font-medium text-gray-700">
          Subject (optional)
        </label>
        <input
          type="text"
          id="email-subject"
          value={qrConfig.data.email?.subject || ''}
          onChange={handleChange('subject')}
          placeholder="Email subject"
          className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email-body" className="block text-sm font-medium text-gray-700">
          Message (optional)
        </label>
        <textarea
          id="email-body"
          value={qrConfig.data.email?.body || ''}
          onChange={handleChange('body')}
          placeholder="Email message body"
          rows={4}
          className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
        />
      </div>

      <p className="text-xs text-gray-500">
        Scanning this QR code will open an email client with pre-filled fields
      </p>
    </div>
  );
}
