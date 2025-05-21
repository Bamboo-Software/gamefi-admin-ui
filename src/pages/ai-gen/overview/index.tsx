/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingSpinner } from "@/components/spinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRecentLoginQuery, useRevenueUserQuery, useRoleUserQuery, useSummaryUserQuery, useWeeklyActiveQuery } from "@/services/dashboard";
import { formatDistanceToNow, parseISO } from "date-fns";
import {  Users, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

const AiGenOverview = () => {
  // Mock data for charts
  const {data:summaryUser,isLoading}=useSummaryUserQuery({})
  const {data:revenueUser}=useRevenueUserQuery({})
  const {data:roleUser}=useRoleUserQuery({})
  const {data:weeklyActive}=useWeeklyActiveQuery({})
  const {data:recentLogin}=useRecentLoginQuery({})
  if (isLoading || !summaryUser || !revenueUser || !roleUser || !weeklyActive || !recentLogin) {
    return <p><LoadingSpinner/></p>;
  }
  const revenueData = revenueUser?.data? revenueUser?.data.map((item:any) => ({
    name: item.month,
    total: item.totalPointsBalance["$numberDecimal"] ? parseFloat(item.totalPointsBalance["$numberDecimal"]) : item.totalPointsBalance,
  })) :[];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const salesData =weeklyActive.data ?  weeklyActive?.data.map((item:any) => {
    const date = new Date(item.date);
    const dayName = dayNames[date.getDay()];
    return {
      name: dayName,
      total: item.activeUserCount,
    };
  }):[];

  const pieData =roleUser?.data? roleUser?.data.map((item:any) => ({
    name: item.role.charAt(0).toUpperCase() + item.role.slice(1),
    value: item.count,
    color: item.role === "user" ? "#0ea5e9" : item.role === "admin" ? "#8b5cf6" : "#f43f5e",
  })):[];

const getColor = (value: number) => {
  if (value > 0) return "text-green-600";
  if (value < 0) return "text-red-600";
  return "text-gray-500";
};
const cardsData = summaryUser?.data
  ? [
      {
        title: "Total Users",
        value: summaryUser.data.totalUsers.value,
        changeMonth: summaryUser.data.totalUsers.changeMonth,
        changeWeek: summaryUser.data.totalUsers.changeWeek,
        icon: <Users className="h-4 w-4" />,
      },
      {
        title: "Active Users",
        value: summaryUser.data.activeUsers.value,
        changeMonth: summaryUser.data.activeUsers.changeMonth,
        changeWeek: summaryUser.data.activeUsers.changeWeek,
        icon: <Users className="h-4 w-4" />,
      },
      {
        title: "New Users This Week",
        value: summaryUser.data.newUsersThisWeek.value,
        changeMonth: summaryUser.data.newUsersThisWeek.changeMonth,
        changeWeek: summaryUser.data.newUsersThisWeek.changeWeek,
        icon: <Users className="h-4 w-4" />,
      },
      {
        title: "Active Today",
        value: summaryUser.data.activeUsersToday.value,
        changeMonth: summaryUser.data.activeUsersToday.changeMonth,
        changeWeek: summaryUser.data.activeUsersToday.changeWeek,
        icon: <Users className="h-4 w-4" />,
      },
    ].map((item) => ({
      ...item,
      displayMonth: `${item.changeMonth > 0 ? "+" : ""}${item.changeMonth}%`,
      displayWeek: `${item.changeWeek > 0 ? "+" : ""}${item.changeWeek}%`,
      colorMonth: getColor(item.changeMonth),
      colorWeek: getColor(item.changeWeek),
    }))
  : [];

  return (
    <div className="flex flex-col p-6 space-y-6 text-gray-100 dark:text-gray-100">
      <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100">Overview</h1>
      <p className="text-muted-foreground">
        Overview of your business metrics and analytics
      </p>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardsData.map((cardData, idx) => (
          <Card key={idx} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {cardData.title}
              </CardTitle>
              {cardData.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-50"> + {cardData.value}</div>

              <p className={`text-xs flex items-center mt-1 ${cardData.colorMonth}`}>
                {cardData.changeMonth >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                Month: {cardData.displayMonth}
              </p>

              <p className={`text-xs flex items-center mt-1 ${cardData.colorWeek}`}>
                {cardData.changeWeek >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                Week: {cardData.displayWeek}
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
                <CardTitle className="text-gray-800 dark:text-gray-200">Role Users</CardTitle>
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
                      {pieData.map((entry:any, index:any) => (
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
                {recentLogin.data.map((user:any) => (
                  <div
                    key={user.userId}
                    className="flex items-center gap-4 rounded-lg border p-3 dark:border-gray-700"
                  >
                    <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900">
                      <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none text-gray-800 dark:text-gray-200">
                        User login
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {user.username} just logged in
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(parseISO(user.lastLoginAt), { addSuffix: true })}
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

export default AiGenOverview