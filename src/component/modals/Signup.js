import React, { useContext, useState } from "react";
import { Form, Input, Divider, Checkbox, Button } from "semantic-ui-react";

import {UserContext} from "../../context/user-context";
import { onAuthentication } from "../../context/action-types";
import { signupAPI } from "../../lib/market.api";

const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { dispatch } = useContext(UserContext);
  const onSignUpHandler = async () => {
    try {
      const { data: result } = await signupAPI({ username, email, password });
      const expiresIN = new Date(new Date().getTime() + 3600000);
      localStorage.setItem("token", JSON.stringify(result.token));
      localStorage.setItem("username", JSON.stringify(result.username));
      localStorage.setItem("expiresIn", expiresIN.toISOString());
      const payload = {
        token: result.token,
        username: result.username,
      };
      dispatch({ type: onAuthentication, payload: payload });
      props.closeModal();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <Form>
      {errorMessage ? (
        <div className="text-center h3 text-danger">{errorMessage}</div>
      ) : (
        ""
      )}
      <Form.Group widths="equal">
        <Form.Field>
          <Input
            icon="user"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <Input
            icon="mail"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field>
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <Checkbox label="I agree to the Terms and Conditions" />
      </Form.Field>
      <Button fluid type="submit" size="huge" onClick={onSignUpHandler}>
        Create Account
      </Button>
      <Divider horizontal>Or</Divider>
      <Button
        fluid
        basic
        size="large"
        content="Continue with Google"
        icon="google"
      />
      <Divider />
      <div className="d-flex">
        <h3>
          <b>Already a member! </b>
        </h3>
        <span className="text-muted">Login</span>
      </div>
    </Form>
  );
};

export default Signup;