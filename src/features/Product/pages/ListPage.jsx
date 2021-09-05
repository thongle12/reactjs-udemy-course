import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
import ProductFilters from '../component/ProductFilters';
import ProductList from '../component/ProductList';
import ProductSkeletonList from '../component/ProductSkeletonList';
import ProductSort from '../component/ProductSort';

import FilterViewer from '../component/FilterViewer';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';


ListPage.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    
  },
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    marginTop: '30px',
    paddingBottom: '50px',
  },
}));

function ListPage(props) {
  const classes = useStyle();


  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search)




  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 9,
    total: 10,
    page: 1,
  });

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(() => ({
    ...queryParams,
    _page: Number.parseInt(queryParams._page)  || 1,
    _limit: Number.parseInt(queryParams._limit) || 9,
    _sort: queryParams._sort || 'salePrice:ASC',
  }));


  useEffect(()=> {
    //sync filter to url
    //history.push() bth là truyền 'path', lần này truyền object
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filter)
    })

  },[history, filter]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filter);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('fail to fetch product list', error);
      }

      setLoading(false);
    })();
  }, [filter]);

  const handlePageChange = (e, page) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      _page: page,
    }));
  };

  const handleSortChange = (newSortValue) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      _sort: newSortValue,
    }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...newFilters,
    }));
  };

  const setNewFilters = (newFilters) => {
    setFilter(newFilters);
  }

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters filters={filter} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={filter._sort} onChange={handleSortChange} />
              <FilterViewer filters={filter} onChange={setNewFilters} />

              {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}
              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
