"use client"

import { useState } from "react"
import UserPassword , { type User } from "./_components/user-password"
import UserPermissions from "./_components/user-permissions"

export default function UserManagementPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <div className="max-h-[100vh] overflow-auto">
      <UserPassword onUserSelect={setSelectedUser} selectedUser={selectedUser} />
      <UserPermissions selectedUser={selectedUser} />
    </div>
  )
}

