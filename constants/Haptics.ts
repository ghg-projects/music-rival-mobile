import * as Haptics from 'expo-haptics';
import { Impact } from 'react-native-custom-haptics/lib/typescript/HapticsProvider/types';

// custom haptic patterns
export const TEST_HAPTIC: Impact[] = [
  'light',
  50,
  'light',
  50,
  'light',
  50,
  'light',
  50,
  'light',
  50,
  'light',
  50,
  'light',
  50,
  'light',
  50,
  'light',
  50,
  'light',
  50,
  'medium',
  40,
  'medium',
  30,
  'medium',
  20,
  'medium',
  10,
  'heavy',
];

export const SUCCESS_HAPTIC = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

export const ERROR_HAPTIC = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
};

export const WARNING_HAPTIC = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
};
