import React from "react";
import { useMediaQuery } from "react-responsive";

export default function Footer(props) {
  const MobileL = useMediaQuery({ query: "(max-width: 426px)" });
  let { width } = props;
  return (
    <div
      style={
        MobileL
          ? {
              background: "#658bb1",
              position: "fixed",
              bottom: "0",
              width: `${width}%`,
              // display: "flex",
              // justifyContent: "space-between",
              padding: "10px",
              textAlign: "center",
            }
          : {
              background: "#658bb1",
              position: "fixed",
              bottom: "0",
              width: `${width}%`,
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 20px",
            }
      }
    >
      <div className="Monts-Medium fs-12" style={{ color: "white" }}>
        Copyright © 2021Practworks. All rights reserved.
      </div>
      <div>
        <a
          href="/help"
          className="Monts-Medium fs-12"
          style={{ color: "white" }}
        >
          Help
        </a>
        &nbsp; &nbsp;
        <a
          href="/faq"
          className="Monts-Medium fs-12"
          style={{ color: "white" }}
        >
          FAQ
        </a>
        &nbsp; &nbsp;
        <a
          href="/terms"
          className="Monts-Medium fs-12"
          style={{ color: "white" }}
        >
          Terms & Conditions
        </a>
        &nbsp; &nbsp;
        <a
          href="/privacy-policy"
          className="Monts-Medium fs-12"
          style={{ color: "white" }}
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
}
