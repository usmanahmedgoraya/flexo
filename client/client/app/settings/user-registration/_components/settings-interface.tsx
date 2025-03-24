"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

type SettingsState = {
  checkUpdateAtStartup: boolean;
  touchKeyboard: boolean;
  arrondir: boolean;
  identificationBeforeSale: boolean;
  managementPanels: boolean;
  keyboardCapital: boolean;
  lastDocumentType: boolean;
  checkStockAtSale: boolean;
  includeSalesInbound: boolean;
  includeVentesClients: boolean;
  simplifiedReport: boolean;
  keepLocalHistory: boolean;
  
 
};

const SettingsInterface: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    checkUpdateAtStartup: true,
    touchKeyboard: false,
    arrondir: false,
    identificationBeforeSale: false,
    managementPanels: true,
    keyboardCapital: true,
    lastDocumentType: false,
    checkStockAtSale: true,
    includeSalesInbound: false,
    includeVentesClients: false,
    simplifiedReport: false,
    keepLocalHistory: true,
  });

  const toggleSetting = (setting: keyof SettingsState): void => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const [backupDrive, setBackupDrive] = useState<string>("DISQUE C:");

  return (
 <div className="w-full max-w-full mx-auto p-6 ">
        <div className=" max-w-4xl mx-auto p-6 font-sans mb-28 border border-gray-200 rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-bold text-lg mb-4">Optional parameters</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Check the Update at startup</span>
              <Switch checked={settings.checkUpdateAtStartup} onCheckedChange={() => toggleSetting("checkUpdateAtStartup")} />
            </div>
            <div className="flex justify-between items-center">
              <span>Touch keyboard enabled by default</span>
              <Switch checked={settings.touchKeyboard} onCheckedChange={() => toggleSetting("touchKeyboard")} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-red-700">Arrondir les paiement CASH sur 5 cents</span>
              <Switch checked={settings.arrondir} onCheckedChange={() => toggleSetting("arrondir")} />
            </div>
            <div className="flex justify-between items-center">
              <span>Backup at closing on</span>
              <select value={backupDrive} onChange={(e) => setBackupDrive(e.target.value)} className="border border-gray-300 px-2 py-1 w-32">
                <option value="DISQUE C:">DISQUE C:</option>
                <option value="DISQUE D:">DISQUE D:</option>
                <option value="DISQUE E:">DISQUE E:</option>
              </select>
            </div>


            {/* ///counter sales */}

            <div>
          <h2 className="font-bold text-lg mb-4">Counter Sales</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Identification before each sale</span>
              <Switch checked={settings.identificationBeforeSale} onCheckedChange={() => toggleSetting("identificationBeforeSale")} />
            </div>
            <div className="flex justify-between items-center">
              <span>Management panels</span>
              <Switch checked={settings.managementPanels} onCheckedChange={() => toggleSetting("managementPanels")} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-red-700">keyboard in Capital activated</span>
              <Switch checked={settings.keyboardCapital} onCheckedChange={() => toggleSetting("keyboardCapital")} />
            </div>
            <div className="flex justify-between items-center">
              <span>Proposes the last type of document used</span>
              <Switch checked={settings.lastDocumentType} onCheckedChange={() => toggleSetting("lastDocumentType")} />
            </div>
            <div className="flex justify-between items-center">
              <span>Check the stock at the sale</span>
              <Switch checked={settings.checkStockAtSale} onCheckedChange={() => toggleSetting("checkStockAtSale")} />
            </div>
          
          </div>
        </div>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-4">Stock management</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Include sales in Inbound History</span>
              <Switch checked={settings.includeSalesInbound} onCheckedChange={() => toggleSetting("includeSalesInbound")} />
            </div>
          </div>
          <h2 className="font-bold text-lg mt-6 mb-4">Optional parameters</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Inclure ventes par clients dans clôture</span>
              <Switch checked={settings.includeVentesClients} onCheckedChange={() => toggleSetting("includeVentesClients")} />
            </div>
            <div className="flex justify-between items-center">
              <span>Simplified financial report</span>
              <Switch checked={settings.simplifiedReport} onCheckedChange={() => toggleSetting("simplifiedReport")} />
            </div>
          </div>
          <div className="mt-6">
            <h2 className="font-bold text-red-700 mb-1">Multi-store version</h2>
            <p className="text-sm mb-2">Keep a local history</p>
            <div className="flex items-center mb-4">
              <Switch checked={settings.keepLocalHistory} onCheckedChange={() => toggleSetting("keepLocalHistory")} />
            </div>
            <p className="text-sm italic">Off: Data will be deleted locally after being sent to the server</p>
          </div>
        </div>
      </div>
    </div>
 </div>
  );
};

export default SettingsInterface;
