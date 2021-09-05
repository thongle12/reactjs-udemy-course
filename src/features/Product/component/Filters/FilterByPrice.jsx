import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root:{
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(2),
  },
  range:{
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& >span': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    }

  },
}))

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice({onChange}) {
  const classes = useStyles();
  const [value, setValue] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if(onChange){
      onChange(value); //truyền 2 price
    }
    setValue({
      salePrice_gte: 0,
      salePrice_lte: 0,
    })
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Giá</Typography>
      <Box className={classes.range}>
        <TextField name="salePrice_gte" value={value.salePrice_gte} onChange={handleChange} />
        <span>-</span>
        <TextField name="salePrice_lte" value={value.salePrice_lte} onChange={handleChange} />
      </Box>
      <Button variant="outlined" color="primary" onClick={handleSubmit} size="small">
        Áp dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;
