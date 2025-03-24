import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function DocumentNumbers() {
    const handleSave = () => {
        // Here you would typically save to a database or API

    }
    return (
        <Card className="shadow-md">
            <CardHeader className="bg-muted/30">
                <CardTitle className="text-xl font-semibold">Document numbers</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="receipts" className="text-base font-medium">
                            Receipts
                        </Label>
                        <Input id="receipts" defaultValue="7" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="invoices" className="text-base font-medium">
                            Invoices
                        </Label>
                        <Input id="invoices" defaultValue="2" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="credit-notes" className="text-base font-medium">
                            Credit notes
                        </Label>
                        <Input id="credit-notes" defaultValue="0" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="quotation" className="text-base font-medium">
                            Quotation
                        </Label>
                        <Input id="quotation" defaultValue="0" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="sales-orders" className="text-base font-medium">
                            Sales Orders
                        </Label>
                        <Input id="sales-orders" defaultValue="0" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="delivery-notes" className="text-base font-medium">
                            Delivery notes
                        </Label>
                        <Input id="delivery-notes" defaultValue="1" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="supplier-orders" className="text-base font-medium">
                            Supplier orders
                        </Label>
                        <Input id="supplier-orders" defaultValue="0" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="repair-orders" className="text-base font-medium">
                            Repair orders
                        </Label>
                        <Input id="repair-orders" defaultValue="" />
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <Button className="px-4 py-2 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90">
                        Save
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

