
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LandParcel {
  id: string;
  owner: string;
  coordinates: [number, number];
  status: 'eligible' | 'voted' | 'ineligible';
}

interface Proposal {
  id: string;
  title: string;
  region: string;
  status: 'active' | 'passed' | 'pending';
}

interface LandMapProps {
  parcels: LandParcel[];
  proposals: Proposal[];
  interactive?: boolean;
}

const LandMap = ({ parcels, proposals, interactive = true }: LandMapProps) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-200/30 to-blue-200/30">
        {/* Grid lines to simulate map */}
        <svg className="absolute inset-0 w-full h-full" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)' }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Region Labels */}
      <div className="absolute top-4 left-4 space-y-2">
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">Downtown District</Badge>
      </div>
      
      <div className="absolute top-4 right-4 space-y-2">
        <Badge variant="secondary" className="bg-green-100 text-green-800">Riverfront Area</Badge>
      </div>
      
      <div className="absolute bottom-4 left-4 space-y-2">
        <Badge variant="secondary" className="bg-purple-100 text-purple-800">Northern Sector</Badge>
      </div>

      {/* Land Parcels */}
      {parcels.map((parcel, index) => {
        const x = 20 + (index * 30) + (index % 2) * 40;
        const y = 30 + (index * 25) + (index % 3) * 30;
        
        return (
          <div 
            key={parcel.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${interactive ? 'cursor-pointer hover:scale-110' : ''} transition-transform`}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div className={`relative group`}>
              {/* Parcel Marker */}
              <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center shadow-lg ${
                parcel.status === 'eligible' 
                  ? 'bg-green-500 border-green-600 text-white' 
                  : parcel.status === 'voted'
                  ? 'bg-blue-500 border-blue-600 text-white'
                  : 'bg-gray-400 border-gray-500 text-white'
              }`}>
                <MapPin className="h-6 w-6" />
              </div>
              
              {/* Tooltip */}
              {interactive && (
                <Card className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 min-w-48">
                  <CardContent className="p-3">
                    <div className="text-sm">
                      <p className="font-semibold">Land Parcel #{parcel.id}</p>
                      <p className="text-gray-600 truncate">Owner: {parcel.owner}</p>
                      <p className={`font-medium ${
                        parcel.status === 'eligible' ? 'text-green-600' :
                        parcel.status === 'voted' ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        Status: {parcel.status === 'eligible' ? 'Eligible to Vote' : 
                                parcel.status === 'voted' ? 'Vote Cast' : 'Ineligible'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );
      })}

      {/* Proposal Impact Zones */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Downtown zone */}
        <div className="absolute top-1/4 left-1/4 w-32 h-24 bg-blue-400/20 rounded-lg border-2 border-blue-400/40 border-dashed" />
        
        {/* Riverfront zone */}
        <div className="absolute top-1/3 right-1/4 w-40 h-20 bg-green-400/20 rounded-lg border-2 border-green-400/40 border-dashed" />
        
        {/* Northern zone */}
        <div className="absolute bottom-1/4 left-1/3 w-36 h-28 bg-purple-400/20 rounded-lg border-2 border-purple-400/40 border-dashed" />
      </div>

      {/* Legend */}
      {interactive && (
        <Card className="absolute bottom-4 right-4 bg-white/90 backdrop-blur">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2 text-sm">Legend</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Eligible to Vote</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Vote Cast</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded"></div>
                <span>Ineligible</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border-2 border-dashed border-blue-400"></div>
                <span>Proposal Area</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LandMap;
