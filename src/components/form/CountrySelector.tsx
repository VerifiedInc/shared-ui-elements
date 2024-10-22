import { useMemo, useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

import { KeyboardArrowDown } from '@mui/icons-material';
import {
  countries,
  getPhoneDataByFieldName,
  sortByCountryName,
} from '../../utils/phone';

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
  shouldShowOnlyNorthAmericanCountries?: boolean;
}

/**
 * Component that renders and allows to manage the desired phone country format.
 * @constructor
 */
export default function CountrySelector({
  shouldShowOnlyNorthAmericanCountries = true,
  ...props
}: Readonly<CountrySelectorProps>): React.JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const options = useMemo(() => {
    // Remove Brazil from the list of countries, we allow only North American numbers.
    let _countries = [
      ...countries.filter((country) => country.countryCode !== 'BR'),
    ];

    // Show all countries in development mode.
    if (!shouldShowOnlyNorthAmericanCountries) {
      _countries = [...countries];
    }

    return [..._countries].sort(sortByCountryName);
  }, [shouldShowOnlyNorthAmericanCountries]);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id='demo-customized-button'
        aria-controls={open ? 'country-select-button' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='text'
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        {getPhoneDataByFieldName('countryCode', props.value)?.emoji}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'country-select-button',
        }}
        slotProps={{
          paper: {
            style: {
              maxHeight: 48 * 4.5,
              width: '20ch',
              minWidth: '300px',
            },
          },
        }}
      >
        {/* spread to avoid mutating the original countries array with sort method */}
        {options.map((country) => (
          <MenuItem
            role='menuitem'
            key={country.countryCode}
            onClick={() => {
              props.onChange(country.countryCode);
              handleClose();
            }}
          >
            {country.emoji} {country.countryName}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
