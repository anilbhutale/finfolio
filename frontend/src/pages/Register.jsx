import React, { useState, useEffect } from 'react';
import { object, string } from 'yup';
import { toast } from 'react-toastify';
import { Input } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} from '../features/api/apiSlices/userApiSlice';
import { setCredentials } from '../features/authenticate/authSlice';
import { updateLoader } from '../features/loader/loaderSlice';

import registerImg from '../assets/register.webp';
import { UserAuthForm, OtpForm } from '../components/Forms';
import validateForm from '../utils/validateForm';
import {
  UsernameInput,
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
} from '../components/Inputs';
import SubmitButton from '../components/SubmitButton';
import { User } from '../utils/Icons';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
  });
  const [errors, setErrors] = useState({});
  const [countdown, setCountdown] = useState(
    parseInt(localStorage.getItem('otpCountdown')) || 0
  );

  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: registration, 2: OTP verification

  const validationSchema = object({
    username: string()
      .required('Username is required.')
      .min(3, 'Username must be atleast 3 characters long.')
      .max(20, 'Username should not be more than 20 characters.'),
    last_name: string()
      .required('Last name is required.')
      .min(3, 'Last name must be atleast 3 characters long.')
      .max(20, 'Last name should not be more than 20 characters.'),
    first_name: string()
      .required('First name is required.')
      .min(3, 'First name must be atleast 3 characters long.')
      .max(20, 'First name should not be more than 20 characters.'),
    email: string().required('Email is required.').email('Invalid Email.'),
    password: string()
      .required('Password is required.')
      .min(8, 'Password must be atleast 8 characters long.'),
    confirm_password: string()
      .required('Password is required.')
      .min(8, 'Password must be atleast 8 characters long.'),
  });

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    validateForm(e.target.name, e.target.value, validationSchema, setErrors);
  };

  const { username, email, password, confirm_password, first_name, last_name } =
    formData;
  const [register, { isLoading: registerLoading }] = useRegisterMutation();
  const [sendOtp] = useSendOtpMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      dispatch(updateLoader(40));
      const res = await register(formData).unwrap();
      await dispatch(setCredentials(res.user));
      // await sendOtp({ email });
      // setCountdown(60);
      // await localStorage.setItem("otpCountdown", "60");

      // dispatch(updateLoader(60));
      toast.success('User Registered successfully. Please login!');

      navigate('/login');
      // setStep(2);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || 'Unexpected Internal Server Error!');
    } finally {
      dispatch(updateLoader(100));
    }
  };

  const [verifyOtp, { isLoading: verifyOtpLoading }] = useVerifyOtpMutation();

  const handleOtpSubmit = async (e) => {
    try {
      e.preventDefault();

      await dispatch(updateLoader(40));
      const otpRes = await verifyOtp({ email, otp }).unwrap();

      await dispatch(updateLoader(60));
      await dispatch(setCredentials(otpRes.user));
      toast.success(otpRes.message || 'Email has been verified successfully!');

      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || 'Unexpected Internal Server Error!');
    } finally {
      dispatch(updateLoader(100));
    }
  };
  const resendOtp = async (e) => {
    try {
      e.preventDefault();

      dispatch(updateLoader(40));
      const otpRes = await sendOtp({ email }).unwrap();

      dispatch(updateLoader(70));
      toast.success(
        otpRes.message || 'OTP sent successfully. Please check your email!'
      );
      setCountdown(60);
      localStorage.setItem('otpCountdown', '60');
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || 'Unexpected Internal Server Error!');
    } finally {
      dispatch(updateLoader(100));
    }
  };

  const hasErrors = Object.values(errors).some((error) => !!error);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
        localStorage.setItem('otpCountdown', (countdown - 1).toString());
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <section className="w-full h-[90vh] px-6 sm:px-8 md:px-12 flex justify-center items-center">
      <UserAuthForm
        title={step === 1 ? 'Register Now' : 'Verify Your Email'}
        imageTitle="Easy to Use."
        imageSrc={registerImg}
        alt="registration image"
        form={
          // step === 1 ? (
          <>
            <UsernameInput
              value={username}
              onChange={handleOnChange}
              errors={errors}
            />
            <Input
              type="text"
              label="First name"
              name="first_name"
              value={first_name}
              onChange={handleOnChange}
              isInvalid={!!errors?.first_name}
              errorMessage={errors?.first_name}
              placeholder="Enter your first name"
              startContent={<User />}
              className="text-primary mb-3"
              classNames={{
                errorMessage: 'text-error font-calSans',
              }}
            />

            <Input
              type="text"
              label="Last name"
              name="last_name"
              value={last_name}
              onChange={handleOnChange}
              isInvalid={!!errors?.last_name}
              errorMessage={errors?.last_name}
              placeholder="Enter your last name"
              startContent={<User />}
              className="text-primary mb-3"
              classNames={{
                errorMessage: 'text-error font-calSans',
              }}
            />
            <EmailInput
              value={email}
              onChange={handleOnChange}
              errors={errors}
            />
            <PasswordInput
              value={password}
              onChange={handleOnChange}
              errors={errors}
            />
            <ConfirmPasswordInput
              value={confirm_password}
              onChange={handleOnChange}
              errors={errors}
            />

            <SubmitButton
              isLoading={registerLoading}
              handleSubmit={handleSubmit}
              isDisabled={!email || !password || !username || hasErrors}
              label="Register"
            />
          </>
          // ) : (
          //   <OtpForm
          //     otp={otp}
          //     setOtp={setOtp}
          //     email={email}
          //     handleOtpSubmit={handleOtpSubmit}
          //     resendOtp={resendOtp}
          //     countdown={countdown}
          //     verifyOtpLoading={verifyOtpLoading}
          //   />
          // )
        }
        footer={step === 1 && 'Already have an account?'}
        footerLink={step === 1 && 'Login'}
        footerLinkPath={step === 1 && '/login'}
      />
    </section>
  );
};

export default Register;
