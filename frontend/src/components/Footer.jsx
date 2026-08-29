import React from 'react';
import { Info } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 border-t border-emerald-900/40 bg-[#040a06] text-center text-xs text-emerald-400/70">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-2">
        <Info className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          Prototype demonstration using simulated market data. Production version can integrate verified market data sources such as Agmarknet/data.gov.in.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
