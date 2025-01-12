'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import axios from 'axios';
import SpinnerMini from '@/app/_components/SpinnerMini';
import Spinner from '@/app/_components/Spinner';

function AuthForm() {
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isLoggingIn, setIsLogginIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    setIsMounted(true);

    if (session?.status === 'authenticated') {
      router.push('/admin/dashboard');
    }
  }, [router, session?.status]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      otp: '',
    },
  });

  const handleSendOtp = () => {
    const { email } = getValues();
    if (!email) {
      toast.dismiss();
      toast.error('Please provide an email');
      return;
    }

    setIsSendingOtp(true);

    axios
      .post('/api/send-otp', { email })
      .then(() => {
        toast.dismiss();
        toast.success('OTP sent successfully');
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data || 'Error in sending otp');
      })
      .finally(() => setIsSendingOtp(false));
  };

  const onSubmit = (data) => {
    setIsLogginIn(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.dismiss();
          toast.error(callback?.error || 'Error in logging in');
        }

        if (callback?.ok && !callback?.error) {
          toast.dismiss();
          toast.success('Logged In');
          router.push('/admin/dashboard');
        }
      })
      .finally(() => setIsLogginIn(false));
  };

  if (!isMounted) return null;
  if (session?.status === 'loading') return <Spinner />;

  return (
    <div
      className="mt-10 md:mt-20 mb-20 border-2 border-primary-900 max-w-lg
     w-full mx-auto rounded-lg"
    >
      <div className="flex items-center flex-col my-10">
        <h1 className="text-3xl md:text-4xl mb-8">Sign In to your account</h1>
        <div className="w-full px-6 md:px-16">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email address"
              id="email"
              type="email"
              errors={errors}
              register={register}
              disabled={isSendingOtp || isLoggingIn}
              validationRules={{
                required: '* This field is required',
              }}
            />

            <div
              className={`flex justify-center bg-accent-600 rounded-md p-1 text-lg text-white hover:bg-accent-500 w-full cursor-pointer ${
                isSendingOtp || isLoggingIn ? 'cursor-no-drop' : ''
              }`}
              onClick={
                isSendingOtp || isLoggingIn ? null : () => handleSendOtp()
              }
            >
              {isSendingOtp ? <SpinnerMini /> : 'Send OTP'}
            </div>

            <Input
              label="Password"
              id="password"
              type="password"
              errors={errors}
              register={register}
              disabled={isSendingOtp || isLoggingIn}
              validationRules={{
                required: '* This field is required',
              }}
            />

            <Input
              label="OTP"
              id="otp"
              type="number"
              errors={errors}
              register={register}
              disabled={isSendingOtp || isLoggingIn}
              validationRules={{
                required: '* This field is required',
              }}
            />

            <div>
              <Button color="inherit" type="submit">
                {isLoggingIn ? <SpinnerMini /> : 'Sign In'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
