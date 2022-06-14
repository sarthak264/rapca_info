import React, { useEffect, useState } from "react";
import "./Faq.css";
import { Collapse } from "antd";
import StaticPageServices from "api/StaticPageServices";

const { Panel } = Collapse;

export default function FaqPage(props) {
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    StaticPageServices.faq().then((res) => {
      setFaq(res.data.data);
    });
  }, []);

  return (
    <div>
      <div className="Monts-Bold fs-24 dark-blue">FAQ</div>
      <div className="Monts-Medium fs-16 light-blue pt-20 pb-50">
        <Collapse defaultActiveKey={["0"]} accordion>
          {faq.map((res, i) => {
            return (
              <Panel header={res.question} key={i}>
                <p>{res.answer}</p>
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
}
