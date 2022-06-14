import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import StaticPageServices from "api/StaticPageServices";
import Button from "components/common/Button/Button";

function PrivacyPolicy(props) {
  const [content, setContent] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);

    StaticPageServices.staticpage({
      user_type: "evaluator",
      type: "privacy",
    }).then((res) => {
      setContent(res.data.data.content);
    });
  }, []);

  return (
    <div>
      <div className="Monts-Bold fs-24 dark-blue">Privacy Policy</div>
      <div
        className="Monts-Medium fs-16 light-blue pt-20 pb-50"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="text-center">
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

export default withRouter(PrivacyPolicy);
