'use client';

interface RouteInfoPanelProps {
  route: google.maps.DirectionsResult | null;
  destinationName: string;
  onClose: () => void;
}

export default function RouteInfoPanel({ route, destinationName, onClose }: RouteInfoPanelProps) {
  if (!route) return null;

  const leg = route.routes[0]?.legs[0];
  if (!leg) return null;

  return (
    <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-2xl w-[calc(100vw-2rem)] max-w-sm sm:w-80 z-10 overflow-hidden border border-gray-200">
      {/* Header with green theme for directions */}
      <div className="bg-green-700 text-white px-2 sm:px-4 py-1.5 sm:py-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-lg font-bold">Directions to</h3>
            <p className="text-xs sm:text-sm opacity-90 mt-0.5 sm:mt-1 truncate">{destinationName}</p>
          </div>
          <button
            onClick={onClose}
            className="px-1.5 sm:px-3 py-0.5 sm:py-1 bg-white text-green-700 rounded-lg hover:bg-gray-100 text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0"
            aria-label="End route"
          >
            End
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-4">
        <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
          <div className="bg-gray-50 p-1.5 sm:p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-1 mb-0.5 sm:mb-1">
              <span className="text-base sm:text-xl">🚶</span>
              <p className="text-xs text-gray-500 font-bold">Walk</p>
            </div>
            <p className="text-sm sm:text-lg font-bold text-gray-900">{leg.duration?.text}</p>
          </div>
          <div className="bg-gray-50 p-1.5 sm:p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-1 mb-0.5 sm:mb-1">
              <span className="text-base sm:text-xl">📏</span>
              <p className="text-xs text-gray-500 font-bold">Dist</p>
            </div>
            <p className="text-sm sm:text-lg font-bold text-gray-900">{leg.distance?.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
