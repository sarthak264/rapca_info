import { Spin } from "antd";
import React from "react";
import "./Button.css";

export default function Button(props) {
  let { width, text, onClick, id, loading, style, className, onlyDisable } =
    props;
  const fullyDisable = false || onlyDisable;
  return (
    <button
      style={{
        height: "50px",
        width: width ? `${width}px` : "100%",
        border: "none",
        borderRadius: "12px",
        backgroundColor: "#4d6898",
        color: "white",
        fontFamily: "Montserrat-Bold",
        cursor: `${loading ? "not-allowed" : "pointer"}`,
        ...style,
      }}
      className={className}
      id={id}
      onClick={onClick}
      disabled={loading}
    >
      {!fullyDisable && loading ? <Spin size="small" /> : ""}
      {text}
    </button>
  );
}
