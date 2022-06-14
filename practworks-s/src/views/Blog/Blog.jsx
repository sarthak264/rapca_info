import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import StaticPageServices from "api/StaticPageServices";
import Button from "components/common/Button/Button";

function Blog(props) {
  const [content, setContent] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);

    StaticPageServices.staticpage({
      user_type: "evaluator",
      type: "blog",
    }).then((res) => {
      setContent(res.data.data.content);
    });
  }, []);

  return (
    <div className="pa-30">
      <div className="Monts-Bold fs-24 dark-blue">Blogs</div>
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

export default withRouter(Blog);
