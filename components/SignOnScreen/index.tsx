import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import * as Yup from 'yup';

import { SUCCESS_HAPTIC, ERROR_HAPTIC } from '@/constants/Haptics';
import { supabase } from '@/lib/supabase';
import Button from '@/shared/Button';

type FormData = {
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  // TODO: look into email validation
  email: Yup.string()
    .min(3, 'Email must be at least than 3 characters')
    .max(254, 'Email must be less than 254 characters')
    .email('Must be a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be less than 20 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d).+/,
      'Password must contain at least capital letter, and a number',
    )
    .required('Password is required'),
});

const SignOnScreen = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const isFormError: boolean = Object.keys(errors).length !== 0;

  async function signInWithEmail({ email, password }: FormData) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail({ email, password }: FormData) {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View className="m-6 flex-1 justify-center items-center">
      <Text className="mb-2 text-2xl">{isLogin ? 'Login' : 'Register'}</Text>
      <Text className="mb-4 h-8">Please enter your email and password</Text>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="mb-5 w-4/5">
            <TextInput
              className={[
                errors.email
                  ? 'border border-red-500 p-2 rounded-lg'
                  : 'border border-gray-600 p-2 rounded-lg',
              ].join('')}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Email"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text className="mt-1 text-red-500">{errors.email.message}</Text>
            )}
          </View>
        )}
        name="email"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="mb-12 w-4/5">
            <TextInput
              className={[
                errors.password
                  ? 'border border-red-500 p-2 rounded-lg'
                  : 'border border-gray-600 p-2 rounded-lg',
              ].join('')}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Password"
              secureTextEntry
            />
            {errors.password && (
              <Text className="mt-1 text-red-500">
                {errors.password.message}
              </Text>
            )}
          </View>
        )}
        name="password"
        defaultValue=""
      />

      <Button
        onPress={
          isLogin
            ? handleSubmit(signInWithEmail)
            : handleSubmit(signUpWithEmail)
        }
        disabled={isFormError || loading}
        text={isLogin ? 'Login' : 'Register'}
        haptic={isFormError ? ERROR_HAPTIC : SUCCESS_HAPTIC}
      />

      <Text className="mt-4 text-sm text-gray-500">
        {isLogin ? "Don't have an account?" : 'Already have an account? '}
        <Pressable
          onPress={() => {
            setIsLogin(!isLogin);
          }}
        >
          <Text className="text-blue-500 ml-2 mt-1 active:text-blue-800">
            {isLogin ? 'Register here' : 'Login here'}
          </Text>
        </Pressable>
      </Text>
    </View>
  );
};

export default SignOnScreen;
