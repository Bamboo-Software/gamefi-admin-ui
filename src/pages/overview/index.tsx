import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, CreditCard, DollarSign, Users, ArrowUpRight
  // , ArrowDownRight 
} from "lucide-react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

const Overview = () => {
  // Mock data for charts
  const revenueData = [
    { name: "Jan", total: 1200 },
    { name: "Feb", total: 1900 },
    { name: "Mar", total: 1500 },
    { name: "Apr", total: 2200 },
    { name: "May", total: 2800 },
    { name: "Jun", total: 3200 },
    { name: "Jul", total: 3800 },
  ];

  const salesData = [
    { name: "Mon", total: 120 },
    { name: "Tue", total: 160 },
    { name: "Wed", total: 180 },
    { name: "Thu", total: 190 },
    { name: "Fri", total: 220 },
    { name: "Sat", total: 150 },
    { name: "Sun", total: 90 },
  ];

  const pieData = [
    { name: "Basic", value: 540, color: "#0ea5e9" },
    { name: "Pro", value: 720, color: "#8b5cf6" },
    { name: "Enterprise", value: 480, color: "#f43f5e" },
  ];

  const cardsData = [
    { title: "Total Revenue", value: "+20.1% from last month", color: "bg-blue-100 dark:bg-blue-900", icon: <div className='bg-[#c2e6fe] rounded-full p-2'><DollarSign className="h-4 w-4  text-gray-600 dark:text-gray-400" /></div>  },
    { title: "Subscriptions", value: "+12.2% from last month", color: "bg-green-100 dark:bg-green-900", icon: <div className='bg-[#b5f4cf] rounded-full p-2'><Users className="h-4 w-4 text-gray-600 dark:text-gray-400" /></div>  },
    { title: "Total Sales", value: "-4.5% from last week", color: "bg-red-100 dark:bg-red-900", icon: <div className='bg-[#e7d5ff] rounded-full p-2'><CreditCard className="h-4 w-4 text-gray-600 dark:text-gray-400" /></div> },
    { title: "Active Now", value: "+7.2% from average", color: "bg-yellow-100 dark:bg-yellow-900", icon: <div className='bg-[#f5b4ab] rounded-full p-2'><Activity className="h-4 w-4 text-gray-600 dark:text-gray-400" /></div>  },
  ]

  return (
    <div className="flex flex-col p-6 space-y-6 text-gray-100 dark:text-gray-100">
      <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100">Overview</h1>
      <p className="text-muted-foreground">
        Overview of your business metrics and analytics
      </p>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardsData.map(cardData => (
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {cardData.title}
          </CardTitle>
          {cardData.icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">+573</div>
          <p className="text-xs text-green-500 flex items-center mt-1">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            {cardData.value}
          </p>
        </CardContent>
      </Card>
        ))}
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Revenue Chart - Line */}
            <Card className="col-span-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-800 dark:text-gray-200">Revenue Over Time</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Monthly revenue for the current year
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={2} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Subscription Distribution - Pie Chart */}
            <Card className="col-span-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-800 dark:text-gray-200">Subscription Types</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Distribution of subscription plans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          {/* Weekly Sales - Bar Chart */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-200">Weekly Sales</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Sales performance for the current week
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="total" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Recent Activity */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-200">Recent Activity</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Latest transactions and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border p-3 dark:border-gray-700">
                    <div className={`rounded-full p-2 ${i % 2 === 0 ? 'bg-blue-100 dark:bg-blue-900' : 'bg-green-100 dark:bg-green-900'}`}>
                      {i % 2 === 0 ? 
                        <Users className={`h-4 w-4 text-blue-600 dark:text-blue-400`} /> : 
                        <DollarSign className={`h-4 w-4 text-green-600 dark:text-green-400`} />
                      }
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none text-gray-800 dark:text-gray-200">
                        {i % 2 === 0 ? 'New subscription' : 'Payment received'}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {i % 2 === 0 ? 'User #23456 subscribed to Pro plan' : 'User #12345 paid $99.00'}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {i * 10} minutes ago
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-200">Analytics Content</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Detailed analytics will be displayed here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-gray-500 dark:text-gray-400">
                Analytics content will be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-200">Reports Content</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Generated reports will be displayed here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-gray-500 dark:text-gray-400">
                Reports content will be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-200">Notifications Content</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                System notifications will be displayed here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-gray-500 dark:text-gray-400">
                Notifications content will be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Overview