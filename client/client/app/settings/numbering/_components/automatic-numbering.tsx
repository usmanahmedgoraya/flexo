import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function AutomaticNumbering() {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-muted/30">
        <CardTitle className="text-xl font-semibold">Automatic numbering of new records</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-8">
            <Label htmlFor="articles" className="text-base font-medium">
              Articles
            </Label>
            <Switch id="articles" defaultChecked />
          </div>

          <div className="flex items-center   gap-8">
            <Label htmlFor="customers" className="text-base font-medium">
              Customers
            </Label>
            <Switch id="customers" defaultChecked />
          </div>

          <div className="flex items-center gap-8">
            <Label htmlFor="suppliers" className="text-base font-medium">
              Suppliers
            </Label>
            <Switch id="suppliers" defaultChecked />
          </div>
        </div>
        <Separator className="my-6" />
      </CardContent>

      
    </Card>
  )
}

