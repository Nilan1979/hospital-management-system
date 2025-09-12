# Component Architecture Guide

## 🏗️ Design System Overview

This project implements a comprehensive design system based on **Atomic Design** principles, providing a scalable and maintainable component architecture.

## 🔬 Atomic Design Structure

### Atoms (Basic Building Blocks)
Basic UI elements that can't be broken down further.

#### `Logo.jsx`
- Hospital logo component with icon and text
- Configurable visibility for icon/text
- Consistent branding across the app

```jsx
<Logo showIcon={true} showText={true} />
```

#### `FormInput.jsx`
- Styled text input with consistent theming
- Built on Material-UI TextField
- Supports all standard input props

```jsx
<FormInput
  label="Username"
  name="username"
  value={value}
  onChange={handleChange}
  required
/>
```

#### `PrimaryButton.jsx`
- Themed button component with loading states
- Multiple variants: contained, outlined, text
- Consistent styling across the application

```jsx
<PrimaryButton
  variant="contained"
  loading={isLoading}
  onClick={handleClick}
>
  Login
</PrimaryButton>
```

#### `InfoCard.jsx`
- Reusable card component with icon, title, description
- Clickable variants for navigation
- Consistent spacing and shadows

```jsx
<InfoCard
  title="Patient Management"
  description="Manage patient records"
  icon={<PeopleIcon />}
  onClick={handleClick}
/>
```

### Molecules (Component Combinations)
Groups of atoms that form functional units.

#### `LoginForm.jsx`
- Complete login form with validation
- Error handling and loading states
- Forgot password functionality

#### `DashboardGrid.jsx`
- Grid of navigation cards
- Role-based filtering
- Dynamic routing integration

#### `QuickStats.jsx`
- Statistical dashboard cards
- Configurable metrics display
- Responsive grid layout

### Organisms (Complex UI Sections)
Complete interface sections made of molecules and atoms.

#### `AppHeader.jsx`
- Application header with navigation
- User menu and logout functionality
- Back button support for sub-pages

### Templates (Page Layouts)
Layout components that define page structure.

#### `MainLayout.jsx`
- Standard page layout with header
- Container management
- Consistent spacing and styling

#### `FullscreenLayout.jsx`
- Full-screen layout for login/landing pages
- Background image support
- Centered content positioning

### Pages (Complete Views)
Full page implementations using templates and organisms.

#### `LoginPage.jsx`
- Complete login experience
- Background image integration
- Authentication flow handling

#### `DashboardPage.jsx`
- Main dashboard interface
- Statistics and navigation
- User-specific content

## 🎨 Design Token System

### Color Palette
```javascript
COLORS = {
  primary: { main: '#00897b', dark: '#00796b', light: '#4db6ac' },
  secondary: { main: '#f50057', dark: '#c51162', light: '#ff5983' },
  // ... other colors
}
```

### Typography Scale
```javascript
TYPOGRAPHY = {
  fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px', xl: '24px' },
  fontWeight: { light: 300, regular: 400, medium: 500, bold: 700 }
}
```

### Spacing System
```javascript
SPACING = {
  xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', xxl: '48px'
}
```

## 🔧 Component Guidelines

### Component Creation Rules

1. **Single Responsibility**: Each component should have one clear purpose
2. **Reusability**: Design components to be used in multiple contexts
3. **Consistency**: Use design tokens instead of hardcoded values
4. **Accessibility**: Include proper ARIA labels and semantic HTML

### File Naming Conventions
- **PascalCase** for component files: `PrimaryButton.jsx`
- **camelCase** for utility files: `useAuth.js`
- **kebab-case** for asset files: `login-cover.jpg`

### Component Structure Template
```jsx
import React from 'react';
import { styled } from '@mui/material/styles';
import { COLORS, SPACING } from '../../constants/theme';

const StyledComponent = styled('div')(() => ({
  // Use design tokens
  color: COLORS.text.primary,
  padding: SPACING.md,
}));

const MyComponent = ({ 
  title, 
  children, 
  onClick,
  ...props 
}) => {
  return (
    <StyledComponent onClick={onClick} {...props}>
      {title && <h2>{title}</h2>}
      {children}
    </StyledComponent>
  );
};

export default MyComponent;
```

## 📱 Responsive Design

### Breakpoint System
- **xs**: 0px (mobile)
- **sm**: 600px (tablet)
- **md**: 900px (small desktop)
- **lg**: 1200px (desktop)
- **xl**: 1536px (large desktop)

### Responsive Component Example
```jsx
const ResponsiveGrid = styled(Grid)(() => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));
```

## 🧪 Testing Strategy

### Component Testing
- Unit tests for individual components
- Integration tests for molecule/organism components
- Visual regression testing for UI consistency

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- Color contrast validation

## 🔄 Maintenance Guidelines

### Adding New Components
1. Determine atomic design level
2. Create in appropriate folder structure
3. Follow naming conventions
4. Use design tokens
5. Add to component index
6. Document props and usage

### Refactoring Existing Components
1. Maintain backward compatibility
2. Update all usage instances
3. Test thoroughly
4. Update documentation

## 📚 Component Library Export

The design system is structured to be easily exported as a standalone component library:

```javascript
// Future component library index
export { 
  // Atoms
  Logo, 
  FormInput, 
  PrimaryButton, 
  InfoCard,
  // Molecules
  LoginForm, 
  DashboardGrid, 
  QuickStats,
  // Layouts
  MainLayout, 
  FullscreenLayout 
} from './components';
```

This architecture ensures:
- **Scalability**: Easy to add new components
- **Maintainability**: Clear separation of concerns
- **Reusability**: Components can be used across different pages
- **Consistency**: Design tokens ensure uniform appearance
- **Flexibility**: Easy to customize and extend