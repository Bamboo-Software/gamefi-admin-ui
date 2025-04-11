import { motion } from 'framer-motion';
import Image from '@/components/image';
import coin from '@/assets/icons/coin.svg';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  project: z.enum(['ai-agent', 'jfox-game', 'jfox-meme'], {
    required_error: "Please select a project",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      project: 'jfox-game',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual authentication logic
      console.log('Form data:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Redirect or show success message
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='flex flex-col min-h-screen items-center justify-between bg-gray-100 dark:bg-gray-900'>
      <section className='flex relative flex-col min-h-screen items-center justify-center w-full max-w-[768px]'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-4/5 py-16 space-y-6 relative rounded-xl flex flex-col justify-center items-center 
                 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900"
        >
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-transparent"
            animate={{
              boxShadow: [
                "0 0 10px rgba(139, 92, 246, 0.5)",
                "0 0 20px rgba(99, 102, 241, 0.8)",
                "0 0 10px rgba(139, 92, 246, 0.5)"
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
          />
          <Image
            src={coin}
            width={70}
            height={70}
            className="z-40"
            alt='coin'
          />
          <motion.div className="text-center relative">
            <h2 className=" text-3xl font-extrabold text-gray-900 dark:text-white">
              Sign in to{" "}
              <motion.span
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 
                 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Admin Dashboard
              </motion.span>
            </h2>
          </motion.div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md z-20">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="admin@example.com" 
                        {...field} 
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        {...field} 
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="project"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-gray-700 dark:text-gray-300">Select Project</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <Card className="border border-gray-200 dark:border-gray-700">
                          <CardContent className="p-3">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="ai-agent" id="ai-agent" />
                              <Label htmlFor="ai-agent" className="text-gray-700 dark:text-gray-300">AI Agent</Label>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border border-gray-200 dark:border-gray-700">
                          <CardContent className="p-3">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="jfox-game" id="jfox-game" />
                              <Label htmlFor="jfox-game" className="text-gray-700 dark:text-gray-300">JFox Game</Label>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border border-gray-200 dark:border-gray-700">
                          <CardContent className="p-3">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="jfox-meme" id="jfox-meme" />
                              <Label htmlFor="jfox-meme" className="text-gray-700 dark:text-gray-300">JFox Meme</Label>
                            </div>
                          </CardContent>
                        </Card>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : "Sign in"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </section>
    </main>
  );
};

export default AuthPage;