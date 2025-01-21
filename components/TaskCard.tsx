'use client';

import { Task } from '@/lib/types';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { Button } from './ui/button';

interface TaskCardProps {
  task: Task;
  onUpdate: (id: number, data: Partial<Task>) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onUpdate, onDelete, onEdit }: TaskCardProps) {
  return (
    <div 
      className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
      style={{ borderLeft: `4px solid ${task.color}` }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onUpdate(task.id, { completed: !task.completed })}
        className={task.completed ? 'text-primary hover:text-primary/90' : 'text-muted-foreground hover:text-muted-foreground/90'}
      >
        <Check className="h-5 w-5" />
      </Button>
      <span className={`flex-grow ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
        {task.title}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(task)}
        className="text-muted-foreground hover:text-muted-foreground/90"
      >
        <Edit2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="text-destructive hover:text-destructive/90"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}