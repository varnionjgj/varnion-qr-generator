/**
 * Generate QR code data string based on type and data
 */
export function generateQRData(type, data) {
  switch (type) {
    case 'url':
      return data.url || 'https://varnion.com';

    case 'text':
      return data.text || '';

    case 'email':
      const { address, subject, body } = data.email || {};
      if (!address) return '';

      let emailStr = `mailto:${address}`;
      const params = [];
      if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
      if (body) params.push(`body=${encodeURIComponent(body)}`);
      if (params.length > 0) emailStr += `?${params.join('&')}`;

      return emailStr;

    case 'phone':
      return data.phone ? `tel:${data.phone}` : '';

    case 'sms':
      const smsPhone = data.sms?.phone || '';
      const smsMessage = data.sms?.message || '';
      if (!smsPhone) return '';

      let smsStr = `sms:${smsPhone}`;
      if (smsMessage) smsStr += `?body=${encodeURIComponent(smsMessage)}`;

      return smsStr;

    case 'wifi':
      const { ssid, password, encryption, hidden } = data.wifi || {};
      if (!ssid) return '';

      // WiFi format: WIFI:T:WPA;S:mynetwork;P:mypassword;H:false;;
      let wifiStr = `WIFI:T:${encryption || 'WPA'};S:${ssid};`;
      if (password) wifiStr += `P:${password};`;
      wifiStr += `H:${hidden ? 'true' : 'false'};;`;

      return wifiStr;

    case 'vcard':
      const vcard = data.vcard || {};
      if (!vcard.firstName && !vcard.lastName) return '';

      // vCard 3.0 format
      let vcardStr = 'BEGIN:VCARD\n';
      vcardStr += 'VERSION:3.0\n';
      vcardStr += `N:${vcard.lastName || ''};${vcard.firstName || ''};;;\n`;
      vcardStr += `FN:${vcard.firstName || ''} ${vcard.lastName || ''}\n`;
      if (vcard.organization) vcardStr += `ORG:${vcard.organization}\n`;
      if (vcard.phone) vcardStr += `TEL:${vcard.phone}\n`;
      if (vcard.email) vcardStr += `EMAIL:${vcard.email}\n`;
      if (vcard.website) vcardStr += `URL:${vcard.website}\n`;
      if (vcard.street || vcard.city || vcard.state || vcard.zip || vcard.country) {
        vcardStr += `ADR:;;${vcard.street || ''};${vcard.city || ''};${vcard.state || ''};${vcard.zip || ''};${vcard.country || ''}\n`;
      }
      vcardStr += 'END:VCARD';

      return vcardStr;

    default:
      return '';
  }
}

/**
 * Validate QR data based on type
 */
export function validateQRData(type, data) {
  switch (type) {
    case 'url':
      try {
        new URL(data.url);
        return { valid: true, error: null };
      } catch {
        return { valid: false, error: 'Invalid URL format' };
      }

    case 'text':
      if (!data.text || data.text.length === 0) {
        return { valid: false, error: 'Text cannot be empty' };
      }
      if (data.text.length > 500) {
        return { valid: false, error: 'Text must be 500 characters or less' };
      }
      return { valid: true, error: null };

    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email?.address) {
        return { valid: false, error: 'Email address is required' };
      }
      if (!emailRegex.test(data.email.address)) {
        return { valid: false, error: 'Invalid email format' };
      }
      return { valid: true, error: null };

    case 'phone':
      if (!data.phone || data.phone.length === 0) {
        return { valid: false, error: 'Phone number is required' };
      }
      // Basic phone validation (at least 10 digits)
      const phoneDigits = data.phone.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        return { valid: false, error: 'Phone number must have at least 10 digits' };
      }
      return { valid: true, error: null };

    case 'sms':
      if (!data.sms?.phone) {
        return { valid: false, error: 'Phone number is required for SMS' };
      }
      const smsPhoneDigits = data.sms.phone.replace(/\D/g, '');
      if (smsPhoneDigits.length < 10) {
        return { valid: false, error: 'Phone number must have at least 10 digits' };
      }
      return { valid: true, error: null };

    case 'wifi':
      if (!data.wifi?.ssid) {
        return { valid: false, error: 'Network name (SSID) is required' };
      }
      if (!data.wifi?.password) {
        return { valid: false, error: 'Password is required' };
      }
      return { valid: true, error: null };

    case 'vcard':
      if (!data.vcard?.firstName && !data.vcard?.lastName) {
        return { valid: false, error: 'At least first name or last name is required' };
      }
      return { valid: true, error: null };

    default:
      return { valid: false, error: 'Unknown QR type' };
  }
}
