'use client';

import { useEffect, useRef, useState } from 'react';
import { useQRContext } from '../../lib/context/QRContext';
import { generateQRData, validateQRData } from '../../lib/qr-generator';

export default function QRPreview() {
  const { qrConfig } = useQRContext();
  const canvasRef = useRef(null);
  const qrCodeRef = useRef(null);
  const [error, setError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Dynamically import qr-code-styling only on client side
    let timeoutId;

    const generateQR = async () => {
      setIsGenerating(true);
      setError(null);

      // Debounce QR generation
      clearTimeout(timeoutId);

      timeoutId = setTimeout(async () => {
        try {
          // Validate data
          const validation = validateQRData(qrConfig.type, qrConfig.data);
          if (!validation.valid) {
            setError(validation.error);
            setIsGenerating(false);
            return;
          }

          // Generate QR data string
          const qrData = generateQRData(qrConfig.type, qrConfig.data);
          if (!qrData) {
            setError('Please enter valid data');
            setIsGenerating(false);
            return;
          }

          // Dynamically import QRCodeStyling
          const QRCodeStyling = (await import('qr-code-styling')).default;

          // Prepare dots options with gradient or solid color
          const dotsOptions = {
            type: qrConfig.style.dotStyle || 'square',
          };

          if (qrConfig.style.gradient) {
            // Use gradient
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
            // Use solid color
            dotsOptions.color = qrConfig.style.foregroundColor;
          }

          // Prepare corner square options
          const cornerSquareOptions = {
            type: qrConfig.style.cornerSquareStyle || 'square',
          };

          if (qrConfig.style.gradient) {
            cornerSquareOptions.gradient = dotsOptions.gradient;
          } else {
            cornerSquareOptions.color = qrConfig.style.foregroundColor;
          }

          // Prepare corner dots options
          const cornerDotsOptions = {
            type: qrConfig.style.cornerDotStyle || 'square',
          };

          if (qrConfig.style.gradient) {
            cornerDotsOptions.gradient = dotsOptions.gradient;
          } else {
            cornerDotsOptions.color = qrConfig.style.foregroundColor;
          }

          // Prepare QR config
          const qrConfigOptions = {
            width: 400,
            height: 400,
            data: qrData,
            qrOptions: {
              errorCorrectionLevel: qrConfig.errorCorrectionLevel,
            },
            dotsOptions,
            cornersSquareOptions: cornerSquareOptions,
            cornersDotOptions: cornerDotsOptions,
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

          // Always recreate QR code to ensure logo removal works
          qrCodeRef.current = new QRCodeStyling(qrConfigOptions);

          // Clear canvas and append new QR
          if (canvasRef.current) {
            canvasRef.current.innerHTML = '';
            qrCodeRef.current.append(canvasRef.current);
          }

          setIsGenerating(false);
        } catch (err) {
          console.error('QR generation error:', err);
          setError('Failed to generate QR code');
          setIsGenerating(false);
        }
      }, 300); // 300ms debounce
    };

    generateQR();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [qrConfig]);

  return (
    <div className="bg-white rounded-lg p-6 border border-secondary-border">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Preview</h3>

      <div className="flex flex-col items-center justify-center">
        {error ? (
          <div className="flex items-center justify-center min-h-[400px] w-full bg-secondary-light rounded-lg">
            <div className="text-center p-6">
              <div className="text-red-500 text-4xl mb-2">⚠️</div>
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            {isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10 rounded-lg">
                <div className="text-primary">Generating...</div>
              </div>
            )}
            <div
              ref={canvasRef}
              className="flex items-center justify-center min-h-[400px] w-[400px] bg-white rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
