"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VatRateForm() {
  const [vatRates, setVatRates] = useState({
    vat1: "21",
    vat2: "15",
    vat3: "12",
    vat4: "0",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // Only allow numbers and empty string
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setVatRates((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSave = () => {
    // Here you would typically save to a database or API
    console.log("Saving VAT rates:", vatRates)
   
  }

  return (
    <Card className="w-full max-w-md  ">
      <CardHeader className="bg-gray-50 border-b dark:bg-gray-300">
        <CardTitle className="text-xl font-bold text-gray-800">VAT rate</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="vat1" className="block text-sm font-medium text-gray-700">
              (A) VAT 1
            </label>
            <div className="flex items-center">
              <Input
                id="vat1"
                name="vat1"
                value={vatRates.vat1}
                onChange={handleChange}
                className="rounded-md border-gray-300"
              />
              <span className="ml-2 text-gray-700">%</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="vat3" className="block text-sm font-medium text-gray-700">
              (C) VAT 3
            </label>
            <div className="flex items-center">
              <Input
                id="vat3"
                name="vat3"
                value={vatRates.vat3}
                onChange={handleChange}
                className="rounded-md border-gray-300"
              />
              <span className="ml-2 text-gray-700">%</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="vat2" className="block text-sm font-medium text-gray-700">
              (B) VAT 2
            </label>
            <div className="flex items-center">
              <Input
                id="vat2"
                name="vat2"
                value={vatRates.vat2}
                onChange={handleChange}
                className="rounded-md border-gray-300"
              />
              <span className="ml-2 text-gray-700">%</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="vat4" className="block text-sm font-medium text-gray-700">
              (D) VAT 4
            </label>
            <div className="flex items-center">
              <Input
                id="vat4"
                name="vat4"
                value={vatRates.vat4}
                onChange={handleChange}
                className="rounded-md border-gray-300"
              />
              <span className="ml-2 text-gray-700">%</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} className="px-4 py-2 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90">
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

