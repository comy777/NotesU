import { CustomTheme } from "../interfaces/theme";

export const LightTheme: CustomTheme = {
  dark: false,
  colors: {
    primary: '#8BC34A',
    background: '#DCEDC8',
    card: 'rgb(255, 255, 255)',
    text: '#212121',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    modal: '#DCEDC8',
    pickerItem: '#FAFAFA',
    accent: '#FF9800'
  },
};

export const DarkTheme: CustomTheme = {
  dark: true,
  colors: {
    primary: '#689F38',
    background: '#202C33',
    card: 'rgb(255, 255, 255)',
    text: '#689F38',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    modal: '#202C33',
    pickerItem: '#FAFAFA',
    accent: '#FF9800'
  },
};