'use client';

import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

interface BackOfficeProps {
  onExit: () => void;
}

export function BackOffice({ onExit }: BackOfficeProps) {
  return (
    <div className="min-h-screen bg-[#0D0D12] relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-[#7F5AF0]/20 via-[#1B1B2F]/40 to-[#0D0D12]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[#F7EDEA] text-3xl font-semibold">Back Office Dashboard</h1>
          <Button
            onClick={onExit}
            variant="outline"
            className="bg-[#1B1B2F]/60 border-[#7F5AF0]/50 text-[#F7EDEA] hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
          >
            <LogOut className="mr-2" />
            Exit to App
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#1B1B2F]/60 border border-[#7F5AF0]/30 rounded-lg p-6">
            <h3 className="text-[#F7EDEA] text-xl mb-2">Dashboard</h3>
            <p className="text-[#E0E0E0]">Overview and statistics</p>
          </div>
          <div className="bg-[#1B1B2F]/60 border border-[#7F5AF0]/30 rounded-lg p-6">
            <h3 className="text-[#F7EDEA] text-xl mb-2">Users</h3>
            <p className="text-[#E0E0E0]">User management</p>
          </div>
          <div className="bg-[#1B1B2F]/60 border border-[#7F5AF0]/30 rounded-lg p-6">
            <h3 className="text-[#F7EDEA] text-xl mb-2">Content</h3>
            <p className="text-[#E0E0E0]">Content management</p>
          </div>
        </div>
      </div>
    </div>
  );
}
