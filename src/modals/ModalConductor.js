import "./modals.css";
import React from "react";
import { RESET_MODAL_NAME, SET_ICONS_MODAL_NAME } from "../constants";
import XLogo from "../assets/logo_x.svg";
import hackLogo from "../assets/logo_hack.svg";
import reactLogo from "../assets/logo_react.svg";


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
        return (
          <SetIconsModal
            modalAction={this.props.modalAction}
            hideModal={this.props.hideModal}
          />
        );
      case RESET_MODAL_NAME:
        return (
          <ResetModal
            modalAction={this.props.modalAction}
            hideModal={this.props.hideModal}
          />
        );
      default:
        return null;
    }
  }
}

class SetIconsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: "xo"
    };
    this.setIcon = this.setIcon.bind(this);
    this.renderMarkers = this.renderMarkers.bind(this);
  }

  setIcon(event) {
    this.props.modalAction(this.state.icons);
    this.props.hideModal();
  }

  selectIcon(icons) {
    this.setState({
      icons: icons
    })
  }

  renderMarkers() {
    const markers = [
      {
        icons: "phphack",
        src: hackLogo
      },
      {
        icons: "xo",
        src: XLogo
      },
      {
        icons: "reactangular",
        src: reactLogo
      }
    ];
    return markers.map((marker) => {
      var class_name;
      if (marker.icons === this.state.icons)
        class_name = 'marker marker-selected';
      else
        class_name = 'marker';
      return (<img className={class_name} 
        onClick={((event) => this.selectIcon(marker.icons))} 
        src={marker.src}
        alt={marker.icons}/>)
    })
  }

  iconsNameToDisplayName(icons){
    switch (icons){
      case "xo":
        return "X's & O's"
      case "phphack":
        return "PHP & Hack"
      case "reactangular":
        return "React & Angular"
      default:
        return "X's & O's"
    }
  }

  render() {
    return (
      <div className="backdrop">
        <div className="modal">
        <div className="modal-info">{this.iconsNameToDisplayName(this.state.icons)}</div>
          <div className="modal-guts">
            {this.renderMarkers()}
          </div>
          <div>
            <input
              className="button"
              type="submit"
              value="Submit"
              onClick={this.setIcon}
            />
            <input
              className="button"
              type="submit"
              value="Cancel"
              onClick={this.props.hideModal}
            />
          </div>
        </div>
      </div>
    );
  }
}

class ResetModal extends React.Component {
  render() {
    return (
      <div className="backdrop">
        <div className="modal">
          <div className="reset-modal-guts">Go Back to Top?</div>
          <input
            className="button"
            type="submit"
            value="Yes"
            onClick={this.props.modalAction}
          />
          <input
            className="button"
            type="submit"
            value="No"
            onClick={this.props.hideModal}
          />
        </div>
      </div>
    );
  }
}

export default ModalConductor;
