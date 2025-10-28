'use client';

import { useQRContext } from '../../lib/context/QRContext';

export default function TextInput() {
  const { qrConfig, updateData } = useQRContext();

  const handleChange = (e) => {
    updateData({ text: e.target.value });
  };

  const charCount = qrConfig.data.text?.length || 0;
  const maxChars = 500;

  return (
    <div className="space-y-2">
      <label htmlFor="text" className="block text-sm font-medium text-gray-700">
        Text Content
      </label>
      <textarea
        id="text"
        value={qrConfig.data.text}
        onChange={handleChange}
        placeholder="Enter your text here..."
        rows={5}
        maxLength={maxChars}
        className="w-full px-4 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
      />
      <div className="flex justify-between items-center text-xs">
        <p className="text-gray-500">
          Enter any text you want to encode in the QR code
        </p>
        <span className={`font-medium ${charCount > maxChars * 0.9 ? 'text-orange-500' : 'text-gray-500'}`}>
          {charCount} / {maxChars}
        </span>
      </div>
    </div>
  );
}
