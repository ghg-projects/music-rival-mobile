import * as Haptics from 'expo-haptics';
import { styled } from 'nativewind';
import { Text, Pressable } from 'react-native';

// starter props of a Button, will prob need to add more as we go
type ButtonProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  haptic?: () => void;
};

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

const Button = ({ onPress, text, disabled, haptic }: ButtonProps) => {
  return (
    <StyledPressable
      className={
        'border-2 border-blue-500 items-center justify-center py-3 px-10 rounded bg-blue-500 active:bg-blue-800 ' +
        (disabled && 'opacity-50')
      }
      onPress={() => {
        if (haptic) {
          haptic();
        } else {
          Haptics.selectionAsync();
        }
        onPress();
      }}
      disabled={disabled}
    >
      <StyledText className="font-bold text-white">{text}</StyledText>
    </StyledPressable>
  );
};

export default Button;
