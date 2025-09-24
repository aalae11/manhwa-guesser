import React from 'react';
import { X } from 'lucide-react';

const AdPlaceholder = ({ type = 'banner', className = '', onClose = null }) => {
  const getAdContent = () => {
    switch (type) {
      case 'sidebar':
        return {
          width: 'w-64',
          height: 'h-96',
          text: 'Sidebar Ad\n300x400',
          description: 'Google AdSense or similar ad will appear here'
        };
      case 'banner':
        return {
          width: 'w-full',
          height: 'h-20',
          text: 'Banner Ad - 728x90',
          description: 'Advertisement space'
        };
      case 'square':
        return {
          width: 'w-64',
          height: 'h-64',
          text: 'Square Ad\n250x250',
          description: 'Advertisement placeholder'
        };
      default:
        return {
          width: 'w-full',
          height: 'h-32',
          text: 'Advertisement',
          description: 'Ad space'
        };
    }
  };

  const adContent = getAdContent();

  return (
    <div className={`relative ${adContent.width} ${adContent.height} ${className}`}>
      <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close ad"
          >
            <X className="w-3 h-3" />
          </button>
        )}
        
        <div className="text-center">
          <div className="font-medium text-sm whitespace-pre-line mb-1">
            {adContent.text}
          </div>
          <div className="text-xs text-gray-400">
            {adContent.description}
          </div>
        </div>
      </div>
    </div>
  );
};

// Responsive ad component that switches based on screen size
export const ResponsiveAd = ({ className = '' }) => {
  return (
    <div className={className}>
      {/* Mobile: Banner ad */}
      <div className="md:hidden">
        <AdPlaceholder type="banner" />
      </div>
      
      {/* Desktop: Sidebar ad */}
      <div className="hidden md:block">
        <AdPlaceholder type="sidebar" />
      </div>
    </div>
  );
};

export default AdPlaceholder;