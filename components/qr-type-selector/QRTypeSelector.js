'use client';

import { useQRContext } from '../../lib/context/QRContext';

const QR_TYPES = [
  {
    id: 'url',
    label: 'URL',
    icon: '🌐',
    description: 'Link to websites, landing pages, or online content'
  },
  {
    id: 'text',
    label: 'Text',
    icon: '📝',
    description: 'Plain text messages, instructions, or codes (up to 500 chars)'
  },
  {
    id: 'email',
    label: 'Email',
    icon: '📧',
    description: 'Send emails with pre-filled subject and message'
  },
  {
    id: 'phone',
    label: 'Phone',
    icon: '📱',
    description: 'Dial phone numbers directly'
  },
  {
    id: 'sms',
    label: 'SMS',
    icon: '💬',
    description: 'Send SMS messages with pre-filled text'
  },
  {
    id: 'wifi',
    label: 'WiFi',
    icon: '📶',
    description: 'Share WiFi network credentials for easy connection'
  },
  {
    id: 'vcard',
    label: 'Contact',
    icon: '👤',
    description: 'Share contact information (business cards, address book)'
  },
];

export default function QRTypeSelector() {
  const { qrConfig, updateConfig } = useQRContext();

  const handleTypeChange = (type) => {
    updateConfig({ type });
  };

  const selectedType = QR_TYPES.find(t => t.id === qrConfig.type);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {QR_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => handleTypeChange(type.id)}
            className={`
              px-4 py-3 rounded-lg border-2 transition-all
              flex flex-col items-center gap-1
              ${
                qrConfig.type === type.id
                  ? 'border-primary bg-primary text-white'
                  : 'border-secondary-border bg-white text-gray-700 hover:border-primary-hover'
              }
            `}
            aria-label={`${type.label} QR code type`}
          >
            <span className="text-2xl" aria-hidden="true">{type.icon}</span>
            <span className="text-sm font-medium">{type.label}</span>
          </button>
        ))}
      </div>

      {selectedType && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-900">
            <span className="font-medium">{selectedType.label}:</span> {selectedType.description}
          </p>
        </div>
      )}
    </div>
  );
}
