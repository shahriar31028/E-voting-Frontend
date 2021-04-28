import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const heading = {
  color: "black",
  fontSize: "80px",
  //backgroundColor: 'lightblue'
};

const forName = {
  fontFamily: "Roboto sans-serif",
  outline: "1",
  background: "white",
  width: "30%",
  border: "10",
  borderColor: "limegreen",
  margin: "0 0 15px",
  padding: "15px",
  boxSizing: "border-box",
  color: "black",
  borderRadius: "10px",
  fontSize: "25px",
  marginTop: "230px",
};

const forEmail = {
  fontFamily: "Roboto sans-serif",
  outline: "1",
  background: "white",
  width: "30%",
  border: "10",
  borderColor: "limegreen",
  margin: "0 0 15px",
  padding: "15px",
  boxSizing: "border-box",
  color: "black",
  borderRadius: "10px",
  fontSize: "25px",
  marginTop: "20px",
};

/*const forNid = {
    fontFamily: 'Roboto sans-serif',
    outline: '1',
    background: 'white',
    width: '30%',
    border: '10',
    borderColor: 'limegreen',
    margin: '0 0 15px',
    padding: '15px',
    boxSizing: 'border-box',
    color: 'black',
    borderRadius: '10px',
    fontSize: '25px',
    marginTop: '20px',
}*/

const forPassword = {
  fontFamily: "Roboto sans-serif",
  outline: "1",
  background: "white",
  width: "30%",
  border: "10",
  borderColor: "limegreen",
  margin: "0 0 15px",
  padding: "15px",
  boxSizing: "border-box",
  color: "black",
  borderRadius: "10px",
  fontSize: "25px",
  marginTop: "20px",
};

const submitButton = {
  fontFamily: "Roboto sans-serif",
  outline: "1",
  background: "limegreen",
  width: "10%",
  border: "0",
  margin: "0 0 15px",
  padding: "15px",
  boxSizing: "border-box",
  color: "white",
  borderRadius: "10px",
  marginTop: "25px",
  fontSize: "25px",
};

const nameSubmitError = {
  color: "black",
  fontSize: "20px",
};

const emailSubmitError = {
  color: "black",
  fontSize: "20px",
};

/*const nidSubmitError = {
    color: 'black',
    fontSize: '20px'
}*/

const passwordSubmitError = {
  color: "black",
  fontSize: "20px",
};

const initialState = {
  name: "",
  email: "",
  //nid: "",
  password: "",
  nameError: "",
  emailError: "",
  //nidError: "",
  passwordError: "",
};

class SignUp extends Component {
  state = initialState;

  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  validate = () => {
    let nameError = "";
    let emailError = "";
    //let nidError = ""
    let passwordError = "";

    if (!this.state.name) {
      nameError = "Please enter your name";
    }

    if (!this.state.email.includes("@")) {
      emailError = "Please enter your email";
    }

    /*if (this.state.nid.length !== 8) {
            nidError = "Minimum length 8 is required"
        }*/

    console.log(this.state.password);
    if (this.state.password.length < 6) {
      passwordError = "Minimum length 6 is required";
    }

    if (nameError || emailError || passwordError) {
      this.setState({ nameError, emailError, passwordError });
      return false;
    }

    return true;
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    console.log(this.state);

    //const isValid = this.validate();
    if (this.validate()) {
      const response = await fetch("http://localhost:3000/registerUser", {
        method: "POST",
        withCredentials: true,
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        }),
      });

      const data = await response.text();
      console.log(data);

      // console.log(this.state);
      //this.setState(initialState);
      this.props.history.push("/Login");
    }
  };

  /*componentDidMount() {
        document.body.style.backgroundColor = 'lightblue'
    }*/

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h3 style={heading}> Welcome </h3>
          <div>
            <input
              name="name"
              type="text"
              placeholder="Enter Your Name"
              value={this.state.name}
              onChange={this.handleChange}
              style={forName}
            />
            <div style={nameSubmitError}>{this.state.nameError}</div>
          </div>

          <div>
            <input
              name="email"
              type="teonSubmitxt"
              placeholder="Enter Your Email"
              value={this.state.email}
              onChange={this.handleChange}
              style={forEmail}
            />
            <div style={emailSubmitError}>{this.state.emailError}</div>
          </div>

          {/*<div>
                        <input
                            name="id"
                            type="text"
                            placeholder="Enter Your National ID No"
                            value={this.state.id}
                            onChange={this.handleChange}
                            style={forNid}
                        />
                        <div style={nidSubmitError}>
                            {this.state.nidError}
                        </div>
                    </div>*/}

          <div>
            <input
              name="password"
              type="text"
              placeholder="Enter Your Password"
              value={this.state.password}
              onChange={this.handleChange}
              style={forPassword}
            />
            <div style={passwordSubmitError}>{this.state.passwordError}</div>
          </div>

          {/*<Link to="/countdown">*/}
          <div>
            <button
              /*onClick={this.validateform()}*/ type="submit"
              style={submitButton}
            >
              {" "}
              Sign Up{" "}
            </button>
          </div>
          {/*</Link>*/}

          {/*<div>
                    <h3 style={register}> Not Registeblack Yet? </h3>
                </div>

                {/*<Link to="/signup">
                <div>
                    <h3>
                        <a href="http://localhost:3000/signup" style={signUp}> Sign Up </a></h3>
                </div>
                {/*</Link>*/}
        </form>
      </>
    );
  }
}

export default withRouter(SignUp);
