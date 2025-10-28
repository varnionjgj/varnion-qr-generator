# Product Requirements Document: Varnion QR Code Generator

## Document Control

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 1.3 | 2025-10-27 | Product Team | Draft |

---

## 1. Executive Summary

### 1.1 Project Overview
Varnion QR Code Generator is a web-based application that enables users to create customizable QR codes with advanced styling options. The application provides real-time preview, logo integration, and multiple export formats without requiring user authentication.

### 1.2 Project Goals
- Provide a fast, intuitive QR code generation tool accessible to anyone
- Support multiple QR code types for various use cases
- Enable advanced visual customization (colors, gradients, patterns, shapes)
- Deliver real-time preview for instant feedback
- Generate high-quality output in multiple formats (PNG, JPG, SVG, PDF)

### 1.3 Target Users
- **Marketing Professionals**: Creating branded QR codes for campaigns
- **Small Business Owners**: Generating QR codes for contact info, WiFi, menus
- **Event Organizers**: Creating QR codes for tickets, check-ins, information
- **General Users**: Anyone needing quick QR code generation for personal use

---

## 2. Technical Stack

### 2.1 Framework & Runtime
- **Framework**: Next.js 14+ (React) with App Router
- **Runtime**: Node.js 18+ (for VPS deployment)
- **Language**: JavaScript (ES6+) - No TypeScript for faster development iteration
- **Styling**: Tailwind CSS (rapid UI development)

### 2.2 Key Libraries
- **QR Generation**: `qrcode` or `qr-code-styling` (advanced customization)
- **Image Processing**: `sharp` (logo integration and format conversion)
- **PDF Generation**: `jspdf` (PDF export support)
- **File Handling**: `file-saver` (client-side downloads)
- **UI Components**: Radix UI or shadcn/ui (accessible component library)
- **Color Picker**: `react-colorful` or similar
- **Form Handling**: React Hook Form + Zod (validation)

### 2.3 Deployment
- **Target Environment**: VPS (Ubuntu/Debian)
- **Process Manager**: PM2
- **Web Server**: Nginx (reverse proxy)
- **No Docker**: Direct Node.js deployment

---

## 3. Functional Requirements

### 3.1 QR Code Types (Priority: P0)

The application must support 7 QR code types:

#### 3.1.1 URL
- Input: Website URL
- Validation: Valid URL format
- Example: `https://example.com`

#### 3.1.2 Plain Text
- Input: Any text string
- Limit: Up to 500 characters
- Use case: Messages, instructions, codes

#### 3.1.3 Email
- Input fields:
  - Email address (required)
  - Subject (optional)
  - Body message (optional)
- Format: `mailto:email@example.com?subject=...&body=...`

#### 3.1.4 Phone Number
- Input: Phone number with country code
- Format: `tel:+1234567890`
- Validation: Valid phone number format

#### 3.1.5 WiFi
- Input fields:
  - Network name (SSID) - required
  - Password - required
  - Encryption type (WPA/WEP/None) - required
  - Hidden network (checkbox) - optional
- Format: WiFi config format

#### 3.1.6 vCard (Contact)
- Input fields:
  - First name & Last name
  - Organization/Company
  - Phone number
  - Email
  - Website
  - Address (Street, City, State, Zip, Country)
- Format: vCard 3.0 standard

#### 3.1.7 SMS
- Input fields:
  - Phone number (required)
  - Message body (optional)
- Format: `sms:+1234567890?body=...`

### 3.2 Customization Features (Priority: P0)

#### 3.2.1 Color Customization
- **Foreground Color**: Main QR code color (default: black)
- **Background Color**: Background color (default: white)
- **Gradient Support**:
  - Linear gradient option
  - Two-color gradient selector
  - Gradient direction selector (horizontal, vertical, diagonal)
- **Color Input Methods**:
  - Color picker
  - Hex input
  - Recent colors history (session-based)

#### 3.2.2 Shape & Pattern Customization
- **Dot/Module Styles**:
  - Square (default)
  - Rounded squares
  - Dots (circular)
  - Extra rounded
- **Corner Square Styles**:
  - Square (default)
  - Rounded
  - Extra rounded
  - Dot
- **Corner Dot Styles**:
  - Square (default)
  - Rounded
  - Dot

#### 3.2.3 Logo Integration
- **Default Logo**:
  - Application loads with a predefined default logo (Varnion brand logo)
  - Default logo acts as placeholder and visual example
  - Users can customize or replace the default logo with their own
  - Option to remove logo entirely and generate QR code without any logo
- **Upload Requirements**:
  - Supported formats: PNG, JPG, JPEG, SVG
  - Max file size: 2MB
  - Supported shapes: Square, circular, and rectangular logos
- **Logo Controls**:
  - Size adjustment (10% - 30% of QR code size)
  - Position: Center only (for optimal scanning)
  - Background: Option to add white padding around logo
  - "Replace Logo" button (to upload custom logo)
  - "Remove Logo" button (to clear and generate without logo)
  - "Reset to Default" button (to restore Varnion default logo)
- **Validation**:
  - File type validation
  - File size validation
  - Image dimension check (min 100x100px)
  - Aspect ratio support (1:1 for square, any ratio for rectangular)

#### 3.2.4 Error Correction Level
- Options: Low (7%), Medium (15%), Quartile (25%), High (30%)
- Default: High (recommended with logo)
- Info tooltip explaining each level

### 3.3 Real-Time Preview (Priority: P0)
- Live preview canvas showing QR code as user makes changes
- Debounced updates (300ms) for performance
- Preview size: Responsive, minimum 300x300px
- Loading indicator during generation
- Error state display if generation fails

### 3.4 Export & Download (Priority: P0)

#### 3.4.1 Export Formats
- **PNG**: High resolution (1024x1024px, 2048x2048px, 4096x4096px)
- **JPG**: High quality (1024x1024px, 2048x2048px, 4096x4096px)
- **SVG**: Vector format (scalable)
- **PDF**: Document format (A4, Letter, or custom size with QR code centered)

#### 3.4.2 Export Options
- Format selector (PNG/JPG/SVG/PDF)
- Size selector dropdown:
  - For PNG/JPG: 1024px, 2048px, 4096px
  - For SVG: Scalable (no size needed)
  - For PDF: A4, Letter, or Custom dimensions
- Quality selector (for JPG only: 90%, 95%, 100%)
- Download button with format indicator
- Filename: Auto-generated based on type and timestamp
  - Example: `qr-url-2025-10-27-143022.png`
  - Example: `qr-wifi-2025-10-27-143022.pdf`

### 3.5 Additional Features

#### 3.5.1 Reset Functionality
- "Reset All" button to clear all inputs and customizations
- Confirmation modal before reset
- Return to default state

#### 3.5.2 Template System (Priority: P1 - Nice to have)
- Pre-designed style templates (color schemes + patterns)
- Example templates:
  - Classic (black & white)
  - Modern (gradient, rounded)
  - Bold (high contrast colors)
  - Minimal (soft colors, dots)

---

## 4. Non-Functional Requirements

### 4.1 Performance
- Initial page load: < 2 seconds
- QR code generation: < 500ms
- Real-time preview update: < 300ms debounce
- Export generation: < 2 seconds for high-res images

### 4.2 Usability
- Intuitive UI requiring no tutorial
- Responsive design (mobile, tablet, desktop)
- Clear error messages and validation feedback
- Accessible (WCAG 2.1 AA compliance)
- Keyboard navigation support

### 4.3 Compatibility
- **Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Screen Sizes**: 320px (mobile) to 4K displays

### 4.4 Reliability
- QR codes must be scannable across all major QR readers
- No data loss during generation process
- Graceful error handling with user-friendly messages
- Input validation preventing invalid QR codes

### 4.5 Security
- Input sanitization to prevent XSS
- File upload validation (type, size, content)
- No sensitive data logging
- CSP headers implementation
- Rate limiting for API endpoints

### 4.6 Scalability
- Handle 1000+ concurrent users
- Optimized bundle size (< 500KB initial JS)
- Lazy loading for non-critical components
- Image optimization

---

## 5. User Interface & Experience

### 5.1 Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│                    Header / Navigation                   │
├──────────────────────────┬──────────────────────────────┤
│                          │                              │
│   QR Type Selector       │       QR Preview Canvas      │
│   Input Fields           │       (Real-time updates)    │
│   (Dynamic based on      │                              │
│    selected type)        │       Size: Responsive       │
│                          │                              │
├──────────────────────────┤                              │
│                          │                              │
│   Customization Panel    │                              │
│   ├─ Colors              │                              │
│   ├─ Shapes/Patterns     │                              │
│   ├─ Logo Upload         │                              │
│   └─ Error Correction    │                              │
│                          │                              │
├──────────────────────────┴──────────────────────────────┤
│           Export Options & Download Button               │
└─────────────────────────────────────────────────────────┘
```

### 5.2 User Flow

1. **Landing**: User sees default QR code (sample URL)
2. **Select Type**: Choose QR code type from dropdown/tabs
3. **Input Data**: Fill in required fields (validated in real-time)
4. **Customize** (Optional):
   - Adjust colors/gradients
   - Change shapes/patterns
   - Upload logo
5. **Preview**: View real-time QR code updates
6. **Export**: Select format/size and download

### 5.3 Design Guidelines

#### 5.3.1 Visual Design
- Clean, modern interface
- **Primary color**: #2A3D82 (Navy blue - Varnion brand color)
  - Use for buttons, links, accents, focus states
  - Hover state: Lighter shade (#3A4D92)
  - Active state: Darker shade (#1A2D72)
- **Secondary colors** (derived from primary):
  - Light backgrounds: #F0F2F8 (very light blue-gray)
  - Text on primary: #FFFFFF (white)
  - Borders and dividers: #D0D5E8 (light gray-blue)
- Neutral backgrounds (white/light gray)
- Clear visual hierarchy
- Consistent spacing (8px grid system)
- All components (buttons, inputs, tabs, etc.) styled with primary color theme

#### 5.3.2 Typography
- Headings: 24px, 20px, 18px (bold)
- Body text: 16px (regular)
- Labels: 14px (medium)
- Captions: 12px (regular)

#### 5.3.3 Components
- Rounded buttons (8px radius)
- Input fields with clear labels
- Collapsible sections for customization
- Color picker with recent colors
- File upload drag-and-drop area

#### 5.3.4 Responsive Behavior
- **Desktop (1024px+)**: Side-by-side layout (controls | preview)
- **Tablet (768px-1023px)**: Stacked layout, preview below controls
- **Mobile (320px-767px)**: Full-width stacked, preview at bottom

### 5.4 Accessibility
- All interactive elements keyboard accessible
- Focus indicators on all interactive elements
- ARIA labels for icon buttons
- Color contrast ratio > 4.5:1
- Screen reader announcements for real-time updates
- Alt text for images and logos

---

## 6. Technical Specifications

### 6.1 Architecture

#### 6.1.1 Frontend (Client-Side)
```
/app
  /page.js                  # Main QR generator page
  /layout.js               # Root layout
  /api
    /generate-qr/route.js  # QR generation endpoint (optional)
    /health/route.js       # Health check endpoint
/components
  /qr-generator            # QR generation logic
  /qr-preview              # Preview canvas
  /qr-type-selector        # Type selection
  /customization           # Customization panels
  /export                  # Export controls
/lib
  /qr-generator.js         # QR generation utilities
  /validators.js           # Input validation
  /utils.js                # Helper functions
/public
  /assets
    /default-logo.jpg      # Varnion default logo (predefined)
```


### 6.2 Data Models

#### 6.2.1 QR Configuration Object Structure
```javascript
// Example QR Configuration Object
const qrConfig = {
  // Type & Content
  type: 'url', // 'url' | 'text' | 'email' | 'phone' | 'wifi' | 'vcard' | 'sms'
  data: {}, // Object structure varies based on QR type

  // Customization
  style: {
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
    gradient: {
      type: 'linear',
      colorStops: ['#2A3D82', '#3A4D92'],
      direction: 'horizontal' // 'horizontal' | 'vertical' | 'diagonal'
    },
    dotStyle: 'square', // 'square' | 'rounded' | 'dots' | 'extra-rounded'
    cornerSquareStyle: 'square', // 'square' | 'rounded' | 'extra-rounded' | 'dot'
    cornerDotStyle: 'square' // 'square' | 'rounded' | 'dot'
  },

  // Logo
  logo: {
    file: null, // File object or URL string
    size: 20, // percentage (10-30)
    padding: true
  },

  // Technical
  errorCorrectionLevel: 'H', // 'L' | 'M' | 'Q' | 'H'
  size: 1024 // export size in pixels
};
```

### 6.3 API Endpoints

#### 6.3.1 Optional Server-Side Generation
```
POST /api/generate-qr
Request Body: QRConfig
Response: { imageUrl: string } or { error: string }
Status Codes: 200 (success), 400 (invalid input), 500 (server error)
```

Note: Primary generation should be client-side for performance. Server-side endpoint is optional for complex operations.

### 6.4 State Management
- **React Context**: Global state for QR configuration
- **useState**: Local component state
- **useReducer**: Complex state logic (QR config updates)

### 6.5 File Processing
- Client-side image processing using Canvas API
- Logo resizing and positioning via canvas
- Format conversion (PNG ↔ JPG ↔ SVG ↔ PDF)
- PDF generation with jsPDF (embed QR code as image in PDF document)

---

## 7. Development Phases

### Phase 1: MVP (Weeks 1-2)
**Goal**: Core functionality working

- [ ] Project setup (Next.js 14+, JavaScript, Tailwind)
- [ ] Basic UI layout (responsive)
- [ ] 3 QR types: URL, Text, Email
- [ ] Basic customization: Foreground/background colors
- [ ] Real-time preview
- [ ] PNG export (single size: 1024x1024)

### Phase 2: Extended Features (Weeks 3-4)
**Goal**: Full feature set

- [ ] Remaining QR types: Phone, WiFi, vCard, SMS
- [ ] Advanced customization: Gradients, shapes, patterns
- [ ] Logo upload and integration (with default Varnion logo)
- [ ] Support for rectangular, square, and circular logos
- [ ] Multiple export formats: PNG, JPG, SVG, PDF
- [ ] Multiple export sizes
- [ ] Error correction level selector

### Phase 3: Polish & Optimization (Week 5)
**Goal**: Production-ready

- [ ] UI/UX refinements
- [ ] Performance optimization
- [ ] Accessibility improvements (WCAG AA)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] Error handling and edge cases
- [ ] Documentation (user guide, deployment guide)

### Phase 4: Deployment (Week 6)
**Goal**: Live on VPS

- [ ] VPS setup and configuration
- [ ] Nginx configuration (reverse proxy, SSL)
- [ ] PM2 setup for process management
- [ ] Environment configuration
- [ ] Monitoring setup (logs, uptime)
- [ ] Backup strategy
- [ ] Load testing
- [ ] Go-live

---

## 8. Out of Scope (Version 1.0)

The following features are **NOT** included in the initial release:

- User authentication and accounts
- QR code history or storage
- Batch QR code generation
- QR code analytics/tracking
- API for third-party integration
- QR code editing (re-upload existing QR to modify)
- Advanced analytics (scan tracking)
- Team collaboration features
- White-label/custom branding options
- Payment processing (if monetization planned later)

These may be considered for future versions based on user feedback and business requirements.

---

## 9. Success Metrics

### 9.1 Technical Metrics
- **Performance**: Page load < 2s, QR generation < 500ms
- **Uptime**: 99.5% availability
- **Error Rate**: < 0.5% of generations fail
- **Browser Compatibility**: Works on 95%+ of target browsers

### 9.2 User Metrics (Post-Launch)
- **User Engagement**:
  - Avg. session duration > 3 minutes
  - QR codes generated per session > 2
- **Feature Adoption**:
  - % of users using customization features > 40%
  - % of users uploading logos > 25%
- **User Satisfaction**:
  - Perceived ease of use rating > 4/5
  - Would recommend to others > 70%

### 9.3 Business Metrics (If Applicable)
- Monthly active users (MAU) growth
- Conversion rate (if monetization exists)
- Return user rate

---

## 10. Risks & Mitigations

### 10.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| QR codes not scanning reliably | High | Medium | Extensive testing with multiple scanners, strict validation, high error correction default |
| Performance issues with real-time preview | Medium | Low | Debouncing, web workers for heavy operations, optimization |
| Logo integration breaking QR readability | High | Medium | Size limits, positioning constraints, error correction level guidance |
| Browser compatibility issues | Medium | Low | Polyfills, fallbacks, cross-browser testing |

### 10.2 User Experience Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| UI too complex for casual users | Medium | Medium | User testing, progressive disclosure, tooltips, defaults |
| Mobile experience subpar | High | Low | Mobile-first design, responsive testing |
| Export file sizes too large | Low | Low | Configurable sizes, format guidance |

---

## 11. Dependencies & Assumptions

### 11.1 Dependencies
- Node.js 18+ availability on target VPS
- Modern browser usage by target audience
- Stable internet connection for initial load
- VPS with sufficient resources (2GB RAM minimum recommended)

### 11.2 Assumptions
- Users have basic understanding of QR codes
- Primary usage on desktop/laptop (mobile as secondary)
- Users will mostly generate individual QR codes (not batch)
- VPS will be managed by someone with basic Linux/server knowledge
- SSL certificate will be obtained (Let's Encrypt recommended)

---

## 12. Deployment Specifications

### 12.1 Server Requirements
- **OS**: Ubuntu 20.04+ or Debian 11+
- **CPU**: 2+ cores
- **RAM**: 2GB minimum, 4GB recommended
- **Storage**: 20GB minimum
- **Network**: Static IP address, domain name (optional but recommended)

### 12.2 Software Stack (VPS)
- **Node.js**: v18.x or v20.x (LTS)
- **PM2**: Latest stable (process manager)
- **Nginx**: Latest stable (reverse proxy)
- **SSL**: Let's Encrypt (Certbot)

### 12.3 Deployment Steps (Summary)
1. Clone repository to VPS
2. Install dependencies: `npm install`
3. Build production bundle: `npm run build`
4. Configure environment variables
5. Setup PM2 to run Next.js
6. Configure Nginx reverse proxy
7. Setup SSL certificate
8. Configure firewall (UFW)
9. Setup monitoring and logs

---

## 13. Maintenance & Support

### 13.1 Monitoring
- Server uptime monitoring
- Application error logging
- Performance monitoring (response times)
- Disk space monitoring

### 13.2 Updates & Maintenance
- Regular dependency updates (security patches)
- Node.js version updates
- Feature enhancements based on feedback
- Bug fixes as reported

### 13.3 Documentation Deliverables
- User guide (how to use the application)
- Deployment guide (VPS setup instructions)
- Developer documentation (code structure, how to contribute)
- API documentation (if server-side endpoints used)

---

## 14. Acceptance Criteria

The project will be considered complete when:

1. **All 7 QR code types** are implemented and functional
2. **Real-time preview** updates within 300ms of user input
3. **All customization features** (colors, gradients, shapes, logo) work correctly
4. **Default Varnion logo** loads on page load and can be replaced or removed
5. **Export in PNG, JPG, SVG, and PDF** formats at multiple resolutions
6. **All generated QR codes** scan successfully on major QR readers (iOS Camera, Google Lens, dedicated QR apps)
7. **Responsive design** works on mobile (320px+), tablet, and desktop
8. **Cross-browser compatibility** verified on Chrome, Firefox, Safari, Edge
9. **Performance targets** met (load time, generation time)
10. **Deployed successfully** on VPS with PM2 and Nginx
11. **Basic documentation** provided (user guide, deployment guide)

---

## 15. Glossary

- **QR Code**: Quick Response code, a 2D barcode readable by camera
- **Error Correction**: QR code redundancy allowing partial damage/obstruction
- **vCard**: Digital business card format
- **SVG**: Scalable Vector Graphics, resolution-independent image format
- **VPS**: Virtual Private Server
- **PM2**: Node.js process manager for production
- **Nginx**: Web server and reverse proxy
- **Real-time Preview**: Instant visual feedback as user changes inputs

---

## Document Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-10-27 | Initial PRD created | Product Team |
| 1.1 | 2025-10-27 | Added: PDF export support, default Varnion logo feature, rectangular logo support, specified primary color (#2A3D82) and color palette | Product Team |
| 1.2 | 2025-10-27 | Changed: TypeScript → JavaScript (ES6+) for faster development without compilation | Product Team |
| 1.3 | 2025-10-27 | Updated: Default logo file format from .png to .jpg | Product Team |

---

**End of Product Requirements Document**
