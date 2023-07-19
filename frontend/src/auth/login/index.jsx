import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import Register from "../register";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      isLoaded: false,
      password: null,
      formErrors: {
        email: "",
        password: "",
      },
    };
  }
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
  };
  render() {
    let { email, password, formErrors, isLoaded } = this.state;
    return (
      <div>
        <div className="modal fade login-modal-main" id="bd-example-modal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="login-modal">
                  <button
                    type="button"
                    className="close close-top-right"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">
                      <i className="mdi mdi-close" />
                    </span>
                    <span className="sr-only">Close</span>
                  </button>
                  <form onSubmit={this.handleSubmit} noValidate>
                    {/* Tab panes */}
                    <div className="tab-content">
                      <div
                        className="tab-pane active"
                        id="login"
                        role="tabpanel"
                      >
                        <h5 className="heading-design-h5">
                          Login to your account
                        </h5>
                        <fieldset className="form-group mt-4">
                          <label>Enter Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={email || null}
                            onChange={this.handleChange}
                          />
                          {formErrors.email.length > 0 && (
                            <span className="errorMessage">
                              {formErrors.email}
                            </span>
                          )}
                        </fieldset>
                        <fieldset className="form-group">
                          <label>Enter Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                          />
                          {formErrors.password.length > 0 && (
                            <span className="errorMessage">
                              {formErrors.password}
                            </span>
                          )}
                        </fieldset>
                        <fieldset className="form-group">
                          <button
                            type="submit"
                            className="btn btn-lg btn-secondary btn-block"
                            onClick={this.handleSubmit}
                          >
                            Login
                          </button>
                        </fieldset>

                        <fieldset className="form-group"></fieldset>
                        {/* <div className="login-with-sites text-center">
                                                                <p>or Login with your social profile:</p>
                                                                <button className="btn-facebook login-icons btn-lg"><i className="mdi mdi-facebook" /> Facebook</button>
                                                                <button className="btn-google login-icons btn-lg"><i className="mdi mdi-google" /> Google</button>
                                                            </div> */}
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck1"
                          >
                            Remember me
                          </label>
                          <div class="float-right">
                            <a href="/users/password/new">
                              Forgot your password?
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane" id="register" role="tabpanel">
                        <Register />
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="text-center login-footer-tab">
                      <p className="mt-3">
                        {" "}
                        Not a member? <a href="/register">Register Now</a>
                      </p>
                    </div>
                    <div className="clearfix" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
