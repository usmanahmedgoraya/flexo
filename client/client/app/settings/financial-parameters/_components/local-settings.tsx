"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function LocalSettings() {
  const [fidelityEnabled, setFidelityEnabled] = useState(false)

  return (
    <div className="w-full max-w-5xl flex justify-center p-10   mb-6 ">
      <Card className="  border border-gray-200 w-full pt-6">
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Local Settings Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Local Settings</h3>
                <div className="h-1 w-10 bg-primary rounded-full"></div>
              </div>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="decimal" className="text-sm font-medium">
                    Decimal
                  </Label>
                  <Input id="decimal" defaultValue="2" className="bg-white dark:bg-slate-800" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="currency" className="text-sm font-medium">
                    Currency Symbol
                  </Label>
                  <Input id="currency" defaultValue="€" className="bg-white dark:bg-slate-800" />
                </div>
              </div>
            </div>

            <Separator className="md:hidden" />

            {/* Fidelity Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Fidelity</h3>
                <div className="h-1 w-10 bg-primary rounded-full"></div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="fidelity-switch" className="text-sm font-medium">
                    Enable fidelity
                  </Label>
                  <Switch id="fidelity-switch" checked={fidelityEnabled} onCheckedChange={setFidelityEnabled} />
                </div>
                <div className={`space-y-3 ${fidelityEnabled ? "opacity-100" : "opacity-50"}`}>
                  <div className="space-y-1.5">
                    <Label htmlFor="bonus" className="text-sm font-medium">
                      A bonus of
                    </Label>
                    <Input
                      id="bonus"
                      defaultValue="0"
                      disabled={!fidelityEnabled}
                      className="bg-white dark:bg-slate-800"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="purchase" className="text-sm font-medium">
                      will be granted after a total purchase of
                    </Label>
                    <Input
                      id="purchase"
                      defaultValue="0"
                      disabled={!fidelityEnabled}
                      className="bg-white dark:bg-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator className="md:hidden" />

            {/* Daily Goal Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Daily Goal</h3>
                <div className="h-1 w-10 bg-primary rounded-full"></div>
              </div>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="turnover" className="text-sm font-medium">
                    Turnover
                  </Label>
                  <Input id="turnover" defaultValue="0" className="bg-white dark:bg-slate-800" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

