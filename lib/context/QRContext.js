'use client';

import { createContext, useContext, useState } from 'react';

const QRContext = createContext();

export function QRProvider({ children }) {
  const [qrConfig, setQRConfig] = useState({
    type: 'url',
    data: {
      url: 'https://varnion.net.id',
      text: '',
      email: { address: '', subject: '', body: '' },
      phone: '',
      sms: { phone: '', message: '' },
      wifi: { ssid: '', password: '', encryption: 'WPA', hidden: false },
      vcard: {
        firstName: '',
        lastName: '',
        organization: '',
        phone: '',
        email: '',
        website: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      },
    },
    style: {
      foregroundColor: '#000000',
      backgroundColor: '#FFFFFF',
      gradient: null, // { type: 'linear', colorStops: ['#000000', '#000000'], direction: 'horizontal' }
      dotStyle: 'square',
      cornerSquareStyle: 'square',
      cornerDotStyle: 'square',
    },
    logo: null,
    errorCorrectionLevel: 'H',
    size: 1024,
    exportFormat: 'png',
  });

  const updateConfig = (updates) => {
    setQRConfig((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const updateData = (dataUpdates) => {
    setQRConfig((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        ...dataUpdates,
      },
    }));
  };

  const updateStyle = (styleUpdates) => {
    setQRConfig((prev) => ({
      ...prev,
      style: {
        ...prev.style,
        ...styleUpdates,
      },
    }));
  };

  return (
    <QRContext.Provider value={{ qrConfig, updateConfig, updateData, updateStyle }}>
      {children}
    </QRContext.Provider>
  );
}

export function useQRContext() {
  const context = useContext(QRContext);
  if (!context) {
    throw new Error('useQRContext must be used within QRProvider');
  }
  return context;
}
