'use client';

import { useQRContext } from '../../lib/context/QRContext';

export default function ShapeCustomizer() {
  const { qrConfig, updateStyle } = useQRContext();

  const dotStyles = [
    { id: 'square', label: 'Square', preview: '■' },
    { id: 'rounded', label: 'Rounded', preview: '●' },
    { id: 'dots', label: 'Dots', preview: '●' },
    { id: 'extra-rounded', label: 'Extra Rounded', preview: '●' },
  ];

  const cornerSquareStyles = [
    { id: 'square', label: 'Square', preview: '■' },
    { id: 'extra-rounded', label: 'Rounded', preview: '●' },
    { id: 'dot', label: 'Dot', preview: '●' },
  ];

  const cornerDotStyles = [
    { id: 'square', label: 'Square', preview: '■' },
    { id: 'dot', label: 'Dot', preview: '●' },
  ];

  return (
    <div className="space-y-5">
        {/* Dot Style */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dot Style
          </label>
          <div className="grid grid-cols-2 gap-2">
            {dotStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => updateStyle({ dotStyle: style.id })}
                className={`px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                  qrConfig.style.dotStyle === style.id
                    ? 'border-primary bg-primary text-white'
                    : 'border-secondary-border bg-white text-gray-700 hover:border-primary-hover'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">{style.preview}</span>
                  <span>{style.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Corner Square Style */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Corner Square Style
          </label>
          <div className="grid grid-cols-3 gap-2">
            {cornerSquareStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => updateStyle({ cornerSquareStyle: style.id })}
                className={`px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                  qrConfig.style.cornerSquareStyle === style.id
                    ? 'border-primary bg-primary text-white'
                    : 'border-secondary-border bg-white text-gray-700 hover:border-primary-hover'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg">{style.preview}</span>
                  <span className="text-xs">{style.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Corner Dot Style */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Corner Dot Style
          </label>
          <div className="grid grid-cols-2 gap-2">
            {cornerDotStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => updateStyle({ cornerDotStyle: style.id })}
                className={`px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                  qrConfig.style.cornerDotStyle === style.id
                    ? 'border-primary bg-primary text-white'
                    : 'border-secondary-border bg-white text-gray-700 hover:border-primary-hover'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">{style.preview}</span>
                  <span>{style.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
    </div>
  );
}
