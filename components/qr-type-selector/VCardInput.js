'use client';

import { useQRContext } from '../../lib/context/QRContext';

export default function VCardInput() {
  const { qrConfig, updateData } = useQRContext();

  const handleChange = (field) => (e) => {
    updateData({
      vcard: {
        ...qrConfig.data.vcard,
        [field]: e.target.value,
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Name */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label htmlFor="vcard-firstName" className="block text-sm font-medium text-gray-700">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="vcard-firstName"
            value={qrConfig.data.vcard?.firstName || ''}
            onChange={handleChange('firstName')}
            placeholder="John"
            className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="vcard-lastName" className="block text-sm font-medium text-gray-700">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="vcard-lastName"
            value={qrConfig.data.vcard?.lastName || ''}
            onChange={handleChange('lastName')}
            placeholder="Doe"
            className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      {/* Organization */}
      <div className="space-y-2">
        <label htmlFor="vcard-organization" className="block text-sm font-medium text-gray-700">
          Organization / Company
        </label>
        <input
          type="text"
          id="vcard-organization"
          value={qrConfig.data.vcard?.organization || ''}
          onChange={handleChange('organization')}
          placeholder="Varnion Inc."
          className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
        />
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label htmlFor="vcard-phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="vcard-phone"
            value={qrConfig.data.vcard?.phone || ''}
            onChange={handleChange('phone')}
            placeholder="+1 234 567 8900"
            className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="vcard-email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="vcard-email"
            value={qrConfig.data.vcard?.email || ''}
            onChange={handleChange('email')}
            placeholder="john@example.com"
            className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      {/* Website */}
      <div className="space-y-2">
        <label htmlFor="vcard-website" className="block text-sm font-medium text-gray-700">
          Website
        </label>
        <input
          type="url"
          id="vcard-website"
          value={qrConfig.data.vcard?.website || ''}
          onChange={handleChange('website')}
          placeholder="https://varnion.com"
          className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
        />
      </div>

      {/* Address */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">Address (optional)</p>

        <input
          type="text"
          id="vcard-street"
          value={qrConfig.data.vcard?.street || ''}
          onChange={handleChange('street')}
          placeholder="Street address"
          className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            id="vcard-city"
            value={qrConfig.data.vcard?.city || ''}
            onChange={handleChange('city')}
            placeholder="City"
            className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />

          <input
            type="text"
            id="vcard-state"
            value={qrConfig.data.vcard?.state || ''}
            onChange={handleChange('state')}
            placeholder="State"
            className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            id="vcard-zip"
            value={qrConfig.data.vcard?.zip || ''}
            onChange={handleChange('zip')}
            placeholder="ZIP code"
            className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />

          <input
            type="text"
            id="vcard-country"
            value={qrConfig.data.vcard?.country || ''}
            onChange={handleChange('country')}
            placeholder="Country"
            className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Scanning this QR code will save the contact information to the device
      </p>
    </div>
  );
}
