import { supabase } from "@/utils/supabase"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setToken } from "@/store/slices/authSlice";
import { logIn } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

export const useAuth = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const router = useRouter();
    const dispatch = useDispatch();
    const handleEmailLogin = async (e, email, password) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
    
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
    
          if (error) throw error;
    
          if (data.session?.access_token) {
            dispatch(setToken(data.session.access_token));
            dispatch(logIn(data.user));
            localStorage.setItem('access_token', data.session.access_token);
          }
    
          router.push("/dashboard");
          setSuccess(true)
          setError(null);
        } catch (error) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }

    return { loading, error, success, handleEmailLogin }
}