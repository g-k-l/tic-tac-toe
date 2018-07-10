import "./modals.css";
import React from "react";
import { RESET_MODAL_NAME, SET_ICONS_MODAL_NAME } from "../constants";

/* Notes:
https://daveceddia.com/open-modal-in-react/
https://codeburst.io/modals-in-react-f6c3ff9f4701

DO NOT SET INITIAL STATE USING PROPS AND EXPECT
THE COMPONENT TO RE-RENDER CORRECTLY
https://stackoverflow.com/questions/28785106/reactjs-why-is-passing-the-component-initial-state-a-prop-an-anti-pattern/28785276#28785276
*/

class ModalConductor extends React.Component {
  render() {
    switch (this.props.modalName) {
      case SET_ICONS_MODAL_NAME:
        return <SetIconsModal modalAction={this.props.modalAction}/>;
      case RESET_MODAL_NAME:
        return <ResetModal modalAction={this.props.modalAction}/>;
      default:
        return null;
    }
  }
}

class SetIconsModal extends React.Component {
  render() {
    return;
  }
}

class ResetModal extends React.Component {
  render() {
    return (
      <div className="backdrop">
        <div className="modal">
          <div className="modal-guts">Go Back to Top?</div>
          <input
            className="button"
            type="submit"
            value="Yes"
            onClick={this.props.modalAction}
          />
          <input className="button" type="submit" value="No" onClick="" />
        </div>
      </div>
    );
  }
}

export default ModalConductor;
