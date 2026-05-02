import React from 'react';
import { MapPin } from 'lucide-react';

export function BoothMap({ pinCode }: { pinCode: string }) {
  return (
    <div 
      className="w-full h-48 bg-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-600 mt-4 border-2 border-dashed border-slate-300"
      aria-label="Map showing polling booth location for PIN code"
      role="img"
    >
      <MapPin size={32} className="mb-2 text-blue-500" aria-hidden="true" />
      <p className="font-medium text-slate-800">Map visualization ready</p>
      <p className="text-sm">Simulating polling booth zone for PIN: <strong>{pinCode}</strong></p>
      <p className="text-xs text-slate-500 mt-2">(Google Maps Platform integration point)</p>
    </div>
  );
}
