import Button from "components/common/Button/Button";
import React, { useEffect } from "react";
import { withRouter } from "react-router";

function ContactUs(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pa-30">
      <div className="Monts-Bold fs-24 dark-blue">Contact Us</div>
      <div className="Monts-Medium fs-16 light-blue pt-20 pb-50">
        Contact number : 9611123758 <br /> Operating Address : Villa 550 Adarsh
        Palm Retreat, Devarabisanahalli, Bangalore, 560103.
      </div>
      <div className="text-center pt-40">
        <Button
          text="Back"
          width={200}
          onClick={() => {
            props.history.goBack();
          }}
        />
      </div>
    </div>
  );
}
export default withRouter(ContactUs);
