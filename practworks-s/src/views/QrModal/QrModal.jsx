import React from "react";
import QRCode from "react-qr-code";
import { RouteDefinitons } from "routes/RouteDefinitions";

function QrModal() {
  return (
    <div className="flex-x center">
      <QRCode value={RouteDefinitons.ROUTE_STUDENT_SUBMIT_ANSWER} size={450} />
    </div>
  );
}

export default QrModal;
