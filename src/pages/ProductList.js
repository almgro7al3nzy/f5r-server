import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination
} from '@material-ui/core';
import ProductListToolbar from 'src/components/product/ProductListToolbar';
import ProductCard from 'src/components/product/ProductCard';
//import products from 'src/__mocks__/products';
import axios from 'axios';
import ROUTER from "src/router";

let url_request = ROUTER.FLASK_ROUTE.concat("api/search_rooms");

var rooms = [];

axios.get(url_request, {})
  .then((response) => {
    rooms = response.data.rooms;
    console.log(rooms)
  })

const ProductList = () => (

  <>
    <Helmet>
        <title>YANA - Voice Chat Rooms</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <ProductListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {rooms.map((room) => (
              <Grid
                item
                key={room.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard room={room} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  </>
);

export default ProductList;
