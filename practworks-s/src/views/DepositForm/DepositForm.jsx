import { Input } from "antd";
import Form from "antd/lib/form/Form";
import React from "react";
import Button from "../../components/common/Button/Button";

import DashboardWrapper from "./DepositForm.style";

export default function DepositForm(props) {
  return (
    <DashboardWrapper>
      <div className="ptb-5 light-blue Monts-Medium">
        Amount(Minimum amount should be rs.100)
      </div>
      <Input placeholder="Amount" size="large" />
      <div className="pt-10">
        <Button text="Deposit" onClick={props.onClick}></Button>
      </div>
    </DashboardWrapper>
  );
}
