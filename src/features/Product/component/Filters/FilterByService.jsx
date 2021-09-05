import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Checkbox, FormControlLabel, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(2),
  },
  list: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    '& > li': {
      margin:0,
    },
  },
}));

FilterByService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterByService({ filters = {}, onChange }) {
  const classes = useStyles();
  // const [value, setValue] = useState({
  //   isPromotion: Boolean(filters.isPromotion),
  //   isFreeship: Boolean(filters.isFreeShip),
  // });

  const handleChange = (e) => {
    if (!onChange) return;
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Dịch vụ</Typography>

      <ul className={classes.list}>
        {[
          { value: 'isPromotion', label: 'Có giảm giá' },
          { value: 'isFreeShip', label: 'Miễn phí vận chuyển' },
        ].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleChange}
                  name={service.value}
                  color="primary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
