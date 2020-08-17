import React, { useState } from "react";
import "../App.scss";
import { Button, TextInput, Alert, Text, Heading } from "evergreen-ui";
import axios from "axios";

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [messageIndicator, setMessageIndicator] = useState("");
  let messageElement;

  let sendEmailAxios = () => {
    const user = {
      username: username,
      password: password,
    };
    axios
      .post("/email/send/", user)
      .then()
      .catch((err) => console.log(err, "err"));
  };

  let verify = () => {
    axios
      .get("/user/checkuser", { params: { username } })
      .then((response) => {
        if (response.data) {
          setUsername(response.data.username);
          setPassword(response.data.password);
          sendEmailAxios();
          setMessageIndicator("success");
        } else {
          setMessageIndicator("error");
        }
      })
      .catch((err) => setMessageIndicator("error"))
      .finally(() => {
        setShowMessage(true);
      });
  };

  if (messageIndicator === "success") {
    messageElement = (
      <Alert intent="success" title="Sent email" marginBottom={32} />
    );
  } else if (messageIndicator === "error") {
    messageElement = (
      <Alert
        intent="danger"
        title="Email not authenticated with AWS"
        marginBottom={32}
      />
    );
  }

  return (
    <div className="login-page">
      <div className="login-user-container">
        <Heading size={700} marginTop="default">
          Forgot Password
        </Heading>
        <form className="login-page-form">
          <Text>
            <label value="username">Type in username</label>
          </Text>
          <TextInput
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Button
            appearance="primary"
            onClick={(e) => {
              e.preventDefault();
              verify();
            }}
          >
            Submit
          </Button>
        </form>

        <div className="message-container">{showMessage && messageElement}</div>
      </div>
    </div>
  );
}
export default LoginPage;
