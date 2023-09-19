import * as Haptics from 'expo-haptics';
import { styled } from 'nativewind';
import { Text, Pressable } from 'react-native';

import { View } from '../components/Themed';

// starter props of a Button, will prob need to add more as we go
type ButtonProps = {
  text: string;
  onPress: () => void;
};

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

const Button = ({ onPress, text }: ButtonProps) => {
  return (
    <View>
      <StyledPressable
        className="border-2 border-blue-500 h-12 px-4 items-center justify-center rounded-md active:border-blue-700"
        onPress={() => {
          Haptics.selectionAsync();
          onPress();
        }}
      >
        <StyledText className="font-bold text-white">{text}</StyledText>
      </StyledPressable>
    </View>
  );
};

export default Button;
