'use client';

import { useQRContext } from '../../lib/context/QRContext';
import Tooltip from '../ui/Tooltip';

export default function ErrorCorrectionSelector() {
  const { qrConfig, updateConfig } = useQRContext();

  const levels = [
    { id: 'L', label: 'Low', percentage: '7%', description: 'Suitable for clean environments', tooltip: 'Up to 7% of data can be restored if damaged' },
    { id: 'M', label: 'Medium', percentage: '15%', description: 'Balanced protection', tooltip: 'Up to 15% of data can be restored - good for most uses' },
    { id: 'Q', label: 'Quartile', percentage: '25%', description: 'Good for slightly damaged codes', tooltip: 'Up to 25% of data can be restored - recommended for outdoor use' },
    { id: 'H', label: 'High', percentage: '30%', description: 'Best with logos, most protection', tooltip: 'Up to 30% of data can be restored - essential when using logos' },
  ];

  return (
    <div className="space-y-2">
        {levels.map((level) => (
          <Tooltip key={level.id} content={level.tooltip} position="right">
            <button
              onClick={() => updateConfig({ errorCorrectionLevel: level.id })}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all text-left ${
                qrConfig.errorCorrectionLevel === level.id
                  ? 'border-primary bg-primary-hover bg-opacity-10'
                  : 'border-secondary-border bg-white hover:border-primary-hover'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-900">
                  {level.label} ({level.percentage})
                </span>
                {qrConfig.errorCorrectionLevel === level.id && (
                  <span className="text-primary text-xl">✓</span>
                )}
              </div>
              <p className="text-xs text-gray-600">{level.description}</p>
            </button>
          </Tooltip>
        ))}

        <p className="text-xs text-gray-500 mt-4">
          Higher error correction allows the QR code to be scanned even if partially damaged or obscured
        </p>
    </div>
  );
}
