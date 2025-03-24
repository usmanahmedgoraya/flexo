"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {   Plus, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Define the bank account type
type BankAccount = {
  id: string
  bankName: string
  accountNumber: string
}

export default function UserRegistration() {
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([])
    const [newBankName, setNewBankName] = useState("")
    const [newAccountNumber, setNewAccountNumber] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)


    const handleAddBankAccount = () => {
        if (newBankName.trim() && newAccountNumber.trim()) {
          const newAccount: BankAccount = {
            id: Date.now().toString(),
            bankName: newBankName,
            accountNumber: newAccountNumber,
          }
    
          setBankAccounts([...bankAccounts, newAccount])
          setNewBankName("")
          setNewAccountNumber("")
          setIsDialogOpen(false)
        }
      }
    
      const handleDeleteBankAccount = (id: string) => {
        setBankAccounts(bankAccounts.filter((account) => account.id !== id))
      }
    return (
        <div className="w-full max-w-full mx-auto p-6  ">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Entreprise</h2>
                <div className="h-0.5 w-full bg-gray-200 mt-2"></div>
            </div>

            <form className="space-y-6 max-w-4xl mx-auto border border-gray-200 rounded-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Row 1 */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="font-medium dark:text-gray-200">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue="Data-Conc"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address" className="font-medium dark:text-gray-200">
                            Adresse
                        </Label>
                        <Input
                            id="address"
                            defaultValue="Rue du centre, 1"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    {/* Row 2 */}
                    <div className="space-y-2">
                        <Label htmlFor="city" className="font-medium dark:text-gray-200">
                            City
                        </Label>
                        <Input
                            id="city"
                            defaultValue="BRUXELLES"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="zipcode" className="font-medium dark:text-gray-200">
                            Zip code
                        </Label>
                        <Input
                            id="zipcode"
                            defaultValue="1000"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    {/* Row 3 */}
                    <div className="space-y-2">
                        <Label htmlFor="tel" className="font-medium dark:text-gray-200">
                            Tel
                        </Label>
                        <Input
                            id="tel"
                            defaultValue="02 404040404"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="fax" className="font-medium dark:text-gray-200">
                            Fax
                        </Label>
                        <Input
                            id="fax"
                            defaultValue="04 202020202"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    {/* Row 4 */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="font-medium dark:text-gray-200">
                            E-Mail
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            defaultValue="info@data-concept.be"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="vat" className="font-medium dark:text-gray-200">
                            <span className="block">Indication mandatory</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">
                                (N° VAT or SIREN / RCS / APE)
                            </span>
                        </Label>
                        <Input
                            id="vat"
                            defaultValue="FR0111222333"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    {/* Row 5 - Bank section */}
                    <div className="space-y-4 md:col-span-2">
                        <div className="space-y-2 flex flex-col">
                            <Label htmlFor="bank" className="font-medium dark:text-gray-200">
                                Bank
                            </Label>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="w-fit flex items-center gap-2">
                                        <Plus size={16} /> Add Bank Account
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 dark:text-white">
                                    <DialogHeader>
                                        <DialogTitle className="dark:text-white">Add Bank Account</DialogTitle>
                                        <DialogDescription className="dark:text-gray-400">
                                            Enter the bank details below to add a new bank account.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="bankName" className="dark:text-gray-200">
                                                Bank Name
                                            </Label>
                                            <Input
                                                id="bankName"
                                                value={newBankName}
                                                onChange={(e) => setNewBankName(e.target.value)}
                                                placeholder="e.g. Banque AXA"
                                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="accountNumber" className="dark:text-gray-200">
                                                Account Number (IBAN)
                                            </Label>
                                            <Input
                                                id="accountNumber"
                                                value={newAccountNumber}
                                                onChange={(e) => setNewAccountNumber(e.target.value)}
                                                placeholder="e.g. BE72 7777 4444 3333"
                                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={handleAddBankAccount}>Add Account</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Bank accounts list */}
                        {bankAccounts.length > 0 && (
                            <div className="mt-4 space-y-3">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Added Bank Accounts</h3>
                                <div className="space-y-2">
                                    {bankAccounts.map((account) => (
                                        <div
                                            key={account.id}
                                            className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-md"
                                        >
                                            <div>
                                                <p className="font-medium dark:text-white">{account.bankName}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">{account.accountNumber}</p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDeleteBankAccount(account.id)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                                            >
                                                <Trash2 size={18} />
                                                <span className="sr-only">Delete bank account</span>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Default bank field for backward compatibility */}
                        {bankAccounts.length === 0 && (
                            <Input
                                id="bank"
                                defaultValue="Banque AXA - IBAN : BE72 7777 4444 3333"
                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        )}
                    </div>

                </div>
                <div className="h-0.5 w-full bg-gray-200 mt-6"></div>

                <div className="flex justify-end pt-4 pb-4">
                    <Button type="submit" className="px-8 py-2 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}

