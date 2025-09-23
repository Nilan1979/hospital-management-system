import React, { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { Icon } from '../atoms';
import { COLORS } from '../../constants/theme';

const SearchBar = ({ 
  placeholder = 'Search...',
  value = '',
  onChange,
  onSearch,
  onClear,
  showFilter = false,
  onFilter,
  disabled = false,
  fullWidth = true,
  sx,
  ...props 
}) => {
  const [searchValue, setSearchValue] = useState(value);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    if (onClear) {
      onClear();
    }
    if (onChange) {
      onChange('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ...sx }}>
      <TextField
        value={searchValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        fullWidth={fullWidth}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon name="search" color={COLORS.text.secondary} />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClear}
                edge="end"
              >
                <Icon name="close" />
              </IconButton>
            </InputAdornment>
          )
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: COLORS.primary.main,
            },
          }
        }}
        {...props}
      />
      
      {showFilter && (
        <IconButton
          onClick={onFilter}
          disabled={disabled}
          sx={{
            border: `1px solid ${COLORS.border}`,
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: COLORS.background.paper
            }
          }}
        >
          <Icon name="filter" />
        </IconButton>
      )}
    </Box>
  );
};

export default SearchBar;