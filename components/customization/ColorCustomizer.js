'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useQRContext } from '../../lib/context/QRContext';

export default function ColorCustomizer() {
  const { qrConfig, updateStyle } = useQRContext();
  const [showFgPicker, setShowFgPicker] = useState(false);
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [showGradient1Picker, setShowGradient1Picker] = useState(false);
  const [showGradient2Picker, setShowGradient2Picker] = useState(false);
  const [useGradient, setUseGradient] = useState(false);

  const handleForegroundChange = (color) => {
    updateStyle({ foregroundColor: color });
  };

  const handleBackgroundChange = (color) => {
    updateStyle({ backgroundColor: color });
  };

  const handleGradientToggle = (enabled) => {
    setUseGradient(enabled);
    if (enabled) {
      updateStyle({
        gradient: {
          type: 'linear',
          colorStops: [qrConfig.style.foregroundColor, qrConfig.style.foregroundColor],
          direction: 'horizontal',
        },
      });
    } else {
      updateStyle({ gradient: null });
    }
  };

  const handleGradientColorChange = (index, color) => {
    const newColorStops = [...(qrConfig.style.gradient?.colorStops || ['#000000', '#000000'])];
    newColorStops[index] = color;
    updateStyle({
      gradient: {
        ...qrConfig.style.gradient,
        colorStops: newColorStops,
      },
    });
  };

  const handleGradientDirectionChange = (direction) => {
    updateStyle({
      gradient: {
        ...qrConfig.style.gradient,
        direction,
      },
    });
  };

  return (
    <div className="space-y-4">
        {/* Gradient Toggle */}
        <div className="flex items-center justify-between pb-3 border-b border-secondary-border">
          <label className="text-sm font-medium text-gray-700">Use Gradient</label>
          <button
            onClick={() => handleGradientToggle(!useGradient)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              useGradient ? 'bg-primary' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                useGradient ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {!useGradient ? (
          <>
            {/* Solid Foreground Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foreground Color
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFgPicker(!showFgPicker)}
                  className="w-12 h-12 rounded-lg border-2 border-secondary-border hover:border-primary transition"
                  style={{ backgroundColor: qrConfig.style.foregroundColor }}
                />
                <input
                  type="text"
                  value={qrConfig.style.foregroundColor}
                  onChange={(e) => handleForegroundChange(e.target.value)}
                  className="flex-1 px-3 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="#000000"
                />
              </div>
              {showFgPicker && (
                <div className="mt-3">
                  <HexColorPicker
                    color={qrConfig.style.foregroundColor}
                    onChange={handleForegroundChange}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Gradient Color 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gradient Start Color
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowGradient1Picker(!showGradient1Picker)}
                  className="w-12 h-12 rounded-lg border-2 border-secondary-border hover:border-primary transition"
                  style={{ backgroundColor: qrConfig.style.gradient?.colorStops[0] || '#000000' }}
                />
                <input
                  type="text"
                  value={qrConfig.style.gradient?.colorStops[0] || '#000000'}
                  onChange={(e) => handleGradientColorChange(0, e.target.value)}
                  className="flex-1 px-3 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="#000000"
                />
              </div>
              {showGradient1Picker && (
                <div className="mt-3">
                  <HexColorPicker
                    color={qrConfig.style.gradient?.colorStops[0] || '#000000'}
                    onChange={(color) => handleGradientColorChange(0, color)}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Gradient Color 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gradient End Color
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowGradient2Picker(!showGradient2Picker)}
                  className="w-12 h-12 rounded-lg border-2 border-secondary-border hover:border-primary transition"
                  style={{ backgroundColor: qrConfig.style.gradient?.colorStops[1] || '#000000' }}
                />
                <input
                  type="text"
                  value={qrConfig.style.gradient?.colorStops[1] || '#000000'}
                  onChange={(e) => handleGradientColorChange(1, e.target.value)}
                  className="flex-1 px-3 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="#000000"
                />
              </div>
              {showGradient2Picker && (
                <div className="mt-3">
                  <HexColorPicker
                    color={qrConfig.style.gradient?.colorStops[1] || '#000000'}
                    onChange={(color) => handleGradientColorChange(1, color)}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Gradient Direction */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gradient Direction
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['horizontal', 'vertical', 'diagonal'].map((dir) => (
                  <button
                    key={dir}
                    onClick={() => handleGradientDirectionChange(dir)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all capitalize ${
                      qrConfig.style.gradient?.direction === dir
                        ? 'border-primary bg-primary text-white'
                        : 'border-secondary-border bg-white text-gray-700 hover:border-primary-hover'
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Background Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Color
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowBgPicker(!showBgPicker)}
              className="w-12 h-12 rounded-lg border-2 border-secondary-border hover:border-primary transition"
              style={{ backgroundColor: qrConfig.style.backgroundColor }}
            />
            <input
              type="text"
              value={qrConfig.style.backgroundColor}
              onChange={(e) => handleBackgroundChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-secondary-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="#FFFFFF"
            />
          </div>
          {showBgPicker && (
            <div className="mt-3">
              <HexColorPicker
                color={qrConfig.style.backgroundColor}
                onChange={handleBackgroundChange}
                className="w-full"
              />
            </div>
          )}
        </div>
    </div>
  );
}
