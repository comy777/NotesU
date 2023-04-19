import { CustomTheme } from "../interfaces/theme";

export const LightTheme: CustomTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    modal: 'white',
    pickerItem: '#FAFAFA'
  },
};

export const DarkTheme: CustomTheme = {
  dark: true,
  colors: {
    primary: 'teal',
    background: 'rgb(0, 0, 0)',
    card: 'rgb(255, 255, 255)',
    text: 'teal',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    modal: 'rgb(0, 0, 0)',
    pickerItem: '#FAFAFA'
  },
};