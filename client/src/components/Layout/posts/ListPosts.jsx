import React from 'react';
import Post from './Post'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Grid } from 'semantic-ui-react'

const ListPosts = () => {
    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);


    return(
          error ? (
              <h2>Error !</h2>
          ) : (
            <Grid columns={3} >
            <Grid.Row>
              <h2>Recent Posts</h2>
            </Grid.Row>
            <Grid.Row>
                {loading ? 
                    (<h2>Loading Posts</h2>)
                : 
                    (
                            data.getPosts.map(post => {
                                return (
                                    <Grid.Column className="centred" style ={{ marginBottom : "10px", padding: "5px"}}>
                                        <Post post={post} />
                                    </Grid.Column>
                                )
                            })
                    )
                }
            </Grid.Row>
        
          </Grid>
          )
        )
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts 
    {
        id
        username
        body
        createdAt
        comments
        {
            id
            username
            body
            createdAt
        }
    }
  }
`;

export default ListPosts;
