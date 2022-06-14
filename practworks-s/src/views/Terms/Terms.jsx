import StaticPageServices from "api/StaticPageServices";
import Button from "components/common/Button/Button";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

function Terms(props) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    StaticPageServices.staticpage({
      user_type: "evaluator",
      type: "terms",
    }).then((res) => {
      setContent(res.data.data.content);
    });
  }, []);

  return (
    <div className="pa-30">
      <div className="Monts-Bold fs-24 dark-blue">Terms & Conditions</div>
      <div
        className="Monts-Medium fs-16 light-blue pt-20 pb-50"
        dangerouslySetInnerHTML={{ __html: content }}
      />
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
export default withRouter(Terms);
