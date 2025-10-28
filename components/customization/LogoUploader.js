'use client';

import { useState } from 'react';
import { useQRContext } from '../../lib/context/QRContext';
import Tooltip from '../ui/Tooltip';

export default function LogoUploader() {
  const { qrConfig, updateConfig } = useQRContext();
  const [logoSize, setLogoSize] = useState(20);
  const [logoPadding, setLogoPadding] = useState(true);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PNG, JPG, or SVG file');
      return;
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      updateConfig({
        logo: {
          file: event.target.result,
          size: logoSize,
          padding: logoPadding,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleUseDefaultLogo = () => {
    updateConfig({
      logo: {
        file: '/assets/default-logo.jpg',
        size: logoSize,
        padding: logoPadding,
      },
    });
  };

  const handleRemoveLogo = () => {
    updateConfig({ logo: null });
  };

  const handleSizeChange = (size) => {
    setLogoSize(size);
    if (qrConfig.logo) {
      updateConfig({
        logo: {
          ...qrConfig.logo,
          size,
        },
      });
    }
  };

  const handlePaddingToggle = (enabled) => {
    setLogoPadding(enabled);
    if (qrConfig.logo) {
      updateConfig({
        logo: {
          ...qrConfig.logo,
          padding: enabled,
        },
      });
    }
  };

  return (
    <div className="space-y-4">
        {/* Logo Preview */}
        {qrConfig.logo && (
          <div className="flex items-center justify-center p-4 bg-secondary-light rounded-lg">
            <img
              src={qrConfig.logo.file}
              alt="Logo preview"
              className="max-w-[100px] max-h-[100px] object-contain"
            />
          </div>
        )}

        {/* Upload/Default/Remove Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {!qrConfig.logo ? (
            <>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <div className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-center text-sm font-medium transition">
                  Upload Logo
                </div>
              </label>

              <button
                onClick={handleUseDefaultLogo}
                className="px-4 py-2 bg-secondary-light hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition"
              >
                Use Default
              </button>
            </>
          ) : (
            <>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <div className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-center text-sm font-medium transition">
                  Replace
                </div>
              </label>

              <button
                onClick={handleRemoveLogo}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition"
              >
                Remove
              </button>
            </>
          )}
        </div>

        {qrConfig.logo && (
          <>
            {/* Logo Size */}
            <Tooltip content="Adjust logo size relative to QR code. Larger logos require higher error correction." position="top">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Size: {logoSize}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="30"
                  value={logoSize}
                  onChange={(e) => handleSizeChange(Number(e.target.value))}
                  className="w-full h-2 bg-secondary-border rounded-lg appearance-none cursor-pointer"
                  aria-label="Logo size slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10%</span>
                  <span>30%</span>
                </div>
              </div>
            </Tooltip>

            {/* Logo Padding */}
            <div className="flex items-center justify-between">
              <Tooltip content="Add white space around logo for better contrast and scannability" position="left">
                <label className="text-sm font-medium text-gray-700">
                  White Padding
                </label>
              </Tooltip>
              <button
                onClick={() => handlePaddingToggle(!logoPadding)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  logoPadding ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label="Toggle logo padding"
                aria-pressed={logoPadding}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    logoPadding ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </>
        )}

        <p className="text-xs text-gray-500">
          Supported: PNG, JPG, SVG • Max size: 2MB • Square or rectangular logos work best
        </p>
    </div>
  );
}
