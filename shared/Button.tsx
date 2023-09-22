import * as Haptics from 'expo-haptics';
import { styled } from 'nativewind';
import { Text, Pressable } from 'react-native';

// starter props of a Button, will prob need to add more as we go
type ButtonProps = {
  text: string;
  onPress: () => void;
};

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

const Button = ({ onPress, text }: ButtonProps) => {
  return (
    <StyledPressable
      className="border-2 border-blue-500 h-12 px-4 items-center justify-center rounded-md active:border-blue-700"
      onPress={() => {
        Haptics.selectionAsync();
        onPress();
      }}
    >
      <StyledText className="font-bold text-blue-500">{text}</StyledText>
    </StyledPressable>
  );
};

export default Button;
