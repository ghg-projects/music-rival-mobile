import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Yup from 'yup';

interface FormData {
  username: string;
  password: string;
}

// TODO: Figure out additional validation for user/pass
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Username must be at least 5 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .required('Password is required'),
});

export default function SignOn() {
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

  return (
    <View className="m-6 flex-1 justify-center items-center">
      <Text className="mb-2 text-2xl">{isLogin ? 'Login' : 'Register'}</Text>
      <Text className="mb-4">Please enter your username and password :)</Text>

      <View className="h-8" />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              className={[
                errors.username
                  ? 'border border-red-500 p-2 w-4/5'
                  : 'border border-gray-600 p-2 w-4/5',
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
          </>
        )}
        name="username"
        defaultValue=""
      />

      <View className="h-8" />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              className={[
                errors.password
                  ? 'border border-red-500 p-2 w-4/5'
                  : 'border border-gray-600 p-2 w-4/5',
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
          </>

        )}
        name="password"
        defaultValue=""
      />

      <View className="h-12" />

      <TouchableOpacity
        className="bg-blue-500 hover:bg-blue-700 font-bold py-3 px-10 rounded"
        onPress={handleSubmit(onSubmit)}
        disabled={Object.keys(errors).length > 0}
      >
        <Text className="text-white text-md">
          {isLogin ? 'Login' : 'Register'}
        </Text>
      </TouchableOpacity>

      <Text className="mt-4 text-sm text-gray-500">
        {isLogin ? "Don't have an account?" : 'Already have an account? '}
        <TouchableOpacity onPress={toggleForm}>
          <Text className="text-blue-500 ml-2 mt-1">
            {isLogin ? 'Register here' : 'Login here'}
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}
