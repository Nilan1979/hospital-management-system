import React from 'react';
import { Icon as MuiIcon } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  CalendarToday as CalendarIcon,
  LocalHospital as LocalHospitalIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Assessment as AssessmentIcon,
  AccountCircle,
  ExitToApp as LogoutIcon,
  ArrowBack as ArrowBackIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

const iconMap = {
  dashboard: <DashboardIcon />,
  calendar: <CalendarIcon />,
  hospital: <LocalHospitalIcon />,
  people: <PeopleIcon />,
  inventory: <InventoryIcon />,
  assessment: <AssessmentIcon />,
  account: <AccountCircle />,
  logout: <LogoutIcon />,
  back: <ArrowBackIcon />,
  menu: <MenuIcon />,
  chevronLeft: <ChevronLeftIcon />,
  chevronRight: <ChevronRightIcon />,
  add: <AddIcon />,
  edit: <EditIcon />,
  delete: <DeleteIcon />,
  search: <SearchIcon />,
  filter: <FilterIcon />,
  download: <DownloadIcon />,
  upload: <UploadIcon />,
  settings: <SettingsIcon />,
  notifications: <NotificationsIcon />,
  help: <HelpIcon />,
  more: <MoreVertIcon />
};

const Icon = ({ name, sx, color = 'inherit', ...props }) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <MuiIcon sx={{ color, ...sx }} {...props}>
      {IconComponent}
    </MuiIcon>
  );
};

export default Icon;