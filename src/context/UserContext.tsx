'use client';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { whitelist } from '@/middlewares/constants';
import { deleteCookie, getCookie } from 'cookies-next';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { getProfile } from '@/app/api/auth.api';
import { any } from 'zod';



interface GlobalContextProps {
  user:any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
}

export type User={
    id:string
    userName:string
    email: string;
    role:any
    
  }

const GlobalContext = createContext<GlobalContextProps>({
  user: any,
  setUser: () => {},
  loading: true,
});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [init, setInit] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const isWhiteListed = whitelist.some((path) => pathname.startsWith(path));

  const getUser = async () => {
    setLoading(true);
    if (isWhiteListed) return setLoading(false);
    try {
      const res = await getProfile()
      console.log(res);
      setUser({
        userName:res.userName,
        email:res.email,
        id:res.id,
        role:res.role.name
      });
    } catch (error) {
      console.log(error);
      console.log("going to delete token")
      deleteCookie('token');
    }   
    setLoading(false);
  };

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      setInit(false);
      setLoading(false);
      return;
    }
    getUser()
      .then(() => {
        //
      })
      .finally(() => {
        setInit(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user && !isWhiteListed && !loading) {
    router.replace('/auth/login');
    return (
      <div className="flex flex-col  justify-center items-center h-screen w-screen gap-5">
        
        <div>
            <h3 className='text-4xl font-extrabold text-black'>
                BLOGGY
            </h3>
        </div>
      </div>
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {loading && !isWhiteListed && !user ? (
        <div className="flex flex-col  justify-center items-center h-screen w-screen gap-5">
        <div>
            <h3 className='text-4xl font-extrabold text-black'>
                BLOGGY
            </h3>
        </div>
        </div>
      ) : !init ? (
        children
      ) : (
        <div className="flex flex-col  justify-center items-center h-screen w-screen gap-5 mt-11">
        <div>
            <h3 className='text-4xl font-extrabold text-black'>
                BLOGGY
            </h3>
        </div>
        </div>
      )}
    </GlobalContext.Provider>
  );
};

export const useUserContext = () => useContext(GlobalContext);
