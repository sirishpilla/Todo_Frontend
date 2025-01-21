'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { CreateTaskInput, Task } from '@/lib/types';
import { ColorPicker } from './ColorPicker';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTask: (task: CreateTaskInput) => void;
  onUpdateTask?: (id: number, task: Partial<Task>) => void;
  editingTask?: Task | null;
}

export function TaskDialog({ 
  open, 
  onOpenChange, 
  onCreateTask, 
  onUpdateTask,
  editingTask 
}: TaskDialogProps) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#3B82F6');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setColor(editingTask.color);
    } else {
      setTitle('');
      setColor('#3B82F6');
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask && onUpdateTask) {
      onUpdateTask(editingTask.id, { title, color });
    } else {
      onCreateTask({ title, color });
    }
    setTitle('');
    setColor('#3B82F6');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editingTask ? 'Edit Task' : 'Create New Task'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="bg-secondary"
            required
          />
          <ColorPicker selectedColor={color} onColorChange={setColor} />
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            {editingTask ? 'Save Changes' : 'Create Task'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}