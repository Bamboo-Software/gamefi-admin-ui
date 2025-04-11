/* eslint-disable prefer-const */
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  BarChart3,
  Download,
  LineChart,
  MoreHorizontal,
  PieChart,
  Search,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock data for charts
const visitorData = [
  { name: "Jan", visitors: 1200, newUsers: 800, returning: 400 },
  { name: "Feb", visitors: 1900, newUsers: 1200, returning: 700 },
  { name: "Mar", visitors: 1500, newUsers: 900, returning: 600 },
  { name: "Apr", visitors: 2200, newUsers: 1400, returning: 800 },
  { name: "May", visitors: 2800, newUsers: 1800, returning: 1000 },
  { name: "Jun", visitors: 3200, newUsers: 2000, returning: 1200 },
  { name: "Jul", visitors: 3800, newUsers: 2400, returning: 1400 },
  { name: "Aug", visitors: 3500, newUsers: 2200, returning: 1300 },
  { name: "Sep", visitors: 4000, newUsers: 2600, returning: 1400 },
  { name: "Oct", visitors: 4200, newUsers: 2700, returning: 1500 },
  { name: "Nov", visitors: 3800, newUsers: 2400, returning: 1400 },
  { name: "Dec", visitors: 4500, newUsers: 3000, returning: 1500 },
];

const conversionRateData = [
  { name: "Jan", rate: 3.2 },
  { name: "Feb", rate: 3.5 },
  { name: "Mar", rate: 3.8 },
  { name: "Apr", rate: 4.2 },
  { name: "May", rate: 4.5 },
  { name: "Jun", rate: 4.9 },
  { name: "Jul", rate: 5.2 },
  { name: "Aug", rate: 5.5 },
  { name: "Sep", rate: 5.8 },
  { name: "Oct", rate: 6.1 },
  { name: "Nov", rate: 6.4 },
  { name: "Dec", rate: 6.8 },
];

const adPerformanceData = [
  { name: "Google Ads", impressions: 125000, clicks: 7500, conversion: 375 },
  { name: "Facebook", impressions: 95000, clicks: 5700, conversion: 285 },
  { name: "Instagram", impressions: 85000, clicks: 5100, conversion: 255 },
  { name: "Twitter", impressions: 45000, clicks: 2250, conversion: 112 },
  { name: "LinkedIn", impressions: 35000, clicks: 1750, conversion: 87 },
];

const trafficSourceData = [
  { name: "Organic Search", value: 40, color: "#8884d8" },
  { name: "Direct", value: 25, color: "#82ca9d" },
  { name: "Social Media", value: 15, color: "#ffc658" },
  { name: "Referral", value: 12, color: "#ff8042" },
  { name: "Email", value: 8, color: "#0088fe" },
];

const deviceData = [
  { name: "Desktop", value: 55, color: "#0088FE" },
  { name: "Mobile", value: 35, color: "#00C49F" },
  { name: "Tablet", value: 10, color: "#FFBB28" },
];

// Mock data for table
const generateTableData = () => {
  const sources = ["Google", "Facebook", "Direct", "Twitter", "LinkedIn", "Instagram", "Email", "Referral", "Organic"];
  const countries = ["United States", "United Kingdom", "Germany", "France", "Japan", "Canada", "Australia", "Brazil", "India", "China"];
  const statuses = ["High", "Medium", "Low"];
  
  return Array.from({ length: 100 }).map((_, i) => ({
    id: i + 1,
    source: sources[Math.floor(Math.random() * sources.length)],
    visitors: Math.floor(Math.random() * 10000) + 1000,
    pageViews: Math.floor(Math.random() * 15000) + 2000,
    bounceRate: (Math.random() * 80 + 20).toFixed(2) + "%",
    avgTime: Math.floor(Math.random() * 300) + 30 + "s",
    country: countries[Math.floor(Math.random() * countries.length)],
    conversionRate: (Math.random() * 10).toFixed(2) + "%",
    revenue: "$" + (Math.random() * 10000).toFixed(2),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    date: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  }));
};

const tableData = generateTableData();

const Analytic = () => {
  // Table state
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Handle sorting
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort data
  const filteredData = tableData.filter(item => {
    // Apply search term
    if (searchTerm && !Object.values(item).some(val => 
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )) {
      return false;
    }
    
    // Apply filters
    for (const [key, value] of Object.entries(filters)) {
      if (value && item[key as keyof typeof item].toString() !== value) {
        return false;
      }
    }
    
    return true;
  });

  // Sort data
  const sortedData = React.useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];
        
        // Handle numeric values with currency symbols
        const aNumeric = typeof aValue === 'string' && aValue.startsWith('$') 
          ? parseFloat(aValue.substring(1)) 
          : aValue;
        const bNumeric = typeof bValue === 'string' && bValue.startsWith('$') 
          ? parseFloat(bValue.substring(1)) 
          : bValue;
        
        // Handle percentage values
        const aPercentage = typeof aValue === 'string' && aValue.endsWith('%') 
          ? parseFloat(aValue) 
          : aNumeric;
        const bPercentage = typeof bValue === 'string' && bValue.endsWith('%') 
          ? parseFloat(bValue) 
          : bNumeric;
        
        if (aPercentage < bPercentage) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aPercentage > bPercentage) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'High':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Low':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6 space-y-6 ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your website performance and user engagement</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">152,489</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">12.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2%</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">0.8%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3m 42s</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
              <span className="text-red-500">0.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.3%</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowDown className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

    
      <Tabs defaultValue="visitors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="visitors">Visitors</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
          <TabsTrigger value="ads">Ads Performance</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
        </TabsList>
        
   
        <TabsContent value="visitors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Website Visitors</CardTitle>
              <CardDescription>Monthly website visitors over the past year</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitorData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNewUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="visitors" stroke="#8884d8" fillOpacity={1} fill="url(#colorVisitors)" />
                  <Area type="monotone" dataKey="newUsers" stroke="#82ca9d" fillOpacity={1} fill="url(#colorNewUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
                <CardDescription>Visitors by device type</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>New vs Returning Visitors</CardTitle>
                <CardDescription>Monthly comparison</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={visitorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="newUsers" name="New Users" fill="#8884d8" />
                    <Bar dataKey="returning" name="Returning Users" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
     
        <TabsContent value="conversion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Rate Trend</CardTitle>
              <CardDescription>Monthly conversion rate over the past year</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={conversionRateData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                  <Legend />
                  <Line type="monotone" dataKey="rate" stroke="#8884d8" activeDot={{ r: 8 }} name="Conversion Rate" />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
    
        <TabsContent value="ads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ad Platform Performance</CardTitle>
              <CardDescription>Impressions, clicks, and conversions by platform</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="impressions" name="Impressions" fill="#8884d8" />
                  <Bar dataKey="clicks" name="Clicks" fill="#82ca9d" />
                  <Bar dataKey="conversion" name="Conversions" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
      
        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Distribution of traffic by source</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={trafficSourceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {trafficSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

     
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Traffic Analytics Data</CardTitle>
          <CardDescription>Detailed traffic data with filtering and sorting capabilities</CardDescription>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search data..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filters.status === "High"}
                    onCheckedChange={(checked) => 
                      setFilters({...filters, status: checked ? "High" : ""})
                    }
                  >
                    High
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.status === "Medium"}
                    onCheckedChange={(checked) => 
                      setFilters({...filters, status: checked ? "Medium" : ""})
                    }
                  >
                    Medium
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.status === "Low"}
                    onCheckedChange={(checked) => 
                      setFilters({...filters, status: checked ? "Low" : ""})
                    }
                  >
                    Low
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilters({})}>
                    Clear Filters
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(parseInt(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Rows" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 rows</SelectItem>
                  <SelectItem value="20">20 rows</SelectItem>
                  <SelectItem value="50">50 rows</SelectItem>
                  <SelectItem value="100">100 rows</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('source')}>
                    Source
                    {sortConfig?.key === 'source' && (
                      sortConfig.direction === 'ascending' ? <ArrowUp className="inline h-4 w-4 ml-1" /> : <ArrowDown className="inline h-4 w-4 ml-1" />
                    )}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('visitors')}>
                    Visitors
                    {sortConfig?.key === 'visitors' ? (
                      sortConfig.direction === 'ascending' ? <ArrowUp className="inline h-4 w-4 ml-1" /> : <ArrowDown className="inline h-4 w-4 ml-1" />
                    ) : <ArrowUpDown className="inline h-4 w-4 ml-1" />}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('pageViews')}>
                    Page Views
                    {sortConfig?.key === 'pageViews' ? (
                      sortConfig.direction === 'ascending' ? <ArrowUp className="inline h-4 w-4 ml-1" /> : <ArrowDown className="inline h-4 w-4 ml-1" />
                    ) : <ArrowUpDown className="inline h-4 w-4 ml-1" />}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('bounceRate')}>
                    Bounce Rate
                    {sortConfig?.key === 'bounceRate' ? (
                      sortConfig.direction === 'ascending' ? <ArrowUp className="inline h-4 w-4 ml-1" /> : <ArrowDown className="inline h-4 w-4 ml-1" />
                    ) : <ArrowUpDown className="inline h-4 w-4 ml-1" />}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('avgTime')}>
                    Avg. Time
                    {sortConfig?.key === 'avgTime' ? (
                      sortConfig.direction === 'ascending' ? <ArrowUp className="inline h-4 w-4 ml-1" /> : <ArrowDown className="inline h-4 w-4 ml-1" />
                    ) : <ArrowUpDown className="inline h-4 w-4 ml-1" />}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('country')}>
                    Country
                    {sortConfig?.key === 'country' ? (
                      sortConfig.direction === 'ascending' ? <ArrowUp className="inline h-4 w-4 ml-1" /> : <ArrowDown className="inline h-4 w-4 ml-1" />
                    ) : <ArrowUpDown className="inline h-4 w-4 ml-1" />}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('conversionRate')}>
                    Conv. Rate
                    {sortConfig?.key === 'conversionRate' ? (
                      sortConfig.direction === 'ascending' ? <ArrowUp className="inline h-4 w-4 ml-1" /> : <ArrowDown className="inline h-4 w-4 ml-1" />
                    ) : <ArrowUpDown className="inline h-4 w-4 ml-1" />}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('revenue')}>
                    Revenue
                    {sortConfig?.key === 'revenue' ? (
                      sortConfig.direction === 'ascending' ? <ArrowUp className="inline h-4 w-4 ml-1" /> : <ArrowDown className="inline h-4 w-4 ml-1" />
                    ) : <ArrowUpDown className="inline h-4 w-4 ml-1" />}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('status')}>
                    Status
                    {sortConfig?.key === 'status' ? (
                      sortConfig.direction === 'ascending' ? <ArrowUp className="inline h-4 w-4 ml-1" /> : <ArrowDown className="inline h-4 w-4 ml-1" />
                    ) : <ArrowUpDown className="inline h-4 w-4 ml-1" />}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('date')}>
                    Date
                    {sortConfig?.key === 'date' ? (
                      sortConfig.direction === 'ascending' ? <ArrowUp className="inline h-4 w-4 ml-1" /> : <ArrowDown className="inline h-4 w-4 ml-1" />
                    ) : <ArrowUpDown className="inline h-4 w-4 ml-1" />}
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.source}</TableCell>
                      <TableCell>{item.visitors.toLocaleString()}</TableCell>
                      <TableCell>{item.pageViews.toLocaleString()}</TableCell>
                      <TableCell>{item.bounceRate}</TableCell>
                      <TableCell>{item.avgTime}</TableCell>
                      <TableCell>{item.country}</TableCell>
                      <TableCell>{item.conversionRate}</TableCell>
                      <TableCell>{item.revenue}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Export data</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Add to report</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={12} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
      
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredData.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
            </div>
            
            {/* <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  // Show first page, last page, current page, and pages around current
                  let pageToShow;
                  if (totalPages <= 5) {
                    pageToShow = i + 1;
                  } else if (currentPage <= 3) {
                    pageToShow = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageToShow = totalPages - 4 + i;
                  } else {
                    pageToShow = currentPage - 2 + i;
                  }
                  
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageToShow)}
                        isActive={currentPage === pageToShow}
                      >
                        {pageToShow}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytic;    