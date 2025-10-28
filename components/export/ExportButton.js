'use client';

import { useState } from 'react';
import { useQRContext } from '../../lib/context/QRContext';
import { generateQRData, validateQRData } from '../../lib/qr-generator';

export default function ExportButton() {
  const { qrConfig } = useQRContext();
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('png');
  const [exportSize, setExportSize] = useState(1024);
  const [jpgQuality, setJpgQuality] = useState(95);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      // Validate data
      const validation = validateQRData(qrConfig.type, qrConfig.data);
      if (!validation.valid) {
        alert(`Cannot export: ${validation.error}`);
        setIsExporting(false);
        return;
      }

      // Generate QR data string
      const qrData = generateQRData(qrConfig.type, qrConfig.data);
      if (!qrData) {
        alert('Please enter valid data before exporting');
        setIsExporting(false);
        return;
      }

      if (exportFormat === 'pdf') {
        await exportAsPDF(qrData);
      } else {
        await exportAsImage(qrData);
      }

      setIsExporting(false);
    } catch (err) {
      console.error('Export error:', err);
      alert('Failed to export QR code. Please try again.');
      setIsExporting(false);
    }
  };

  const exportAsImage = async (qrData) => {
    const QRCodeStyling = (await import('qr-code-styling')).default;

    // Prepare options
    const dotsOptions = { type: qrConfig.style.dotStyle || 'square' };
    if (qrConfig.style.gradient) {
      dotsOptions.gradient = {
        type: 'linear',
        rotation:
          qrConfig.style.gradient.direction === 'horizontal' ? 0 :
          qrConfig.style.gradient.direction === 'vertical' ? Math.PI / 2 :
          Math.PI / 4,
        colorStops: [
          { offset: 0, color: qrConfig.style.gradient.colorStops[0] },
          { offset: 1, color: qrConfig.style.gradient.colorStops[1] },
        ],
      };
    } else {
      dotsOptions.color = qrConfig.style.foregroundColor;
    }

    const cornerSquareOptions = { type: qrConfig.style.cornerSquareStyle || 'square' };
    if (qrConfig.style.gradient) {
      cornerSquareOptions.gradient = dotsOptions.gradient;
    } else {
      cornerSquareOptions.color = qrConfig.style.foregroundColor;
    }

    const cornerDotsOptions = { type: qrConfig.style.cornerDotStyle || 'square' };
    if (qrConfig.style.gradient) {
      cornerDotsOptions.gradient = dotsOptions.gradient;
    } else {
      cornerDotsOptions.color = qrConfig.style.foregroundColor;
    }

    // Prepare QR config
    const qrConfigOptions = {
      width: exportSize,
      height: exportSize,
      data: qrData,
      qrOptions: {
        errorCorrectionLevel: qrConfig.errorCorrectionLevel,
      },
      dotsOptions,
      cornerSquareOptions,
      cornerDotsOptions,
      backgroundOptions: {
        color: qrConfig.style.backgroundColor,
      },
    };

    // Add image options only if logo exists
    if (qrConfig.logo) {
      qrConfigOptions.image = qrConfig.logo.file;
      qrConfigOptions.imageOptions = {
        hideBackgroundDots: true,
        imageSize: qrConfig.logo.size / 100 || 0.2,
        margin: qrConfig.logo.padding ? 5 : 0,
      };
    }

    // Create QR code instance for export
    const qrCode = new QRCodeStyling(qrConfigOptions);

    // Generate filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `qr-${qrConfig.type}-${timestamp}`;

    // Download based on format
    if (exportFormat === 'svg') {
      await qrCode.download({
        name: filename,
        extension: 'svg',
      });
    } else {
      await qrCode.download({
        name: filename,
        extension: exportFormat,
        quality: exportFormat === 'jpeg' ? jpgQuality / 100 : undefined,
      });
    }
  };

  const exportAsPDF = async (qrData) => {
    const QRCodeStyling = (await import('qr-code-styling')).default;
    const { jsPDF } = await import('jspdf');

    // Prepare QR options (same as image export)
    const dotsOptions = { type: qrConfig.style.dotStyle || 'square' };
    if (qrConfig.style.gradient) {
      dotsOptions.gradient = {
        type: 'linear',
        rotation:
          qrConfig.style.gradient.direction === 'horizontal' ? 0 :
          qrConfig.style.gradient.direction === 'vertical' ? Math.PI / 2 :
          Math.PI / 4,
        colorStops: [
          { offset: 0, color: qrConfig.style.gradient.colorStops[0] },
          { offset: 1, color: qrConfig.style.gradient.colorStops[1] },
        ],
      };
    } else {
      dotsOptions.color = qrConfig.style.foregroundColor;
    }

    const cornerSquareOptions = { type: qrConfig.style.cornerSquareStyle || 'square' };
    if (qrConfig.style.gradient) {
      cornerSquareOptions.gradient = dotsOptions.gradient;
    } else {
      cornerSquareOptions.color = qrConfig.style.foregroundColor;
    }

    const cornerDotsOptions = { type: qrConfig.style.cornerDotStyle || 'square' };
    if (qrConfig.style.gradient) {
      cornerDotsOptions.gradient = dotsOptions.gradient;
    } else {
      cornerDotsOptions.color = qrConfig.style.foregroundColor;
    }

    // Prepare QR config for PDF
    const qrConfigOptions = {
      width: 1024,
      height: 1024,
      data: qrData,
      qrOptions: {
        errorCorrectionLevel: qrConfig.errorCorrectionLevel,
      },
      dotsOptions,
      cornerSquareOptions,
      cornerDotsOptions,
      backgroundOptions: {
        color: qrConfig.style.backgroundColor,
      },
    };

    // Add image options only if logo exists
    if (qrConfig.logo) {
      qrConfigOptions.image = qrConfig.logo.file;
      qrConfigOptions.imageOptions = {
        hideBackgroundDots: true,
        imageSize: qrConfig.logo.size / 100 || 0.2,
        margin: qrConfig.logo.padding ? 5 : 0,
      };
    }

    // Create QR code
    const qrCode = new QRCodeStyling(qrConfigOptions);

    // Get QR as blob
    const blob = await qrCode.getRawData('png');
    const reader = new FileReader();

    reader.onload = () => {
      const imgData = reader.result;

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Calculate centered position
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const qrSize = 100; // 100mm square
      const x = (pdfWidth - qrSize) / 2;
      const y = (pdfHeight - qrSize) / 2;

      // Add QR code to PDF
      pdf.addImage(imgData, 'PNG', x, y, qrSize, qrSize);

      // Download PDF
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      const filename = `qr-${qrConfig.type}-${timestamp}.pdf`;
      pdf.save(filename);
    };

    reader.readAsDataURL(blob);
  };

  const formats = [
    { id: 'png', label: 'PNG' },
    { id: 'jpeg', label: 'JPG' },
    { id: 'svg', label: 'SVG' },
    { id: 'pdf', label: 'PDF' },
  ];

  const sizes = [
    { value: 1024, label: '1024x1024' },
    { value: 2048, label: '2048x2048' },
    { value: 4096, label: '4096x4096' },
  ];

  return (
    <div className="space-y-4">
        {/* Format Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Format
          </label>
          <div className="grid grid-cols-4 gap-2">
            {formats.map((format) => (
              <button
                key={format.id}
                onClick={() => setExportFormat(format.id)}
                className={`px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                  exportFormat === format.id
                    ? 'border-primary bg-primary text-white'
                    : 'border-secondary-border bg-white text-gray-700 hover:border-primary-hover'
                }`}
              >
                {format.label}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selector (not for SVG or PDF) */}
        {exportFormat !== 'svg' && exportFormat !== 'pdf' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setExportSize(size.value)}
                  className={`px-3 py-2 rounded-lg border-2 transition-all text-xs ${
                    exportSize === size.value
                      ? 'border-primary bg-primary text-white'
                      : 'border-secondary-border bg-white text-gray-700 hover:border-primary-hover'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* JPG Quality Selector */}
        {exportFormat === 'jpeg' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quality: {jpgQuality}%
            </label>
            <input
              type="range"
              min="80"
              max="100"
              value={jpgQuality}
              onChange={(e) => setJpgQuality(Number(e.target.value))}
              className="w-full h-2 bg-secondary-border rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>80%</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* Export Info */}
        <div className="grid grid-cols-2 gap-3 text-sm bg-secondary-light p-3 rounded-lg">
          <div>
            <span className="text-gray-600">Format:</span>
            <span className="ml-2 font-medium">{exportFormat.toUpperCase()}</span>
          </div>
          <div>
            <span className="text-gray-600">Size:</span>
            <span className="ml-2 font-medium">
              {exportFormat === 'svg'
                ? 'Vector'
                : exportFormat === 'pdf'
                ? 'A4'
                : `${exportSize}px`}
            </span>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className={`
            w-full py-3 px-6 rounded-lg font-medium text-white
            transition-all
            ${
              isExporting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-hover active:bg-primary-active'
            }
          `}
        >
          {isExporting ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Exporting...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download {exportFormat.toUpperCase()}
            </span>
          )}
        </button>
    </div>
  );
}
