import { motion } from 'framer-motion';
import Image from '@/components/image';
import coin from '@/assets/icons/coin.svg';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import SpinnerAuth from '@/components/pages/auth/spinner-auth';
import { containerVariants, glowVariants, titleVariants } from '@/constants/auth';
import InputForm from '@/components/pages/auth/input-form';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import useLogin from '@/hooks/auth/useLogin';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type FormValues = z.infer<typeof formSchema>;

const AuthPage = () => {
  const { handleLogin, isLoading, error } = useLogin();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = useCallback(
    async (data: FormValues) => {
      await handleLogin(data);
    },
    [handleLogin]
  );
  useEffect(() => {
    if (error) {
      toast.error("Login failed!", {
        description: "Incorrect email or password. Please try again.",
      });
    }
  },[error])
  return (
    <main className='flex flex-col min-h-screen items-center justify-between bg-gray-100 dark:bg-gray-900'>
      <section className='flex relative flex-col min-h-screen items-center justify-center w-full max-w-[768px]'>
      <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-4/5 py-16 space-y-6 relative rounded-xl flex flex-col justify-center items-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900"
        >
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-transparent"
            variants={glowVariants}
            animate="glow"
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
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                variants={titleVariants}
                animate="animate"
              >
                Admin Dashboard
              </motion.span>
            </h2>
          </motion.div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md z-20">
            <InputForm
              control={form.control}
              name="email"
              label="Email"
              type="email"
              placeholder="admin@example.com"
              />
              <InputForm
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••" 
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
                aria-label="Sign in"
                type="submit" 
                disabled={isLoading} 
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <SpinnerAuth/>
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