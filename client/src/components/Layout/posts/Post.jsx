import React, { useContext } from "react";
import { Button, Card, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/auth";
import gql from "graphql-tag";
// don't forget to install moment and use moment.create(createdAt)
import moment from "moment";
import { useMutation } from "@apollo/react-hooks";

const Post = ({ post }) => {
  const { user } = useContext(AuthContext);
  const [toggleLike ] = useMutation(LIKE_POST);
  const likePost = () => {
    if (!user) window.location.replace("/login");
    else {
      try {toggleLike({variables: {postId : post.id}})}
      catch(err) {console.log(err)}
    }
  };
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"
        />
        {user ? (
          user.username === post.username ? (
            <Button style = {{ padding : "2px"}}color="red" floated="right">
              <Icon name="trash" />
            </Button>
          ) : null
        ) : null}
        <Card.Header>{post.username}</Card.Header>
        <Card.Meta as={Link} to={"/posts/" + post.id}>
          {moment(post.createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{post.body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button color="red" onClick={likePost}>
            <Icon name="like" />
            Like
          </Button>
          <Button color="blue">
            <Icon name="comment" />
            Comment
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

const LIKE_POST = gql`
  mutation toggleLike($postId: ID!) {
    toggleLike(postId: $postId) {
      id
      username
      body
      createdAt
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export default Post;
