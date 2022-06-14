import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretUp,
    faCaretDown,
    faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "./datepickerCss/datepicker.css";

import "./index.less";
export const DropDownCustom = ({ data }) => {
    // const [optionState, setOptionState] = useState(true);
    // const [defaultOption, setDefaultOptions] = useState(0);
    // const { title, options, date, dropDownCheckBox } = data;

    //test code
    const { title, options, DropDownCheckBoxComp } = data;
    console.log(options);
    return <div>Mello</div>;

    // return (
    //     <div className="dropdowncustom">
    //         {optionState ? (
    //             <div
    //                 className="droptitlediv"
    //                 onClick={() => {
    //                     setOptionState((state) => !state);
    //                 }}
    //             >
    //                 {title}:&nbsp;
    //                 <span className="optionhighlight">
    //                     {options[defaultOption]}
    //                 </span>{" "}
    //                 &nbsp;{" "}
    //                 <span>
    //                     <FontAwesomeIcon icon={faCaretDown} />
    //                 </span>
    //             </div>
    //         ) : dropDownCheckBox ? (
    //             <DropDownCheckBoxComp data={data} />
    //         ) : (
    //             <div className="dropdowndiv">
    //                 <div
    //                     className="dropdownheader"
    //                     onClick={() => {
    //                         setOptionState((state) => !state);
    //                     }}
    //                 >
    //                     <p>{title}:</p>
    //                     &nbsp;
    //                     <span className="optionhighlight">
    //                         {options[defaultOption]}
    //                     </span>
    //                     &nbsp; &nbsp;
    //                     <FontAwesomeIcon icon={faCaretUp} />
    //                 </div>
    //                 <hr className="dropdownhr" />
    //                 <div className="dropdownoptions">
    //                     {options.map((item, index) => {
    //                         return (
    //                             <p
    //                                 className="indioptionsp"
    //                                 onClick={() => {
    //                                     setOptionState((state) => !state);
    //                                     setDefaultOptions(index);
    //                                 }}
    //                                 key={index}
    //                             >
    //                                 {item}
    //                             </p>
    //                         );
    //                     })}
    //                     {date ? <CustomDatePicker /> : null}
    //                 </div>
    //             </div>
    //         )}
    //     </div>
    // );
};

export const CustomDatePicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    // return (
    //     <div className="customdatepicker">
    //         <p className="datepickerdropdown">
    //             Custom <FontAwesomeIcon icon={faCaretRight} />
    //         </p>
    //         <div className="datepickerdiv">
    //             <div className="customdivdatepick">
    //                 <DatePicker
    //                     className="datepicker"
    //                     selected={startDate}
    //                     onChange={(date) => setStartDate(date)}
    //                 />
    //                 <p>to</p>
    //                 <DatePicker
    //                     className="datepicker"
    //                     selected={startDate}
    //                     onChange={(date) => setStartDate(date)}
    //                 />
    //                 &nbsp; &nbsp; &nbsp;
    //                 <button>Ok</button>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export const DropDownCheckBoxComp = ({ data }) => {
    const { title, options } = data;
    const [defaultOption, setDefaultOptions] = useState(0);
    const [subCheckboxState, setSubCheckboxState] = useState(null);
    // return (
    //     <div className="dropdowndiv">
    //         <div
    //             className="dropdownheader"
    //         // onClick={() => {
    //         //     setOptionState((state) => !state);
    //         // }}
    //         >
    //             <p>{title}:</p>
    //             &nbsp;
    //             <span className="optionhighlight">
    //                 {options[defaultOption]}
    //             </span>
    //             &nbsp; &nbsp;
    //             <FontAwesomeIcon icon={faCaretUp} />
    //         </div>
    //         <hr className="dropdownhr" />
    //         <div className="dropdownoptionsCustomCheckbox">
    //             {options.map((item, index) => {
    //                 return (
    //                     <div className="dropdownoptionsCustomCheckboxDiv">
    //                         <p
    //                             className="indioptionsp"
    //                             // onClick={() => {
    //                             //     setOptionState((state) => !state);
    //                             //     setDefaultOptions(index);
    //                             // }}
    //                             key={index}
    //                         >
    //                             <div className="inidioptioncheckboxdiv">
    //                                 <input
    //                                     type="checkbox"
    //                                     name=""
    //                                     id={"indicheckbox" + index}
    //                                 />
    //                                 <label
    //                                     htmlFor={"indicheckbox" + index}
    //                                     onClick={() => {
    //                                         setSubCheckboxState(index);
    //                                     }}
    //                                 >
    //                                     &nbsp;
    //                                     {item}
    //                                 </label>{" "}
    //                             </div>
    //                             &nbsp;
    //                             {index === 0 ? null : (
    //                                 <FontAwesomeIcon icon={faCaretRight} />
    //                             )}
    //                         </p>
    //                         {index === subCheckboxState && index !== 0 ? (
    //                             <div className="subdropdowndiv">
    //                                 <SubDropDown id={1} name={item} />
    //                             </div>
    //                         ) : null}
    //                     </div>
    //                 );
    //             })}
    //         </div>
    //     </div>
    // );
};

const SubDropDown = ({ id, name }) => {
    const options = ["Rep A", "Rep B", "Rep C"];
    const [subCheckboxState, setSubCheckboxState] = useState(null);
    return (
        <div className="subdropdown">
            {options.map((item, index) => {
                return (
                    <div className="subdropdownCustomCheckboxDiv">
                        <p
                            className="indioptionsp"
                            // onClick={() => {
                            //     setOptionState((state) => !state);
                            //     setDefaultOptions(index);
                            // }}
                            key={index}
                        >
                            <div className="inidioptioncheckboxdiv">
                                <input
                                    type="checkbox"
                                    name=""
                                    id={"indicheckbox" + id + index}
                                />
                                <label
                                    htmlFor={"indicheckbox" + id + index}
                                    onClick={() => {
                                        setSubCheckboxState(index);
                                    }}
                                >
                                    &nbsp;
                                    {item}
                                </label>{" "}
                            </div>
                            &nbsp;
                            <FontAwesomeIcon icon={faCaretRight} />
                        </p>
                        {index === subCheckboxState ? (
                            <div className="subdropdowndiv1">
                                {" "}
                                <SubDropDown id={Math.random()} name={item} />
                            </div>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
};
