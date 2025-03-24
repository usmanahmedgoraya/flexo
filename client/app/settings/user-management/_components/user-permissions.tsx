"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import type { User } from "./user-password"

interface Permission {
  id: string
  name: string
  enabled: boolean
  column: "left" | "right"
}

interface UserPermissionsProps {
  selectedUser: User | null
}

export default function UserPermissions({ selectedUser }: UserPermissionsProps) {
  const [permissions, setPermissions] = useState<Permission[]>([
    // Left column
    { id: "1", name: "Products access", enabled: false, column: "left" },
    { id: "2", name: "Customer access", enabled: false, column: "left" },
    { id: "3", name: "Supplier access", enabled: false, column: "left" },
    { id: "4", name: "Sales access", enabled: false, column: "left" },
    { id: "5", name: "Folders access", enabled: false, column: "left" },
    { id: "6", name: "Settings - Help", enabled: false, column: "left" },
    { id: "7", name: "Tools access", enabled: false, column: "left" },
    { id: "8", name: "Manage the stock", enabled: false, column: "left" },
    { id: "9", name: "Access to Stores", enabled: false, column: "left" },

    // Right column
    { id: "10", name: "X-Z Report", enabled: false, column: "right" },
    {
      id: "12",
      name: "Multi-store version Limited cash register closure - the ticket is not printed",
      enabled: true,
      column: "right",
    },
    { id: "13", name: "Access to Repairs", enabled: false, column: "right" },
    { id: "14", name: "Opening drawer without sale", enabled: false, column: "right" },
    { id: "15", name: "Ticket reminder", enabled: false, column: "right" },
    { id: "16", name: "Change prices and discounts", enabled: false, column: "right" },
    { id: "17", name: "Add product form", enabled: false, column: "right" },
    { id: "18", name: "Edit / Delete product form", enabled: false, column: "right" },
  ])

  const togglePermission = (id: string) => {
    setPermissions(
      permissions.map((permission) =>
        permission.id === id ? { ...permission, enabled: !permission.enabled } : permission,
      ),
    )
  }

  const checkAll = () => {
    setPermissions(permissions.map((permission) => ({ ...permission, enabled: true })))
  }

  const uncheckAll = () => {
    setPermissions(permissions.map((permission) => ({ ...permission, enabled: false })))
  }

  const leftColumnPermissions = permissions.filter((permission) => permission.column === "left")
  const rightColumnPermissions = permissions.filter((permission) => permission.column === "right")

  if (!selectedUser) {
    return null // Don't render anything if no user is selected
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-medium mb-4 md:mb-0">
          User access for <span className="text-purple-600 font-semibold">{selectedUser.name.toUpperCase()}</span>
        </h1>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={uncheckAll}
            className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            All uncheck
          </Button>
          <Button
            variant="outline"
            onClick={checkAll}
            className="border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
          >
            All check
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 rounded-md border p-6 mb-20">
        {/* Left Column */}
        <div className="space-y-4">
          {leftColumnPermissions.map((permission) => (
            <div key={permission.id} className="flex items-center justify-between">
              <span className={permission.name === "Access to Stores" ? "text-purple-600 font-medium" : ""}>
                {permission.name}
              </span>
              <div className="flex items-center space-x-2">
                <Switch checked={permission.enabled} onCheckedChange={() => togglePermission(permission.id)} />
                <span className="text-sm text-gray-500 w-8">{permission.enabled ? "on" : "off"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {rightColumnPermissions.map((permission) => (
            <div key={permission.id} className="flex items-center justify-between">
              {permission.name.includes("Multi-store version") ? (
                <div className="flex flex-col">
                  <span className="text-purple-600 font-medium">Multi-store version</span>
                  <span>{permission.name.replace("Multi-store version", "")}</span>
                </div>
              ) : (
                <span>{permission.name}</span>
              )}

              <div className="flex items-center space-x-2">
                <Switch checked={permission.enabled} onCheckedChange={() => togglePermission(permission.id)} />
                <span className="text-sm text-gray-500 w-8">{permission.enabled ? "on" : "off"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

