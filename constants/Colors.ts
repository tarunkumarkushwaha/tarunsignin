/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#1e90ff'; 
const tintColorDark = '#1e90ff'; 

export const Colors = {
  light: {
    text: '#2C3E50', 
    background: '#F9FAFB', 
    tint: tintColorLight,
    icon: '#A1B2B7',
    tabIconDefault: '#A1B2B7', 
    tabIconSelected: tintColorLight, 
  },
  dark: {
    text: '#D3D8DD',
    background: '#1C1F23', 
    tint: tintColorDark, 
    icon: '#A1B2B7', 
    tabIconDefault: '#A1B2B7',
    tabIconSelected: tintColorDark,
  },
};
