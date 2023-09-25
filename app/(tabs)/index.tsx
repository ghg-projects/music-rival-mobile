import { useEffect } from 'react';
import { Alert, Button as NativeButton } from 'react-native';
import { useHaptics } from 'react-native-custom-haptics';

import { Text, View } from '../../components/Themed';
import { TEST_HAPTIC } from '../../constants/Haptics';
import Button from '../../shared/Button';

import { supabase } from '@/lib/supabase';

export default function TabOneScreen() {
  const { trigger, stop } = useHaptics();
  useEffect(() => {
    // stops the haptic pattern on cleanup
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function signout() {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
  }
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold text-xl">Tab One</Text>
      <View
        className="w-4/5 my-8 h-px"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button text="Sign Out" onPress={signout} />

      <Button text="shared button" onPress={() => null} />
      <NativeButton
        title="custom haptic"
        onPress={() => trigger(TEST_HAPTIC)}
      />
    </View>
  );
}
