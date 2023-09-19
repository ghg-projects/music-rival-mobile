import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';
import { Button } from 'react-native';
import { useHaptics } from 'react-native-custom-haptics';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { PUSLING_HAPTIC } from '../../constants/Haptics';

export default function TabOneScreen() {
  const { trigger, stop } = useHaptics();
  useEffect(() => {
    // stops the haptic pattern on cleanup
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="flex items-center justify-center">
      <Text className="text-bold">Tab One</Text>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      {/* below are example buttons of haptics */}
      <Text>CUSTOM</Text>
      <Button title="Custom" onPress={() => trigger(PUSLING_HAPTIC)} />
      <Text>SELECTION</Text>
      <Button title="Selection" onPress={() => Haptics.selectionAsync()} />
      <Text>NOTIFICATIONS</Text>
      <Button
        title="Success"
        onPress={() =>
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        }
      />
      <Button
        title="Error"
        onPress={() =>
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        }
      />
      <Button
        title="Warning"
        onPress={() =>
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
        }
      />
      <Text>IMPACT</Text>
      <Button
        title="Light"
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
      />
      <Button
        title="Medium"
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
      />
      <Button
        title="Heavy"
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
      />
    </View>
  );
}
