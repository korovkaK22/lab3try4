import React, { useState } from 'react';
import { Button, Menu, MenuItem, TextField } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const FilterMenu = ({ applyFilters, buttonText, drivingExperienceLabel, nameLabel,filterMenuText }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [experience, setExperience] = useState('');
  const [name, setName] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApplyFilters = () => {
    applyFilters({ drivingExperience: parseInt(experience, 10), name });
    handleClose();
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={<FilterListIcon />}
      >
        {buttonText}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <TextField
            label={drivingExperienceLabel}
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            fullWidth
          />
        </MenuItem>
        <MenuItem>
          <TextField
            label={nameLabel}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </MenuItem>
        <MenuItem>
          <Button onClick={handleApplyFilters} color="primary" variant="contained" fullWidth>
            {filterMenuText}
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default FilterMenu;
