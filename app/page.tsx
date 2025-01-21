'use client';

import { useEffect, useState } from 'react';
import { Task } from '@/lib/types';
import { getTasks, createTask, updateTask, deleteTask } from '@/lib/api';
import { TaskCard } from '@/components/TaskCard';
import { TaskDialog } from '@/components/CreateTaskDialog';
import { useToast } from '@/hooks/use-toast';
import { Rocket, FileText } from 'lucide-react';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load tasks',
        variant: 'destructive',
      });
    }
  }

  async function handleCreateTask(data: Omit<Task, 'id' | 'completed'>) {
    try {
      const newTask = await createTask(data);
      setTasks([...tasks, newTask]);
      setDialogOpen(false);
      toast({
        description: 'Task created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create task',
        variant: 'destructive',
      });
    }
  }

  async function handleUpdateTask(id: number, data: Partial<Task>) {
    try {
      const updatedTask = await updateTask(id, data);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      setDialogOpen(false);
      setEditingTask(null);
      toast({
        description: 'Task updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive',
      });
    }
  }

  async function handleDeleteTask(id: number) {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
      toast({
        description: 'Task deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        variant: 'destructive',
      });
    }
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setEditingTask(null);
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-2 mb-8">
          <Rocket className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Todo App
          </h1>
        </div>

        <button
          onClick={() => setDialogOpen(true)}
          className="w-full bg-secondary/50 text-primary-foreground py-3 px-4 rounded-lg mb-8 hover:bg-secondary/70 transition-colors"
        >
          Create Task
        </button>

        <div className="w-full flex justify-between text-sm mb-12">
          <div className="text-primary">
            Tasks <span className="ml-1 bg-secondary/50 px-2 py-0.5 rounded">{tasks.length}</span>
          </div>
          <div className="text-primary">
            Completed <span className="ml-1 bg-secondary/50 px-2 py-0.5 rounded">{completedTasks}</span>
          </div>
        </div>

        {tasks.length > 0 ? (
          <div className="space-y-3 w-full">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">You don't have any tasks registered yet.</p>
            <p className="text-muted-foreground">Create tasks and organize your to-do items.</p>
          </div>
        )}

        <TaskDialog 
          open={dialogOpen} 
          onOpenChange={handleDialogClose}
          onCreateTask={handleCreateTask}
          onUpdateTask={handleUpdateTask}
          editingTask={editingTask}
        />
      </div>
    </main>
  );
}