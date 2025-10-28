'use client';

import { useQRContext } from '../../lib/context/QRContext';
import URLInput from './URLInput';
import TextInput from './TextInput';
import EmailInput from './EmailInput';
import PhoneInput from './PhoneInput';
import SMSInput from './SMSInput';
import WiFiInput from './WiFiInput';
import VCardInput from './VCardInput';

export default function QRInputForm() {
  const { qrConfig } = useQRContext();

  const renderInput = () => {
    switch (qrConfig.type) {
      case 'url':
        return <URLInput />;
      case 'text':
        return <TextInput />;
      case 'email':
        return <EmailInput />;
      case 'phone':
        return <PhoneInput />;
      case 'sms':
        return <SMSInput />;
      case 'wifi':
        return <WiFiInput />;
      case 'vcard':
        return <VCardInput />;
      default:
        return null;
    }
  };

  return <div>{renderInput()}</div>;
}
