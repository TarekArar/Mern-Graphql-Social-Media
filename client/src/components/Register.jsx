import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../Context/auth";

function Register(props) {
  const { login } = useContext(AuthContext)
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState(null);

  const onChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      props.history.push('/');
      login(result.data.register);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(errors);
    },
    variables: values
  });

  const onSubmit = e => {
    e.preventDefault();
    addUser();
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <Form.Input
          type="text"
          label="Username"
          placeholder="Username.."
          name="username"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          type="email"
          label="email"
          placeholder="email.."
          name="email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          type="password"
          label="password"
          placeholder="password.."
          name="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          type="password"
          label="confirmPassword"
          placeholder="confirmPassword.."
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
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
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      username
      email
      token
      createdAt
    }
  }
`;

export default Register;
