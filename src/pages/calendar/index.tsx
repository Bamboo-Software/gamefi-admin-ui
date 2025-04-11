import { useState, useEffect } from "react";
import { Calendar as  ChevronLeft, ChevronRight, Clock, Filter, MoreHorizontal, Plus, Search, Target, Trash } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, addDays } from "date-fns";
// import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
// import { Switch } from "@/components/ui/switch";

// Types for our calendar data
interface Task {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  completed: boolean;
  category: string;
  priority: "low" | "medium" | "high";
}

interface Target {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  progress: number;
  category: string;
}

interface TodoList {
  id: string;
  title: string;
  date: string;
  items: {
    id: string;
    text: string;
    completed: boolean;
  }[];
}

const Calendar = () => {
  // State for calendar
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  console.log(view);
  
  // State for tasks, targets, and todo lists
  const [tasks, setTasks] = useState<Task[]>([]);
  const [targets, setTargets] = useState<Target[]>([]);
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  
  // State for filters
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for modals
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  
  // State for new items
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    date: format(selectedDate, "yyyy-MM-dd"),
    time: "",
    completed: false,
    category: "work",
    priority: "medium"
  });
  
  const [newTarget, setNewTarget] = useState<Partial<Target>>({
    title: "",
    description: "",
    startDate: format(selectedDate, "yyyy-MM-dd"),
    endDate: format(addDays(selectedDate, 7), "yyyy-MM-dd"),
    progress: 0,
    category: "personal"
  });
  
  const [newTodoList, setNewTodoList] = useState<Partial<TodoList>>({
    title: "",
    date: format(selectedDate, "yyyy-MM-dd"),
    items: [{ id: crypto.randomUUID(), text: "", completed: false }]
  });

  // Sample data for demonstration
  useEffect(() => {
    // Sample tasks
    setTasks([
      {
        id: "1",
        title: "Team Meeting",
        description: "Weekly team sync with product managers",
        date: "2023-11-15",
        time: "10:00",
        completed: false,
        category: "work",
        priority: "high"
      },
      {
        id: "2",
        title: "Dentist Appointment",
        description: "Regular checkup",
        date: "2023-11-18",
        time: "14:30",
        completed: false,
        category: "personal",
        priority: "medium"
      },
      {
        id: "3",
        title: "Project Deadline",
        description: "Submit final deliverables for client project",
        date: "2023-11-25",
        time: "18:00",
        completed: false,
        category: "work",
        priority: "high"
      }
    ]);
    
    // Sample targets
    setTargets([
      {
        id: "1",
        title: "Complete Website Redesign",
        description: "Finish all pages and get client approval",
        startDate: "2023-11-10",
        endDate: "2023-11-30",
        progress: 65,
        category: "work"
      },
      {
        id: "2",
        title: "Learn React Native",
        description: "Complete online course and build a sample app",
        startDate: "2023-11-01",
        endDate: "2023-12-15",
        progress: 30,
        category: "learning"
      }
    ]);
    
    // Sample todo lists
    setTodoLists([
      {
        id: "1",
        title: "Shopping List",
        date: "2023-11-18",
        items: [
          { id: "1-1", text: "Milk", completed: true },
          { id: "1-2", text: "Eggs", completed: false },
          { id: "1-3", text: "Bread", completed: false }
        ]
      },
      {
        id: "2",
        title: "Project Tasks",
        date: "2023-11-15",
        items: [
          { id: "2-1", text: "Create wireframes", completed: true },
          { id: "2-2", text: "Design mockups", completed: true },
          { id: "2-3", text: "Implement frontend", completed: false },
          { id: "2-4", text: "Test functionality", completed: false }
        ]
      }
    ]);
  }, []);

  // Navigation functions
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Get days for the current month view
  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  // Filter tasks for the selected date
  const getTasksForSelectedDate = () => {
    return tasks.filter(task => {
      const matchesDate = isSameDay(parseISO(task.date), selectedDate);
      const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;
      const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (task.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
      
      return matchesDate && matchesCategory && matchesPriority && (searchQuery === "" || matchesSearch);
    });
  };

  // Filter targets that are active on the selected date
  const getTargetsForSelectedDate = () => {
    return targets.filter(target => {
      const targetStartDate = parseISO(target.startDate);
      const targetEndDate = parseISO(target.endDate);
      const isActive = selectedDate >= targetStartDate && selectedDate <= targetEndDate;
      const matchesCategory = categoryFilter === "all" || target.category === categoryFilter;
      const matchesSearch = target.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (target.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
      
      return isActive && matchesCategory && (searchQuery === "" || matchesSearch);
    });
  };

  // Filter todo lists for the selected date
  const getTodoListsForSelectedDate = () => {
    return todoLists.filter(todoList => {
      const matchesDate = isSameDay(parseISO(todoList.date), selectedDate);
      const matchesSearch = todoList.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           todoList.items.some(item => item.text.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesDate && (searchQuery === "" || matchesSearch);
    });
  };

  // Check if a day has any tasks
  const hasTasks = (day: Date) => {
    return tasks.some(task => isSameDay(parseISO(task.date), day));
  };

  // Check if a day has any targets
  const hasTargets = (day: Date) => {
    return targets.some(target => {
      const targetStartDate = parseISO(target.startDate);
      const targetEndDate = parseISO(target.endDate);
      return day >= targetStartDate && day <= targetEndDate;
    });
  };

  // Check if a day has any todo lists
  const hasTodoLists = (day: Date) => {
    return todoLists.some(todoList => isSameDay(parseISO(todoList.date), day));
  };

  // Handle task creation
  const handleCreateTask = () => {
    if (newTask.title) {
      const task: Task = {
        id: crypto.randomUUID(),
        title: newTask.title,
        description: newTask.description || "",
        date: newTask.date || format(selectedDate, "yyyy-MM-dd"),
        time: newTask.time,
        completed: false,
        category: newTask.category as string || "work",
        priority: (newTask.priority as "low" | "medium" | "high") || "medium"
      };
      
      setTasks([...tasks, task]);
      setIsTaskModalOpen(false);
      setNewTask({
        title: "",
        description: "",
        date: format(selectedDate, "yyyy-MM-dd"),
        time: "",
        completed: false,
        category: "work",
        priority: "medium"
      });
    }
  };

  // Handle target creation
  const handleCreateTarget = () => {
    if (newTarget.title) {
      const target: Target = {
        id: crypto.randomUUID(),
        title: newTarget.title,
        description: newTarget.description || "",
        startDate: newTarget.startDate || format(selectedDate, "yyyy-MM-dd"),
        endDate: newTarget.endDate || format(addDays(selectedDate, 7), "yyyy-MM-dd"),
        progress: newTarget.progress || 0,
        category: newTarget.category as string || "personal"
      };
      
      setTargets([...targets, target]);
      setIsTargetModalOpen(false);
      setNewTarget({
        title: "",
        description: "",
        startDate: format(selectedDate, "yyyy-MM-dd"),
        endDate: format(addDays(selectedDate, 7), "yyyy-MM-dd"),
        progress: 0,
        category: "personal"
      });
    }
  };

  // Handle todo list creation
  const handleCreateTodoList = () => {
    if (newTodoList.title && newTodoList.items && newTodoList.items.length > 0) {
      const todoList: TodoList = {
        id: crypto.randomUUID(),
        title: newTodoList.title,
        date: newTodoList.date || format(selectedDate, "yyyy-MM-dd"),
        items: newTodoList.items.filter(item => item.text.trim() !== "")
      };
      
      setTodoLists([...todoLists, todoList]);
      setIsTodoModalOpen(false);
      setNewTodoList({
        title: "",
        date: format(selectedDate, "yyyy-MM-dd"),
        items: [{ id: crypto.randomUUID(), text: "", completed: false }]
      });
    }
  };

  // Handle task completion toggle
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Handle todo item completion toggle
  const toggleTodoItemCompletion = (todoListId: string, itemId: string) => {
    setTodoLists(todoLists.map(todoList => 
      todoList.id === todoListId 
        ? {
            ...todoList,
            items: todoList.items.map(item => 
              item.id === itemId ? { ...item, completed: !item.completed } : item
            )
          }
        : todoList
    ));
  };

  // Handle target progress update
  const updateTargetProgress = (targetId: string, progress: number) => {
    setTargets(targets.map(target => 
      target.id === targetId ? { ...target, progress } : target
    ));
  };

  // Handle adding a new todo item
  const addTodoItem = () => {
    setNewTodoList({
      ...newTodoList,
      items: [...(newTodoList.items || []), { id: crypto.randomUUID(), text: "", completed: false }]
    });
  };

  // Handle removing a todo item
  const removeTodoItem = (itemId: string) => {
    setNewTodoList({
      ...newTodoList,
      items: (newTodoList.items || []).filter(item => item.id !== itemId)
    });
  };

  // Handle updating a todo item
  const updateTodoItem = (itemId: string, text: string) => {
    setNewTodoList({
      ...newTodoList,
      items: (newTodoList.items || []).map(item => 
        item.id === itemId ? { ...item, text } : item
      )
    });
  };

  // Delete a task
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Delete a target
  const deleteTarget = (targetId: string) => {
    setTargets(targets.filter(target => target.id !== targetId));
  };

  // Delete a todo list
  const deleteTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter(todoList => todoList.id !== todoListId));
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "work":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "personal":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "learning":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            Manage your tasks, targets, and to-do lists.
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="text-lg font-medium">
            {format(currentDate, "MMMM yyyy")}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar View */}
        <div className="md:w-2/3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Monthly View</CardTitle>
                <div className="flex items-center space-x-2">
                  <Tabs defaultValue="month" className="w-[300px]">
                    <TabsList>
                      <TabsTrigger value="month" onClick={() => setView("month")}>Month</TabsTrigger>
                      <TabsTrigger value="week" onClick={() => setView("week")}>Week</TabsTrigger>
                      <TabsTrigger value="day" onClick={() => setView("day")}>Day</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day names */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center py-2 font-medium text-sm">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {getDaysInMonth().map((day) => {
                  const isToday = isSameDay(day, new Date());
                  const isSelected = isSameDay(day, selectedDate);
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  const hasTasksOnDay = hasTasks(day);
                  const hasTargetsOnDay = hasTargets(day);
                  const hasTodoListsOnDay = hasTodoLists(day);
                  
                  return (
                    <div
                      key={day.toString()}
                      className={cn(
                        "min-h-[100px] p-2 border rounded-md",
                        isCurrentMonth ? "bg-card" : "bg-muted/50 text-muted-foreground",
                        isSelected ? "border-primary" : "border-border",
                        isToday ? "ring-2 ring-primary ring-offset-2" : "",
                        "cursor-pointer hover:bg-accent transition-colors"
                      )}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className="flex justify-between items-start">
                        <span className={cn(
                          "text-sm font-medium",
                          isToday ? "text-primary" : ""
                        )}>
                          {format(day, "d")}
                        </span>
                        <div className="flex space-x-1">
                          {hasTasksOnDay && (
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                          )}
                          {hasTargetsOnDay && (
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                          )}
                          {hasTodoListsOnDay && (
                            <div className="h-2 w-2 rounded-full bg-purple-500" />
                          )}
                        </div>
                      </div>
                      
                      {/* Show a preview of tasks for this day */}
                      <div className="mt-1 space-y-1">
                        {tasks
                          .filter(task => isSameDay(parseISO(task.date), day))
                          .slice(0, 2)
                          .map(task => (
                            <div 
                              key={task.id}
                              className="text-xs truncate p-1 rounded-sm bg-primary/10"
                            >
                              {task.title}
                            </div>
                          ))}
                        
                        {tasks.filter(task => isSameDay(parseISO(task.date), day)).length > 2 && (
                          <div className="text-xs text-muted-foreground text-center">
                            +{tasks.filter(task => isSameDay(parseISO(task.date), day)).length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar with selected day details */}
        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </CardTitle>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <h4 className="font-medium">Filter Options</h4>
                        <div className="space-y-2">
                          <Label htmlFor="category-filter">Category</Label>
                          <Select
                            value={categoryFilter}
                            onValueChange={setCategoryFilter}
                          >
                            <SelectTrigger id="category-filter">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              <SelectItem value="work">Work</SelectItem>
                              <SelectItem value="personal">Personal</SelectItem>
                              <SelectItem value="learning">Learning</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="priority-filter">Priority</Label>
                          <Select
                            value={priorityFilter}
                            onValueChange={setPriorityFilter}
                          >
                            <SelectTrigger id="priority-filter">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Priorities</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="search-filter">Search</Label>
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="search-filter"
                              placeholder="Search..."
                              className="pl-8"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Add New</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setIsTaskModalOpen(true)}>
                        Task
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsTargetModalOpen(true)}>
                        Target
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsTodoModalOpen(true)}>
                        To-Do List
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tasks">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="targets">Targets</TabsTrigger>
                  <TabsTrigger value="todos">To-Dos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="tasks" className="space-y-4 mt-4">
                  {getTasksForSelectedDate().length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      No tasks for this day
                    </div>
                  ) : (
                    getTasksForSelectedDate().map(task => (
                      <div key={task.id} className="flex items-start space-x-2 p-3 border rounded-md">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTaskCompletion(task.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between">
                            <span className={cn(
                              "font-medium",
                              task.completed ? "line-through text-muted-foreground" : ""
                            )}>
                              {task.title}
                            </span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => deleteTask(task.id)} className="text-red-600">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          {task.description && (
                            <p className="text-sm text-muted-foreground">
                              {task.description}
                            </p>
                          )}
                          <div className="flex items-center space-x-2 text-xs">
                            {task.time && (
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {task.time}
                              </div>
                            )}
                            <Badge variant="outline" className={getCategoryColor(task.category)}>
                              {task.category}
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="targets" className="space-y-4 mt-4">
                  {getTargetsForSelectedDate().length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      No active targets for this day
                    </div>
                  ) : (
                    getTargetsForSelectedDate().map(target => (
                      <div key={target.id} className="p-3 border rounded-md space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{target.title}</h4>
                            {target.description && (
                              <p className="text-sm text-muted-foreground">
                                {target.description}
                              </p>
                            )}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteTarget(target.id)} className="text-red-600">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Progress: {target.progress}%</span>
                            <span>
                              {format(parseISO(target.startDate), "MMM d")} - {format(parseISO(target.endDate), "MMM d, yyyy")}
                            </span>
                          </div>
                          <Progress
                            value={target.progress}
                            className="h-2"
                          />
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className={getCategoryColor(target.category)}>
                              {target.category}
                            </Badge>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="range"
                                min="0"
                                max="100"
                                value={target.progress}
                                onChange={(e) => updateTargetProgress(target.id, parseInt(e.target.value))}
                                className="w-24 h-1"
                              />
                              <span className="text-xs">{target.progress}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="todos" className="space-y-4 mt-4">
                  {getTodoListsForSelectedDate().length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      No to-do lists for this day
                    </div>
                  ) : (
                    getTodoListsForSelectedDate().map(todoList => (
                      <div key={todoList.id} className="p-3 border rounded-md space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{todoList.title}</h4>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteTodoList(todoList.id)} className="text-red-600">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <div className="space-y-2">
                          {todoList.items.map(item => (
                            <div key={item.id} className="flex items-center space-x-2">
                              <Checkbox
                                checked={item.completed}
                                onCheckedChange={() => toggleTodoItemCompletion(todoList.id, item.id)}
                              />
                              <span className={cn(
                                "text-sm",
                                item.completed ? "line-through text-muted-foreground" : ""
                              )}>
                                {item.text}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          {todoList.items.filter(item => item.completed).length} of {todoList.items.length} completed
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>Overview of your progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tasks Completed</span>
                  <span>{tasks.filter(task => task.completed).length} / {tasks.length}</span>
                </div>
                <Progress
                  value={tasks.length > 0 ? (tasks.filter(task => task.completed).length / tasks.length) * 100 : 0}
                  className="h-2"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Active Targets</span>
                  <span>{targets.length}</span>
                </div>
                <div className="space-y-1">
                  {targets.slice(0, 3).map(target => (
                    <div key={target.id} className="text-xs flex justify-between">
                      <span className="truncate max-w-[180px]">{target.title}</span>
                      <span>{target.progress}%</span>
                    </div>
                  ))}
                  {targets.length > 3 && (
                    <div className="text-xs text-muted-foreground text-center">
                      +{targets.length - 3} more
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={getCategoryColor("work")}>
                    Work: {tasks.filter(task => task.category === "work").length}
                  </Badge>
                  <Badge variant="outline" className={getCategoryColor("personal")}>
                    Personal: {tasks.filter(task => task.category === "personal").length}
                  </Badge>
                  <Badge variant="outline" className={getCategoryColor("learning")}>
                    Learning: {tasks.filter(task => task.category === "learning").length}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Task Modal */}
      <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Add a new task to your calendar. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="task-title">Title</Label>
              <Input
                id="task-title"
                placeholder="Enter task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-description">Description (Optional)</Label>
              <Textarea
                id="task-description"
                placeholder="Enter task description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="task-date">Date</Label>
                <Input
                  id="task-date"
                  type="date"
                  value={newTask.date}
                  onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-time">Time (Optional)</Label>
                <Input
                  id="task-time"
                  type="time"
                  value={newTask.time}
                  onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="task-category">Category</Label>
                <Select
                  value={newTask.category}
                  onValueChange={(value) => setNewTask({ ...newTask, category: value })}
                >
                  <SelectTrigger id="task-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="learning">Learning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-priority">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value) => setNewTask({ ...newTask, priority: value as "low" | "medium" | "high" })}
                >
                  <SelectTrigger id="task-priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTaskModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTask}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Target Modal */}
      <Dialog open={isTargetModalOpen} onOpenChange={setIsTargetModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Target</DialogTitle>
            <DialogDescription>
              Add a new target to track your progress. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="target-title">Title</Label>
              <Input
                id="target-title"
                placeholder="Enter target title"
                value={newTarget.title}
                onChange={(e) => setNewTarget({ ...newTarget, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="target-description">Description (Optional)</Label>
              <Textarea
                id="target-description"
                placeholder="Enter target description"
                value={newTarget.description}
                onChange={(e) => setNewTarget({ ...newTarget, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="target-start-date">Start Date</Label>
                <Input
                  id="target-start-date"
                  type="date"
                  value={newTarget.startDate}
                  onChange={(e) => setNewTarget({ ...newTarget, startDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="target-end-date">End Date</Label>
                <Input
                  id="target-end-date"
                  type="date"
                  value={newTarget.endDate}
                  onChange={(e) => setNewTarget({ ...newTarget, endDate: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="target-progress">Initial Progress (%)</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="target-progress"
                  type="range"
                  min="0"
                  max="100"
                  value={newTarget.progress}
                  onChange={(e) => setNewTarget({ ...newTarget, progress: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <span className="w-10 text-center">{newTarget.progress}%</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="target-category">Category</Label>
              <Select
                value={newTarget.category}
                onValueChange={(value) => setNewTarget({ ...newTarget, category: value })}
              >
                <SelectTrigger id="target-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTargetModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTarget}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Todo List Modal */}
      <Dialog open={isTodoModalOpen} onOpenChange={setIsTodoModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New To-Do List</DialogTitle>
            <DialogDescription>
              Add a new to-do list for your tasks. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="todo-title">Title</Label>
              <Input
                id="todo-title"
                placeholder="Enter to-do list title"
                value={newTodoList.title}
                onChange={(e) => setNewTodoList({ ...newTodoList, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="todo-date">Date</Label>
              <Input
                id="todo-date"
                type="date"
                value={newTodoList.date}
                onChange={(e) => setNewTodoList({ ...newTodoList, date: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label>Items</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addTodoItem}
                  className="h-8 px-2"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </div>
              <div className="space-y-2 max-h-[200px] overflow-y-auto p-1">
                {newTodoList.items?.map((item, index) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Input
                      placeholder={`Item ${index + 1}`}
                      value={item.text}
                      onChange={(e) => updateTodoItem(item.id, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTodoItem(item.id)}
                      className="h-8 w-8 text-red-500"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTodoModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTodoList}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;