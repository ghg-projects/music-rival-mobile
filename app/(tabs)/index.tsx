import { useEffect } from 'react';
import { Button as NativeButton } from 'react-native';
import { useHaptics } from 'react-native-custom-haptics';

import { Text, View } from '../../components/Themed';
import { TEST_HAPTIC } from '../../constants/Haptics';
import Button from '../../shared/Button';

export default function TabOneScreen() {
  const { trigger, stop } = useHaptics();
  useEffect(() => {
    // stops the haptic pattern on cleanup
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold text-xl">Tab One</Text>
      <View
        className="w-4/5 my-8 h-px"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button text="shared button" onPress={() => null} />
      <NativeButton
        title="custom haptic"
        onPress={() => trigger(TEST_HAPTIC)}
      />
    </View>
  );
}
