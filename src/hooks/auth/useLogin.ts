import { FormValues } from "@/pages/auth";
import { useLoginMutation } from "@/services/auth";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useLogin = () => {
    const navigate=useNavigate()
    const [login, { error, isLoading }] = useLoginMutation();
  
    const handleLogin = useCallback(
      async (data: FormValues) => {
        try {
          const res = await login({
            email: data.email,
            password: data.password,
          }).unwrap();
          if (res && res.data) {
            toast.success('Login successful!', {
                description: 'Welcome back',
            });
                navigate("/")
            }
          return res;
        } catch (err) {
          toast.error('Login failed!', {
            description: 'Incorrect email or password. Please try again.',
          });
          throw err;
        }
      },
      [login,navigate]
    );
  
    return { handleLogin, isLoading, error };
};
export default useLogin