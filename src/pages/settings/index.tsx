import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Bell,
  Camera,
  Check,
  Globe,
  Key,
//   Lock,
  LogOut,
//   Mail,
  Moon,
  Palette,
  Save,
  Shield,
  Sun,
//   Upload,
  User,
} from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";

// Form schemas
const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160).optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  jobTitle: z.string().optional(),
  language: z.string({
    required_error: "Please select a language.",
  }),
});

const securityFormSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Settings = () => {

  const [avatar, setAvatar] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  // Profile form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "admin_user",
      email: "admin@example.com",
      name: "Admin User",
      jobTitle: "System Administrator",
      bio: "Experienced system administrator with a passion for optimizing workflows and maintaining secure systems.",
      language: "en",
    },
  });

  // Security form
  const securityForm = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    securityAlerts: true,
    marketingEmails: false,
    accountActivity: true,
    systemUpdates: true,
  });

  // Handle profile form submission
  const onProfileSubmit = (values: z.infer<typeof profileFormSchema>) => {
    toast("Your profile information has been updated successfully.");
    console.log(values);
  };

  // Handle security form submission
  const onSecuritySubmit = (values: z.infer<typeof securityFormSchema>) => {
    toast.success("Your password has been changed successfully.");
    console.log(values);
    securityForm.reset({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // Handle avatar upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target?.result as string);
        toast("Your profile picture has been updated successfully.");
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle theme change
  const handleThemeChange = (value: "light" | "dark" | "system") => {
    setTheme(value);
    toast(`Theme has been changed to ${value}.`);
  };

  // Handle notification toggle
  const handleNotificationToggle = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full max-w-3xl">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account profile information and settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="flex flex-col items-center justify-center space-y-2 mb-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={avatar || ""} />
                        <AvatarFallback className="text-2xl">
                          {profileForm.getValues("name").split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="avatar-upload" className="cursor-pointer">
                          <div className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md text-sm">
                            <Camera className="h-4 w-4" />
                            Change Avatar
                          </div>
                          <Input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarUpload}
                          />
                        </Label>
                      </div>
                    </div>

                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={profileForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="jobTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Job title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us a little about yourself"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Brief description for your profile. Maximum 160 characters.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Language</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="pt">Portuguese</SelectItem>
                              <SelectItem value="ja">Japanese</SelectItem>
                              <SelectItem value="zh">Chinese</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            This is the language that will be used in the dashboard.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button type="submit" className="gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  View information about your account status and plan.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Account Status</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Active
                    </Badge>
                    <span className="text-sm text-muted-foreground">Since Jan 1, 2023</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Current Plan</h3>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Enterprise
                    </Badge>
                    <span className="text-sm text-muted-foreground">Renews on Jan 1, 2024</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Account ID</h3>
                  <p className="text-sm text-muted-foreground">AD123456789</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Created At</h3>
                  <p className="text-sm text-muted-foreground">January 1, 2023</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Last Login</h3>
                  <p className="text-sm text-muted-foreground">Today at 10:30 AM</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium">IP Address</h3>
                  <p className="text-sm text-muted-foreground">192.168.1.1</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Connected Accounts</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">Google</span>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">Microsoft</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive and how.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email.
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-digest">Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">
                        Get a summary of your activity every week.
                      </p>
                    </div>
                    <Switch
                      id="weekly-digest"
                      checked={notificationSettings.weeklyDigest}
                      onCheckedChange={() => handleNotificationToggle("weeklyDigest")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about new features and offers.
                      </p>
                    </div>
                    <Switch
                      id="marketing-emails"
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={() => handleNotificationToggle("marketingEmails")}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications in your browser.
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={() => handleNotificationToggle("pushNotifications")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="security-alerts">Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about security issues and alerts.
                      </p>
                    </div>
                    <Switch
                      id="security-alerts"
                      checked={notificationSettings.securityAlerts}
                      onCheckedChange={() => handleNotificationToggle("securityAlerts")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="account-activity">Account Activity</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about account login and changes.
                      </p>
                    </div>
                    <Switch
                      id="account-activity"
                      checked={notificationSettings.accountActivity}
                      onCheckedChange={() => handleNotificationToggle("accountActivity")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-updates">System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about system updates and maintenance.
                      </p>
                    </div>
                    <Switch
                      id="system-updates"
                      checked={notificationSettings.systemUpdates}
                      onCheckedChange={() => handleNotificationToggle("systemUpdates")}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...securityForm}>
                  <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                    <FormField
                      control={securityForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={securityForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormDescription>
                            Password must be at least 8 characters long.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={securityForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button type="submit" className="gap-2">
                        <Key className="h-4 w-4" />
                        Update Password
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="2fa">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Protect your account with an additional security layer.
                    </p>
                  </div>
                  <Switch id="2fa" />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Label>SMS Authentication</Label>
                          <Badge variant="outline">Recommended</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Use your phone number for authentication.
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Setup
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Authenticator App</Label>
                        <p className="text-sm text-muted-foreground">
                          Use an authenticator app for authentication.
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Setup
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Security Key</Label>
                        <p className="text-sm text-muted-foreground">
                          Use a physical security key for authentication.
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Setup
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Login from Windows PC</p>
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Success
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Today at 10:30 AM • 192.168.1.1</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Password Changed</p>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          Change
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Yesterday at 2:15 PM • 192.168.1.1</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Login from Unknown Device</p>
                        <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                          Failed
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Jan 15, 2023 at 8:45 AM • 203.0.113.1</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Full Activity Log
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the appearance of the dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className={`flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer ${theme === "light" ? "border-primary bg-primary/10" : "border-border"}`}
                    onClick={() => handleThemeChange("light")}
                  >
                    <Sun className="h-10 w-10 mb-2" />
                    <span className="text-sm font-medium">Light</span>
                    {theme === "light" && (
                      <Check className="h-4 w-4 text-primary mt-2" />
                    )}
                  </div>
                  <div 
                    className={`flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer ${theme === "dark" ? "border-primary bg-primary/10" : "border-border"}`}
                    onClick={() => handleThemeChange("dark")}
                  >
                    <Moon className="h-10 w-10 mb-2" />
                    <span className="text-sm font-medium">Dark</span>
                    {theme === "dark" && (
                      <Check className="h-4 w-4 text-primary mt-2" />
                    )}
                  </div>
                  <div 
                    className={`flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer ${theme === "system" ? "border-primary bg-primary/10" : "border-border"}`}
                    onClick={() => handleThemeChange("system")}
                  >
                    <div className="flex h-10 w-10 mb-2">
                      <Sun className="h-10 w-5" />
                      <Moon className="h-10 w-5" />
                    </div>
                    <span className="text-sm font-medium">System</span>
                    {theme === "system" && (
                      <Check className="h-4 w-4 text-primary mt-2" />
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Font Size</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer">
                    <span className="text-xs mb-2">Aa</span>
                    <span className="text-sm font-medium">Small</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer">
                    <span className="text-xs mb-2">Aa</span>
                    <span className="text-sm font-medium">Small</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer border-primary bg-primary/10">
                    <span className="text-sm mb-2">Aa</span>
                    <span className="text-sm font-medium">Medium</span>
                    <Check className="h-4 w-4 text-primary mt-2" />
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer">
                    <span className="text-base mb-2">Aa</span>
                    <span className="text-sm font-medium">Large</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Color Scheme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer border-primary bg-primary/10">
                    <div className="h-10 w-10 rounded-full bg-blue-600 mb-2"></div>
                    <span className="text-sm font-medium">Blue</span>
                    <Check className="h-4 w-4 text-primary mt-2" />
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer">
                    <div className="h-10 w-10 rounded-full bg-green-600 mb-2"></div>
                    <span className="text-sm font-medium">Green</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer">
                    <div className="h-10 w-10 rounded-full bg-purple-600 mb-2"></div>
                    <span className="text-sm font-medium">Purple</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Layout</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-mode">Compact Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Make the UI more compact with less padding.
                      </p>
                    </div>
                    <Switch id="compact-mode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="reduced-motion">Reduced Motion</Label>
                      <p className="text-sm text-muted-foreground">
                        Reduce the amount of animations in the interface.
                      </p>
                    </div>
                    <Switch id="reduced-motion" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sidebar-position">Sidebar Position</Label>
                      <p className="text-sm text-muted-foreground">
                        Choose the position of the sidebar.
                      </p>
                    </div>
                    <Select defaultValue="left">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api-keys">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage your API keys for third-party integrations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Your API Keys</h3>
                    <p className="text-sm text-muted-foreground">
                      These keys allow third-party applications to access your account.
                    </p>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Key className="h-4 w-4" />
                    Generate New Key
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col space-y-2 p-4 border rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge>Production</Badge>
                        <h4 className="text-sm font-medium">Main API Key</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Revoke
                        </Button>
                        <Button variant="ghost" size="sm">
                          Regenerate
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        value="sk_live_51NxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                        readOnly
                        type="password"
                      />
                      <Button variant="outline" size="sm">
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">
                        Show
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Created on Jan 1, 2023 • Last used 2 days ago
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2 p-4 border rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Development</Badge>
                        <h4 className="text-sm font-medium">Test API Key</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Revoke
                        </Button>
                        <Button variant="ghost" size="sm">
                          Regenerate
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        value="sk_test_51NxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                        readOnly
                        type="password"
                      />
                      <Button variant="outline" size="sm">
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">
                        Show
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Created on Feb 15, 2023 • Last used 5 days ago
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Usage</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Requests this month</span>
                    <span className="text-sm font-medium">12,543 / 50,000</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-1/4 rounded-full"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    25% of your monthly quota used
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Webhook Endpoints</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Production Webhook</Label>
                      <p className="text-sm text-muted-foreground">
                        https://api.yourdomain.com/webhooks/stripe
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Development Webhook</Label>
                      <p className="text-sm text-muted-foreground">
                        https://dev.yourdomain.com/webhooks/stripe
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                      Testing
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Add Webhook Endpoint
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>
                  Manage your subscription and billing information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Enterprise Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      $499 per month, billed annually
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    Current Plan
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Plan Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      Unlimited users
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      50,000 API requests per month
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      Priority support
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      Custom integrations
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      Advanced analytics
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Billing Cycle</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="monthly"
                        name="billing-cycle"
                        className="h-4 w-4 text-primary"
                      />
                      <Label htmlFor="monthly">Monthly</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="annually"
                        name="billing-cycle"
                        className="h-4 w-4 text-primary"
                        defaultChecked
                      />
                      <Label htmlFor="annually">Annually (Save 20%)</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Change Plan</Button>
                <Button variant="destructive">Cancel Subscription</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Manage your payment methods and billing history.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Current Payment Method</h3>
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center">
                        <span className="font-bold">VISA</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Visa ending in 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Billing History</h3>
                    <Button variant="outline" size="sm">
                      Download All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <p className="text-sm font-medium">January 1, 2023</p>
                        <p className="text-xs text-muted-foreground">Invoice #INV-001</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-sm font-medium">$499.00</p>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <p className="text-sm font-medium">December 1, 2022</p>
                        <p className="text-xs text-muted-foreground">Invoice #INV-002</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-sm font-medium">$499.00</p>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <p className="text-sm font-medium">November 1, 2022</p>
                        <p className="text-xs text-muted-foreground">Invoice #INV-003</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-sm font-medium">$499.00</p>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Add Payment Method
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;