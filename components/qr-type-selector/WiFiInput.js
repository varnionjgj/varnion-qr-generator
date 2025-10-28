'use client';

import { useQRContext } from '../../lib/context/QRContext';

export default function WiFiInput() {
  const { qrConfig, updateData } = useQRContext();

  const handleChange = (field) => (e) => {
    const value = field === 'hidden' ? e.target.checked : e.target.value;
    updateData({
      wifi: {
        ...qrConfig.data.wifi,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="wifi-ssid" className="block text-sm font-medium text-gray-700">
          Network Name (SSID) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="wifi-ssid"
          value={qrConfig.data.wifi?.ssid || ''}
          onChange={handleChange('ssid')}
          placeholder="MyWiFiNetwork"
          className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="wifi-password" className="block text-sm font-medium text-gray-700">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="wifi-password"
          value={qrConfig.data.wifi?.password || ''}
          onChange={handleChange('password')}
          placeholder="Network password"
          className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="wifi-encryption" className="block text-sm font-medium text-gray-700">
          Encryption Type
        </label>
        <select
          id="wifi-encryption"
          value={qrConfig.data.wifi?.encryption || 'WPA'}
          onChange={handleChange('encryption')}
          className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">None (Open Network)</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="wifi-hidden"
          checked={qrConfig.data.wifi?.hidden || false}
          onChange={handleChange('hidden')}
          className="w-4 h-4 text-primary border-secondary-border rounded focus:ring-2 focus:ring-primary"
        />
        <label htmlFor="wifi-hidden" className="text-sm font-medium text-gray-700">
          Hidden Network
        </label>
      </div>

      <p className="text-xs text-gray-500">
        Scanning this QR code will automatically connect to your WiFi network
      </p>
    </div>
  );
}
