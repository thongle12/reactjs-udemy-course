import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    
};

function ProductFilters({filters, onChange}) {

    const handleCategoryChange = (newCategoryId) => {
        if(!onChange) return;
        console.log('new category id', newCategoryId["id"])
        const newFilters = {
            ...filters,
            'category.id': newCategoryId["id"],
            'category.name': newCategoryId["name"],
        }
        onChange(newFilters);
    }

    const handleChange = (newValue) => { //newValue là obj chứa 2 giá trị min, max 
        console.log('newValue',newValue)
        if(onChange){
            onChange(newValue)
        }

    }
    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />
            <FilterByPrice onChange={handleChange} />
            <FilterByService filters={filters} onChange={handleChange}/>
        </Box>
    );
}

export default ProductFilters;