import React, { useState, useEffect } from "react";
import { Select } from "antd";
import PageWrapper from "./CreateUnit.style";
import Button from "../../components/common/Button/Button";

function CreateUnit() {
  const { Option } = Select;
  const [params, setParams] = useState({
    stream: "",
    subject: "",
    topic: "",
    concept: "",
    questions: 0,
  });
  const filter = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const filterSort = (optionA, optionB) => {
    return optionA.children
      .toLowerCase()
      .localeCompare(optionB.children.toLowerCase());
  };
  useEffect(() => {
    console.log(params);
  }, [params]);
  return (
    <PageWrapper>
      <div className="Monts-Bold fs-20 dark-blue mb-20">Create Unit</div>
      <div className="inputs-wrapper">
        <div className="option-wrapper">
          <p>Stream</p>
          <Select
            showSearch
            size="large"
            style={{ width: 400 }}
            placeholder="Select Stream"
            optionFilterProp="children"
            filterOption={(input, option) => {
              filter(input, option);
            }}
            filterSort={(optionA, optionB) => {
              filterSort(optionA, optionB);
            }}
            onChange={(value) => {
              const obj = {
                ...params,
                stream: value,
              };
              setParams(obj);
            }}
          >
            <Option value="hello">Hello</Option>
          </Select>
        </div>
        <div className="option-wrapper">
          <p>Subject</p>
          <Select
            showSearch
            size="large"
            style={{ width: 400 }}
            placeholder="Select Subject"
            optionFilterProp="children"
            filterOption={(input, option) => {
              filter(input, option);
            }}
            filterSort={(optionA, optionB) => {
              filterSort(optionA, optionB);
            }}
            onChange={(value) => {
              const obj = {
                ...params,
                subject: value,
              };
              setParams(obj);
            }}
          >
            <Option value="hello">Hello</Option>
          </Select>
        </div>
        <div className="option-wrapper">
          <p>Topic</p>
          <Select
            showSearch
            size="large"
            style={{ width: 400 }}
            placeholder="Select Subject"
            optionFilterProp="children"
            filterOption={(input, option) => {
              filter(input, option);
            }}
            filterSort={(optionA, optionB) => {
              filterSort(optionA, optionB);
            }}
            onChange={(value) => {
              const obj = {
                ...params,
                topic: value,
              };
              setParams(obj);
            }}
          >
            <Option value="hello">Hello</Option>
          </Select>
        </div>
        <div className="option-wrapper">
          <p>Concept</p>
          <Select
            showSearch
            size="large"
            style={{ width: 400 }}
            placeholder="Select Subject"
            optionFilterProp="children"
            filterOption={(input, option) => {
              filter(input, option);
            }}
            filterSort={(optionA, optionB) => {
              filterSort(optionA, optionB);
            }}
            onChange={(value) => {
              const obj = {
                ...params,
                concept: value,
              };
              setParams(obj);
            }}
          >
            <Option value="hello">Hello</Option>
          </Select>
        </div>
        <div className="option-wrapper">
          <p>Number of Questions</p>
          <Select
            showSearch
            size="large"
            style={{ width: 400 }}
            placeholder="Select Subject"
            optionFilterProp="children"
            filterOption={(input, option) => {
              filter(input, option);
            }}
            filterSort={(optionA, optionB) => {
              filterSort(optionA, optionB);
            }}
            onChange={(value) => {
              const obj = {
                ...params,
                questions: value,
              };
              setParams(obj);
            }}
          >
            <Option value="hello">Hello</Option>
          </Select>
        </div>
      </div>
      <div
        className="flex-x center mt-20"
        style={{ columnGap: "1rem", margin: "0 auto" }}
      >
        <Button text="Select" width="300" className="cancel-btn"></Button>
        <Button text="Submit" width="300" className="submit-btn"></Button>
      </div>
    </PageWrapper>
  );
}

export default CreateUnit;
