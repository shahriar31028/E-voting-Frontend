import React, { Component, useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const inputEmail = {
  fontFamily: "Roboto sans-serif",
  outline: "0",
  backgroundColor: "white",
  width: "30%",
  border: "10",
  borderColor: "limegreen",
  margin: "0 0 15px",
  padding: "15px",
  boxSizing: "border-box",
  color: "black",
  borderRadius: "10px",
  lineBreak: "auto",
  fontSize: "25px",
  marginTop: "280px",
};

const inputPassword = {
  fontFamily: "Roboto sans-serif",
  outline: "0",
  backgroundColor: "white",
  width: "30%",
  border: "5",
  borderColor: "limegreen",
  margin: "0 0 15px",
  padding: "15px",
  boxSizing: "border-box",
  color: "black",
  borderRadius: "10px",
  lineBreak: "auto",
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
  lineBreak: "auto",
  fontSize: "25px",
  fontWeight: "bold",
  marginTop: "20px",
};

const submitEmail = {
  color: "black",
  fontSize: "20px",
};

const submitPassword = {
  color: "black",
  fontSize: "20px",
};

const register = {
  color: "black",
  fontSize: "25px",
};

const signUp = {
  color: "limegreen",
  backgroundColor: "white",
  border: "none",
  fontSize: "30px",
  outline: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

const initialState = {
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
};

function Login(props) {
  let [state, setState] = useState(initialState);
  let [error, setError] = useState("");

  const handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    setState({
      ...state,
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  const validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!state.email.includes("@")) {
      emailError = "Invalid email";
    }

    if (state.password.length < 6) {
      passwordError = "Invalid password";
    }

    if (emailError || passwordError) {
      setState({ ...state, emailError, passwordError });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      const response = await fetch("http://localhost:3000/loginUser", {
        method: "POST",
        withCredentials: true,
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.error !== undefined) {
        setError(data.error);
      } else {
        props.history.push("/Elections");
      }

      // props.history.push("/Elections");

      // if (data.email === email || data.password === password )
      //   props.history.push("/Elections");
      // else {
      //   console.log("email or password error");
      // }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/*<div>
                  <img src="vote.jpg" alt="vote" />
              </div>*/}
      <div>
        <input
          name="email"
          type="text"
          placeholder="Enter Your Email"
          autoComplete="off"
          value={state.email}
          onChange={handleChange}
          style={inputEmail}
        />
        <div style={submitEmail}>{state.emailError}</div>

        <input
          //ref={(input) => { input && input.background() }}
          name="password"
          type="text"
          placeholder="Enter Your Password"
          autoComplete="off"
          value={state.password}
          onChange={handleChange}
          style={inputPassword}
        />
        <div style={submitPassword}>{state.passwordError}</div>
      </div>

      <div>
        <button type="submit" style={submitButton}>
          {" "}
          Login{" "}
        </button>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}
      {/*</Link>*/}

      <div>
        <h3 style={register}> Not Registered Yet? </h3>
      </div>

      <Link to="/signup">
        <button style={signUp}> Sign Up </button>
      </Link>
    </form>
  );
}

export default withRouter(Login);

// class Logins extends Component {
//   handleChange = (event) => {
//     const isCheckbox = event.target.type === "checkbox";
//     this.setState({
//       [event.target.name]: isCheckbox
//         ? event.target.checked
//         : event.target.value,
//     });
//   };

//   validate = () => {
//     let emailError = "";
//     let passwordError = "";

//     if (!this.state.email.includes("@")) {
//       emailError = "Invalid email";
//     }

//     if (this.state.password.length < 6) {
//       passwordError = "Invalid password";
//     }

//     if (emailError || passwordError) {
//       this.setState({ emailError, passwordError });
//       return false;
//     }

//     return true;
//   };

//   handleSubmit = async (event) => {
//     event.preventDefault();
//     //var title = this.title;
//     //console.log(title);

//     if (this.validate()) {
//       const response = await fetch("http://localhost:3000/loginUser", {
//         method: "POST",
//         withCredentials: true,
//         credentials: "include", // include, *same-origin, omit
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: this.state.email,
//           password: this.state.password,
//         }),
//       });

//       const data = await response.text();
//       console.log(data);

//       // this.props.history.push("/Elections");

//       // if (data.email === this.email || data.password === this.password )
//       //   this.props.history.push("/Elections");
//       // else {
//       //   console.log("email or password error");
//       // }
//     }
//   };

//   /*componentDidMount() {
//         document.inputText.style.backgroundColor = 'limegreen'
//     }*/

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         {/*<div>
//                     <img src="vote.jpg" alt="vote" />
//                 </div>*/}
//         <div>
//           <input
//             //ref={(input) => { input && input.background() }}
//             name="email"
//             type="text"
//             placeholder="Enter Your Email"
//             autoComplete="off"
//             value={this.state.email}
//             onChange={this.handleChange}
//             style={inputEmail}
//           />
//           <div style={submitEmail}>{this.state.emailError}</div>

//           <input
//             //ref={(input) => { input && input.background() }}
//             name="password"
//             type="text"
//             placeholder="Enter Your Password"
//             autoComplete="off"
//             value={this.state.password}
//             onChange={this.handleChange}
//             style={inputPassword}
//           />
//           <div style={submitPassword}>{this.state.passwordError}</div>
//         </div>

//         {/*<Link to="/countdown">*/}
//         <div>
//           <button
//             /*onClick={this.validateform()}*/ type="submit"
//             style={submitButton}
//           >
//             {" "}
//             Login{" "}
//           </button>
//         </div>
//         {/*</Link>*/}

//         <div>
//           <h3 style={register}> Not Registered Yet? </h3>
//         </div>

//         <Link to="/signup">
//           <button style={signUp}> Sign Up </button>
//         </Link>
//       </form>
//     );
//   }
// }

// export default withRouter(Login);
