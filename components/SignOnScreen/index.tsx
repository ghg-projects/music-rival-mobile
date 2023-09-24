import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput, Pressable } from 'react-native';
import * as Yup from 'yup';

import { SUCCESS_HAPTIC, ERROR_HAPTIC } from '../../constants/Haptics';
import Button from '../../shared/Button';

type FormData = {
  username: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Username must be at least 5 characters')
    .max(15, 'Username must be less than 15 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .max(20, 'Password must be less than 20 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d).+/,
      'Password must contain at least capital letter, and a number',
    )
    .required('Password is required'),
});

const SignOnScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // TODO: Update when we have a backend
  const onSubmit = (data: FormData) => {
    console.log('Form submitted with data:', data);
  };
  console.log(errors);
  console.log('errors', Object.keys(errors).length);
  return (
    <View className="m-6 flex-1 justify-center items-center">
      <Text className="mb-2 text-2xl">{isLogin ? 'Login' : 'Register'}</Text>
      <Text className="mb-4 h-8">Please enter your username and password</Text>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="mb-5 w-4/5">
            <TextInput
              className={[
                errors.username
                  ? 'border border-red-500 p-2 rounded-lg'
                  : 'border border-gray-600 p-2 rounded-lg',
              ].join('')}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Username"
            />
            {errors.username && (
              <Text className="mt-1 text-red-500">
                {errors.username.message}
              </Text>
            )}
          </View>
        )}
        name="username"
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
        onPress={handleSubmit(onSubmit)}
        disabled={Object.keys(errors).length !== 0}
        text={isLogin ? 'Login' : 'Register'}
        haptic={
          Object.keys(errors).length === 0 ? SUCCESS_HAPTIC : ERROR_HAPTIC
        }
      />

      <Text className="mt-4 text-sm text-gray-500">
        {isLogin ? "Don't have an account?" : 'Already have an account? '}
        <Pressable onPress={toggleForm}>
          <Text className="text-blue-500 ml-2 mt-1 active:text-blue-800">
            {isLogin ? 'Register here' : 'Login here'}
          </Text>
        </Pressable>
      </Text>
    </View>
  );
};

export default SignOnScreen;
