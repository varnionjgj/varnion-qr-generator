import QRTypeSelector from '../components/qr-type-selector/QRTypeSelector';
import QRInputForm from '../components/qr-type-selector/QRInputForm';
import QRPreview from '../components/qr-preview/QRPreview';
import ColorCustomizer from '../components/customization/ColorCustomizer';
import ShapeCustomizer from '../components/customization/ShapeCustomizer';
import LogoUploader from '../components/customization/LogoUploader';
import ErrorCorrectionSelector from '../components/customization/ErrorCorrectionSelector';
import ExportButton from '../components/export/ExportButton';
import Accordion from '../components/ui/Accordion';

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            QR Code Generator
          </h2>
          <p className="text-gray-600">
            Create customizable QR codes with advanced styling options
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls Section */}
          <div className="space-y-4">
            {/* QR Code Type - Always visible */}
            <div className="bg-white rounded-lg p-6 border border-secondary-border">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">QR Code Type</h3>
              <QRTypeSelector />
            </div>

            <Accordion title="QR Code Data" defaultExpanded={true}>
              <QRInputForm />
            </Accordion>

            <Accordion title="Colors" defaultExpanded={false}>
              <ColorCustomizer />
            </Accordion>

            <Accordion title="Shapes & Styles" defaultExpanded={false}>
              <ShapeCustomizer />
            </Accordion>

            <Accordion title="Logo" defaultExpanded={false}>
              <LogoUploader />
            </Accordion>

            <Accordion title="Error Correction" defaultExpanded={false}>
              <ErrorCorrectionSelector />
            </Accordion>

            {/* Export - Always visible */}
            <div className="bg-white rounded-lg p-6 border border-secondary-border">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Export</h3>
              <ExportButton />
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-6 h-fit">
            <QRPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
