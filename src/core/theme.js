import { DefaultTheme } from 'react-native-paper'
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const color = {
  primary: '#070f18',
  gray: '#8b8989',
  lightGray: '#b2b2b2',
  light: '#fbfbfb',
  white: '#fff',
  black: '#000',
  button: "#50C878",
};

export const colors ={
  primary: "#f9fafb",
  secondary: "#f3f4f6",
  tertiary: "#6b7280",
  accent: "#881337",
  tint: "#374151",
  highlight: "#881337" + "10",
  placeholder: "#9ca3af",
  amber: "#f59e0b",
  green: "#16a34a",
  black: '#000',
};

export const shadow = {
  light: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  dark: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
};

export const sizes = {
  width,
  height,
  title: 32,
  h2: 24,
  h3: 18,
  body: 14,
  radius: 16,
};

export const spacing = {
  s: 8,
  m: 18,
  l: 24,
  xl: 40,
};


export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#fff',
    primary: '#560CCE',
    secondary: '#414757',
    error: '#f13a59',
    background: '#000000',
  },
}
/////////
