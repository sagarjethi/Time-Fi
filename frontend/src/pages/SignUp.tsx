import React from "react";
import Typography from "@material-ui/core/Typography";
import { Form, Layout, MainPaper } from "../form/FormLayout";
import { SubmitButton } from "../form/Buttons";
import axios from "axios";
import { Password, TextField } from "../form/Fields";
import { LockAvatar } from "../form/Misc";
import { RouterChildContext, RouterProps } from "react-router";

type UpdateEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

class SignUp extends React.Component<RouterProps> {
  state = {
    username: "",
    password: "",
    confirmPassword: ""
  };
  submit = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { username, password, confirmPassword } = this.state;
    try {
      await axios.post("/user", { username, password });
      this.props.history.push("/");
    } catch (e) {
      alert(`Login error ${e}`);
    }
  };
  update = (property: string) => ({ target: { value } }: UpdateEvent) => {
    this.setState({ [property]: value });
  };
  render() {
    return (
      <Layout>
        <MainPaper>
          <LockAvatar />
          <Typography variant="headline">Sign Up</Typography>
          <Form onSubmit={this.submit}>
            <TextField
              autoFocus
              name="username"
              update={this.update("username")}
            >
              Username
            </TextField>
            <Password update={this.update("password")}>Password</Password>
            <Password
              update={this.update("confirmPassword")}
              name="confirmPassword"
            >
              Confirm Password
            </Password>
            <SubmitButton>Sign Up</SubmitButton>
          </Form>
        </MainPaper>
      </Layout>
    );
  }
}

export default SignUp;
