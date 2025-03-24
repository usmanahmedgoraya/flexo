"use client"

import { useState } from "react"
import { PlusCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Sample bank options
const bankOptions = [
  "CASH",
  "BANCONTACT",
  "VISA",
  "MASTERCARD",
  "PAYPAL",
  "AMERICAN EXPRESS",
  "CHEQUE",
  "BANK TRANSFER",
  "APPLE PAY",
  "GOOGLE PAY",
]

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<string[]>(["CASH", "BANCONTACT", "VISA"])
  const [selectedMethod, setSelectedMethod] = useState<string>("")
  const [saleOnCredit, setSaleOnCredit] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddPaymentMethod = () => {
    if (selectedMethod && !paymentMethods.includes(selectedMethod)) {
      setPaymentMethods([...paymentMethods, selectedMethod])
      setSelectedMethod("")
      setIsDialogOpen(false)
    }
  }

  const handleDeletePaymentMethod = (method: string) => {
    setPaymentMethods(paymentMethods.filter((pm) => pm !== method))
  }

  return (
    <Card className="w-full max-w-md ">
      <CardHeader className="bg-gray-50 border-b dark:bg-gray-300">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Payment Methods</CardTitle>
            <CardDescription>Manage your payment options</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>Add Method</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
                <DialogDescription>Select a payment method from the list below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {bankOptions
                      .filter((bank) => !paymentMethods.includes(bank))
                      .map((bank) => (
                        <SelectItem key={bank} value={bank}>
                          {bank}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleAddPaymentMethod}
                  disabled={!selectedMethod || paymentMethods.includes(selectedMethod)}
                >
                  Add
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-64 overflow-auto">
          {paymentMethods.length > 0 ? (
            <ul className="divide-y">
              {paymentMethods.map((method) => (
                <li key={method} className="flex items-center justify-between p-4 hover:bg-muted/50">
                  <span className="font-medium">{method}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeletePaymentMethod(method)}
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-muted-foreground">No payment methods added yet</div>
          )}
        </div>

        <div className="p-4 border-t">
          <a href="#" className="text-blue-600 hover:underline text-sm">
            Add PREPAID payment method to enable prepayment and customer credit management
          </a>

          <div className="flex items-center justify-between mt-4">
            <Label htmlFor="sale-credit" className="font-medium">
              Allow sale on credit
            </Label>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${saleOnCredit ? "text-muted-foreground" : "font-medium"}`}>off</span>
              <Switch id="sale-credit" checked={saleOnCredit} onCheckedChange={setSaleOnCredit} />
              <span className={`text-xs ${saleOnCredit ? "font-medium" : "text-muted-foreground"}`}>on</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

