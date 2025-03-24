"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface User {
  id: string
  name: string
  password: string
}

interface UserManagementProps {
  onUserSelect: (user: User | null) => void
  selectedUser: User | null
}

export default function UserPassword({ onUserSelect, selectedUser }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>([])
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState({ name: "", password: "" })

  const handleAddUser = () => {
    if (newUser.name && newUser.password) {
      const newUserWithId = { id: Date.now().toString(), ...newUser }
      setUsers([...users, newUserWithId])
      setNewUser({ name: "", password: "" })
      setIsAddOpen(false)
    }
  }

  const handleEditUser = () => {
    if (currentUser && currentUser.name && currentUser.password) {
      setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)))
      setIsEditOpen(false)

      // Update selected user if it was the one being edited
      if (selectedUser && selectedUser.id === currentUser.id) {
        onUserSelect(currentUser)
      }
    }
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  // Check if the selected user still exists after deletion
  useEffect(() => {
    if (selectedUser && !users.some((user) => user.id === selectedUser.id)) {
      onUserSelect(null)
    }
  }, [users, selectedUser, onUserSelect])

  const handleRowClick = (user: User) => {
    onUserSelect(user)
  }

  const openEditModal = (user: User, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent row selection when clicking edit
    setCurrentUser(user)
    setIsEditOpen(true)
  }

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent row selection when clicking delete
    handleDeleteUser(id)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> <div className="font-light text-xs md:text-base">Add New User</div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Enter the details of the new user.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="name" className="col-span-1 text-start">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="password" className="text-start col-span-1">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddUser}>
                Add User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          {users.length === 0 && <TableCaption className="text-center">No users available</TableCaption>}
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Password</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
              {/* <TableHead className="w-[100px]">Delete</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => handleRowClick(user)}
                className={`cursor-pointer ${selectedUser?.id === user.id ? "bg-muted" : ""} hover:bg-muted/50`}
              >
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={(e) => openEditModal(user, e)}>
                    <div className="border border-green-500 p-1 rounded-md">
                      <Pencil className="h-4 w-4 text-green-700" />
                    </div>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={(e) => handleDeleteClick(user.id, e)}>
                    <div className="border border-red-500 p-1 rounded-md">
                      <Trash2 className="h-4 w-4 text-red-700" />
                    </div>
                  </Button>
                </TableCell>
                {/* <TableCell>
                  <Button variant="ghost" size="icon" onClick={(e) => handleDeleteClick(user.id, e)}>
                    <div className="border border-red-500 p-1 rounded-md">
                      <Trash2 className="h-4 w-4 text-red-700" />
                    </div>
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update the user details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                value={currentUser?.name || ""}
                onChange={(e) => setCurrentUser(currentUser ? { ...currentUser, name: e.target.value } : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-password" className="text-right">
                Password
              </Label>
              <Input
                id="edit-password"
                type="password"
                value={currentUser?.password || ""}
                onChange={(e) => setCurrentUser(currentUser ? { ...currentUser, password: e.target.value } : null)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEditUser}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

