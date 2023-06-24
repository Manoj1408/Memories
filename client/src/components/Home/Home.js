import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

function Home() {
     const [currentId, setCurrentId] = useState(null);
    //  const classes = useStyles();
     const dispatch = useDispatch();

     useEffect(() => {
       dispatch(getPosts());
     }, [dispatch, currentId]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home