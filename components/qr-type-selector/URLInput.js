'use client';

import { useQRContext } from '../../lib/context/QRContext';

export default function URLInput() {
  const { qrConfig, updateData } = useQRContext();

  const handleChange = (e) => {
    updateData({ url: e.target.value });
  };

  return (
    <div className="space-y-2">
      <label htmlFor="url" className="block text-sm font-medium text-gray-700">
        Website URL
      </label>
      <input
        type="url"
        id="url"
        value={qrConfig.data.url}
        onChange={handleChange}
        placeholder="https://example.com"
        className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
      />
      <p className="text-xs text-gray-500">
        Enter a valid URL starting with http:// or https://
      </p>
    </div>
  );
}
