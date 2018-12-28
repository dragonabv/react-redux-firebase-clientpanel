import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from "../../actions/settingsActions";

class Settings extends Component {
  disableBalanceOnAddChange = e => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };

  disableBalanceOnEditChange = e => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };

  allowRegistrationChange = e => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };

  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/">
              <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>

        <div className="card mt-4">
          <h3 className="card-header">Edit Settings</h3>
          <div className="card-body ml-3">
            <form>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="allowRegistration"
                  className="form-check-input"
                  checked={!!allowRegistration}
                  onChange={this.allowRegistrationChange}
                />
                <label htmlFor="allowRegistration" className="form-check-label">
                  Allow Registration
                </label>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="disableBalanceOnAdd"
                  checked={!!disableBalanceOnAdd}
                  onChange={this.disableBalanceOnAddChange}
                />
                <label
                  htmlFor="disableBalanceOnAdd"
                  className="form-check-label"
                >
                  Disable Balance On Add
                </label>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  className="form-check-input"
                  checked={!!disableBalanceOnEdit}
                  onChange={this.disableBalanceOnEditChange}
                />
                <label
                  htmlFor="disableBalanceOnEdit"
                  className="form-check-label"
                >
                  Disable Balance on Edit
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
