import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from '../Context/auth'
const Login = (props) => {
  const { login} = useContext(AuthContext)
  const [values, setValues] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState(null);

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      login(result.data.login);
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(errors);
    },
    variables: values
  });

  const onSubmit = e => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className="form-container" onSubmit={onSubmit}>
      <Form className={loading ? "loading" : ""}>
        <Form.Input
          type="text"
          label="Username"
          placeholder="Username.."
          name="username"
          value={values.username}
          onChange={onChange}
          error={errors ? errors.username : null}
        />
        <Form.Input
          type="password"
          label="password"
          placeholder="password.."
          name="password"
          value={values.password}
          onChange={onChange}
          error={errors ?errors.password : null}
        />
        <Button primary type="submit">
          Log In
        </Button>
      </Form>
      {errors ? (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(err => {
              return <li>{err}</li>;
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      token
      createdAt
    }
  }
`;

export default Login;
