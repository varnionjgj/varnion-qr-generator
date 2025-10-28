import './globals.css';
import { QRProvider } from '../lib/context/QRContext';

export const metadata = {
  title: 'Varnion QR Code Generator',
  description: 'Create customizable QR codes with advanced styling options',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <header className="bg-primary text-white py-4 px-6 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Varnion QR Generator</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <QRProvider>
            {children}
          </QRProvider>
        </main>
        <footer className="bg-gray-100 text-gray-600 py-6 px-6 mt-12 border-t border-gray-200">
          <div className="container mx-auto text-center">
            <p className="text-sm mb-2">
              © 2025 Varnion. All rights reserved.
            </p>
            <p className="text-sm">
              Powered by{' '}
              <a
                href="https://www.varnion.net.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-hover font-medium underline"
              >
                Varnion
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
