import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'

const CreateExpense = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add Expense</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
            <DialogDescription>
              Click on Add, When You are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="Description">Description</Label>
              <Input id="name-1" name="Description"  />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Ammount">Ammount</Label>
              <Input id="Ammount" name="Ammount" defaultValue="$" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CreateExpense