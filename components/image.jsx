import React, { Component } from "react";

export class Image extends Component {
  render() {
    return (
      <img
        src={`/an${this.props.src}`}
        alt={this.props.alt}
        className={this.props.className}
      />
    );
  }
}

export default Image;
