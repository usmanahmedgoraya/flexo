"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function RepairOrder() {
    const [isOn, setIsOn] = useState<boolean>(true)
    const [vatCode, setVatCode] = useState<string>("2")

    // Define VAT percentages mapping with TypeScript
    const vatPercentages: Record<string, string> = {
        "1": "15%",
        "2": "35%",
        "3": "50%", // Modify if needed
    }

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-0">
            <div className="p-6 max-w-md border border-gray-200 rounded-md">
                <h1 className="text-lg font-medium mb-4">Repair order</h1>

                <div className="flex justify-between items-center mb-3">
                    <span className="text-sm">Manage the repairs</span>
                    <Switch checked={isOn} onCheckedChange={setIsOn} />
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-sm">VAT code applied</span>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{vatPercentages[vatCode] || "N/A"}</span>
                        <div className="relative">
                            <select
                                value={vatCode}
                                onChange={(e) => setVatCode(e.target.value)}
                                className="appearance-none  border border-gray-300 rounded px-2 py-1 pr-8 text-sm focus:outline-none"
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1">
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
