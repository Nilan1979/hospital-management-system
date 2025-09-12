import { createTheme } from '@mui/material/styles';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../constants/theme';

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary.main,
      dark: COLORS.primary.dark,
      light: COLORS.primary.light,
      contrastText: COLORS.primary.contrastText,
    },
    secondary: {
      main: COLORS.secondary.main,
      dark: COLORS.secondary.dark,
      light: COLORS.secondary.light,
      contrastText: COLORS.secondary.contrastText,
    },
    success: {
      main: COLORS.success.main,
      dark: COLORS.success.dark,
      light: COLORS.success.light,
    },
    warning: {
      main: COLORS.warning.main,
      dark: COLORS.warning.dark,
      light: COLORS.warning.light,
    },
    error: {
      main: COLORS.error.main,
      dark: COLORS.error.dark,
      light: COLORS.error.light,
    },
    info: {
      main: COLORS.info.main,
      dark: COLORS.info.dark,
      light: COLORS.info.light,
    },
    background: {
      default: COLORS.background.default,
      paper: COLORS.background.paper,
    },
    text: {
      primary: COLORS.text.primary,
      secondary: COLORS.text.secondary,
      disabled: COLORS.text.disabled,
    },
  },
  typography: {
    fontFamily: TYPOGRAPHY.fontFamily.primary,
    h1: {
      fontSize: '2.5rem',
      fontWeight: TYPOGRAPHY.fontWeight.bold,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: TYPOGRAPHY.fontWeight.bold,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: TYPOGRAPHY.fontWeight.bold,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: TYPOGRAPHY.fontWeight.bold,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: TYPOGRAPHY.fontWeight.medium,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: TYPOGRAPHY.fontWeight.medium,
    },
    body1: {
      fontSize: TYPOGRAPHY.fontSize.md,
      fontWeight: TYPOGRAPHY.fontWeight.regular,
    },
    body2: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.regular,
    },
  },
  shape: {
    borderRadius: parseInt(BORDER_RADIUS.medium),
  },
  spacing: (factor) => `${parseInt(SPACING.sm) * factor}px`,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: BORDER_RADIUS.medium,
          fontWeight: TYPOGRAPHY.fontWeight.medium,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS.medium,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: BORDER_RADIUS.medium,
          },
        },
      },
    },
  },
});

export default theme;