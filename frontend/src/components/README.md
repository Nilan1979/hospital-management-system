# Frontend Components - Atomic Design Architecture

This frontend follows the **Atomic Design** methodology for organizing components in a scalable and maintainable way.

## 🏗️ Architecture Overview

Our component architecture is organized into five distinct levels:

```
src/components/
├── atoms/          # Basic building blocks
├── molecules/      # Simple combinations of atoms
├── organisms/      # Complex UI sections
├── templates/      # Page layouts and wireframes
└── index.js        # Main component exports
```

## ⚛️ Atoms
*Basic UI building blocks that can't be broken down further*

### Available Atoms:
- **PrimaryButton** - Styled button component with variants
- **FormInput** - Input field with validation states
- **InfoCard** - Basic information display card
- **Logo** - Application logo component
- **Icon** - Centralized icon system with Material-UI icons
- **Typography** - Styled text component with theme integration
- **Badge** - Notification badges and status indicators
- **Chip** - Status chips with color variants (inventory status, categories)
- **Avatar** - User avatar component with size variants
- **Divider** - Visual separation element

### Inventory-Specific Atoms:
- **StockBadge** - Stock level indicator with color coding
- **CategoryChip** - Category display chip with hierarchy support
- **ProductStatus** - Product status indicator (active/inactive/expired)
- **QuantityInput** - Specialized quantity input with validation
- **ExpiryDateBadge** - Expiry date indicator with warning states

### Usage Example:
```jsx
import { PrimaryButton, Icon, Typography } from '../components';

<PrimaryButton variant="contained" color="primary">
  <Icon name="add" />
  <Typography>Add Item</Typography>
</PrimaryButton>
```

## 🧪 Molecules
*Simple combinations of atoms that work together as a unit*

### Available Molecules:
- **LoginForm** - Complete login form with validation
- **QuickStats** - Statistics display grid
- **DashboardGrid** - Dashboard card layout
- **NavigationItem** - Sidebar navigation button
- **SearchBar** - Search input with filters
- **ActionButtons** - Button groups for actions

### Inventory-Specific Molecules:
- **ProductCard** - Product information card with LKR pricing
- **CategorySelector** - Category selection dropdown with hierarchy
- **StockAlert** - Stock alert component with severity levels
- **IssueForm** - Product issue form for patients/departments
- **ProductSearchBar** - Advanced product search with filters
- **PriceDisplay** - LKR currency formatter component

### Usage Example:
```jsx
import { SearchBar, ActionButtons } from '../components';

<SearchBar 
  placeholder="Search items..."
  onSearch={handleSearch}
  showFilter={true}
/>
<ActionButtons 
  actions={[
    { label: 'Add', onClick: handleAdd, icon: 'add' },
    { label: 'Export', onClick: handleExport, icon: 'download' }
  ]}
/>
```

## 🦴 Organisms
*Complex UI sections made up of groups of molecules and/or atoms*

### Available Organisms:
- **AppHeader** - Application top navigation bar
- **Sidebar** - Collapsible side navigation
- **DataTable** - Advanced data table with pagination, search, and actions

### Inventory-Specific Organisms:
- **InventoryDashboard** - Complete inventory overview with LKR stats
- **ProductsTable** - Specialized product management table
- **CategoryManager** - Category management interface
- **IssueTracker** - Product issue tracking system
- **StockAlertsPanel** - Stock alerts monitoring panel
- **InventoryReports** - Comprehensive reporting interface

### Usage Example:
```jsx
import { DataTable } from '../components';

<DataTable
  title="Inventory Items"
  columns={columns}
  data={data}
  searchable={true}
  actions={actions}
  pagination={true}
/>
```

## 📐 Templates
*Page layouts that define the structure without specific content*

### Available Templates:
- **MainLayout** - Standard app layout with header and sidebar
- **FullscreenLayout** - Full-screen layout for login/auth pages

### Inventory-Specific Templates:
- **InventoryLayout** - Inventory-specific layout with filters and actions
- **ProductDetailLayout** - Product detail view layout
- **ReportsLayout** - Reports and analytics layout

### Usage Example:
```jsx
import { MainLayout } from '../components';

<MainLayout title="Page Title">
  <YourPageContent />
</MainLayout>
```

## 🎨 Theme Integration

All components integrate with our centralized theme system:

```jsx
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

// Colors are available throughout all components
// COLORS.primary.main, COLORS.error.main, etc.
```

## 📱 Responsive Design

Components are built with mobile-first responsive design:

- Breakpoints: xs, sm, md, lg, xl
- Flexible layouts using Material-UI Grid system
- Adaptive components that work across all screen sizes

## 🚀 Best Practices

### 1. Import Pattern
```jsx
// ✅ Good - Use centralized imports
import { Button, Typography, Icon } from '../components';

// ❌ Avoid - Direct imports from subfolders
import Button from '../components/atoms/Button';
```

### 2. Component Composition
```jsx
// ✅ Good - Compose using atomic components
<Card>
  <Typography variant="h6">Title</Typography>
  <Icon name="dashboard" />
  <PrimaryButton>Action</PrimaryButton>
</Card>

// ❌ Avoid - Direct Material-UI imports in pages
import { Button } from '@mui/material';
```

### 3. Props Standardization
- Use consistent prop names across similar components
- Leverage theme constants for colors and spacing
- Provide sensible defaults for optional props

## 🔧 Development Guidelines

### Adding New Components

1. **Atoms**: Add to `/atoms/` folder and export in `atoms/index.js`
2. **Molecules**: Combine existing atoms, add to `/molecules/`
3. **Organisms**: Complex sections using molecules/atoms
4. **Templates**: Page layouts using organisms

### Testing Components
- Test atoms in isolation
- Test molecules with mock atom props
- Test organisms with realistic data
- Test templates with various content types

## 📚 Examples

### Creating a New Feature Page
```jsx
// pages/NewFeaturePage.jsx
import React from 'react';
import { 
  MainLayout, 
  DataTable, 
  Typography, 
  ActionButtons 
} from '../components';

const NewFeaturePage = () => {
  return (
    <MainLayout title="New Feature">
      <Typography variant="h4" gutterBottom>
        Feature Title
      </Typography>
      
      <ActionButtons 
        actions={[
          { label: 'Add New', onClick: handleAdd }
        ]}
      />
      
      <DataTable 
        columns={columns}
        data={data}
        searchable={true}
      />
    </MainLayout>
  );
};
```

## 🎯 Migration Guide

If migrating existing components:

1. Replace direct Material-UI imports with our atomic components
2. Use centralized theme constants instead of inline styles
3. Extract reusable patterns into molecules
4. Use templates for consistent page layouts

---

This architecture ensures:
- **Consistency** across the application
- **Reusability** of UI components
- **Maintainability** through clear separation of concerns
- **Scalability** as the application grows