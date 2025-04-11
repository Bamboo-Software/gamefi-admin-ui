import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality here
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">How can we help you?</h1>
        <p className="text-muted-foreground">
          Search our knowledge base or browse the categories below to find the information you need.
        </p>
        <form onSubmit={handleSearchSubmit} className="flex w-full max-w-2xl mx-auto mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for help articles..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Button type="submit" className="ml-2">
            Search
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Browse our detailed guides</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span className="text-sm">Getting Started Guide</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">API Documentation</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">Integration Tutorials</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">User Manual</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full">View All Documentation</Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Video className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>Learn through visual guides</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span className="text-sm">Platform Overview</span>
                <Badge>New</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">Advanced Features</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">Troubleshooting Tips</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">Best Practices</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full">View All Videos</Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Community Forum</CardTitle>
              <CardDescription>Connect with other users</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span className="text-sm">Ask Questions</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">Share Solutions</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">Feature Requests</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">Community Events</span>
                <Badge>Live</Badge>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full">Join Community</Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="mt-12">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
          <TabsTrigger value="support">Support Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to the most common questions about our platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      To reset your password, click on the "Forgot Password" link on the login page. 
                      You will receive an email with instructions to create a new password. 
                      Follow the link in the email and enter your new password.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-2 text-sm">
                      View detailed guide
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I upgrade my subscription?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      To upgrade your subscription, go to Settings &gt; Billing and click on "Change Plan". 
                      You will see all available plans and can select the one that best fits your needs. 
                      Your billing will be prorated for the remainder of your current billing cycle.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-2 text-sm">
                      View pricing plans
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I export my data?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      Yes, you can export your data at any time. Go to Settings &gt; Data Management and click on "Export Data". 
                      You can choose to export all data or select specific categories. 
                      The data will be provided in CSV or JSON format.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-2 text-sm">
                      Learn about data exports
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I add team members?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      To add team members, go to Settings &gt; Team Management and click on "Invite Member". 
                      Enter the email address of the person you want to invite and select their role. 
                      They will receive an invitation email with instructions to join your team.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-2 text-sm">
                      View team management guide
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Is there a mobile app available?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      Yes, we have mobile apps available for both iOS and Android devices. 
                      You can download them from the App Store or Google Play Store. 
                      The mobile app provides most of the functionality available in the web version.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        Download for iOS
                      </Button>
                      <Button variant="outline" size="sm">
                        Download for Android
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All FAQs</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Our Support Team</CardTitle>
              <CardDescription>
                Get in touch with our support team for personalized assistance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Email Support</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Send us an email and we'll respond within 24 hours.
                      </p>
                      <a href="mailto:support@example.com" className="text-sm text-primary hover:underline mt-2 inline-block">
                        support@example.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Phone Support</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Available Monday to Friday, 9am to 5pm EST.
                      </p>
                      <a href="tel:+18001234567" className="text-sm text-primary hover:underline mt-2 inline-block">
                        +1 (800) 123-4567
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Live Chat</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Chat with our support team in real-time.
                      </p>
                      <Button variant="link" className="p-0 h-auto mt-2 text-sm">
                        Start a chat
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your issue in detail..."
                      rows={4}
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="support" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Basic Support</CardTitle>
                <CardDescription>
                  For individuals and small teams
                </CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">Free</span>
                  <span className="text-muted-foreground"> with subscription</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">Email support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">Community forum access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">Knowledge base access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">48-hour response time</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Current Plan</Button>
              </CardFooter>
            </Card>
            
            <Card className="border-primary">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Professional Support</CardTitle>
                  <Badge>Popular</Badge>
                </div>
                <CardDescription>
                  For growing businesses
                </CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">Everything in Basic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">Priority email support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">Live chat support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">24-hour response time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">Monthly check-in call</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Upgrade Plan</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Enterprise Support</CardTitle>
                <CardDescription>
                  For large organizations
                </CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">Everything in Professional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">Phone support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">Dedicated support agent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">4-hour response time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">Weekly check-in calls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">Custom onboarding</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-center">Our Support Team</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          Meet our dedicated support specialists who are here to help you succeed with our platform.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/avatars/support-1.jpg" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <h3 className="font-medium">Jane Smith</h3>
            <p className="text-sm text-muted-foreground">Support Lead</p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/avatars/support-2.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h3 className="font-medium">John Doe</h3>
            <p className="text-sm text-muted-foreground">Technical Specialist</p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/avatars/support-3.jpg" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <h3 className="font-medium">Alice Johnson</h3>
            <p className="text-sm text-muted-foreground">Customer Success</p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/avatars/support-4.jpg" />
              <AvatarFallback>RB</AvatarFallback>
            </Avatar>
            <h3 className="font-medium">Robert Brown</h3>
            <p className="text-sm text-muted-foreground">Onboarding Specialist</p>
          </div>
        </div>
      </div>

      <div className="bg-muted p-8 rounded-lg mt-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <HelpCircle className="h-12 w-12 mx-auto text-primary" />
          <h2 className="text-2xl font-bold">Still need help?</h2>
          <p className="text-muted-foreground">
            Our support team is available 24/7 to assist you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Start a Chat
            </Button>
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              Email Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;