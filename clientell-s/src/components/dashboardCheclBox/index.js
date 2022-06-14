import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretDown,
    faCaretUp,
    faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Reactloading from "react-loading";
// import { useSelector } from "react-redux";

import "./index.less";
import { usersUpdate } from "../../redux/dashboardDropDownManage";

export const DashboardCheckedDropDown = ({ data, name, checkboxFunction }) => {
    const { title, items, defaultSelected } = data;
    const [currentOption, setCurrentOption] = useState(defaultSelected);
    const dispatch = useDispatch();
    const usersProcessList = useSelector(
        (state) => state.dashboarddropdownmanage.value
    );
    // useEffect(() => {
    //     for (let i = 0; i < usersProcessList.length; i++) {
    //         document.getElementById('usercheck' + usersProcessList[i]).defaultChecked = true;
    //     }
    //     console.log(usersProcessList)
    // }, [usersProcessList])
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="checkeddropdown">
            <div
                className="doubleheader"
                onClick={() => {
                    setIsOpen((state) => !state);
                }}
            >
                <div className="dropdownelement">
                    <p className="droptitle">
                        <span className="title">{title}</span>{" "}
                    </p>
                </div>
                &nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} />
            </div>
            {isOpen ? (
                <div
                    className="dropdownclosearea"
                    onClick={() => {
                        setIsOpen((state) => !state);
                    }}
                ></div>
            ) : null}
            <div className="dropdownareadiv">
                {isOpen ? (
                    <div className="dropdownarea">
                        <div
                            className="optioncloserdiv"
                            onClick={() => {
                                setIsOpen((state) => !state);
                            }}
                        ></div>
                        {items.map((item, index) => {
                            return (
                                <DropDownSingleOptions
                                    item={item}
                                    index={index}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

const DropDownSingleOptions = ({ item, index }) => {
    const [mouseEnterState, setMouseEnterState] = useState(false);
    const dispatch = useDispatch();
    const usersProcessList = useSelector(
        (state) => state.dashboarddropdownmanage.value
    );
    return (
        <div
            className="optiondiv"
            key={index}
            onMouseEnter={(e) => {
                e.preventDefault();
                setMouseEnterState(true);
            }}
            onMouseLeave={(e) => {
                e.preventDefault();
                setMouseEnterState(false);
            }}
        // onClick={() => {
        //     setIsOpen((state) => !state);
        // }}
        >
            <div className="checknames">
                <input
                    type="checkbox"
                    name=""
                    id={"usercheck" + item.id}
                    defaultChecked={
                        usersProcessList.includes(item.id) ? true : false
                    }
                    onChange={(e) => {
                        console.log(e.target.checked);
                        if (e.target.checked === false) {
                            let proxyArray = usersProcessList.filter((ele) => {
                                return ele !== item.id;
                            });
                            dispatch(usersUpdate(proxyArray));
                            let finalList = [];
                            let stackList = [item.id];
                            let unstackedList = [];
                            const stackerTree = async () => {
                                let returnedData = await axios.get(
                                    `/api/getUsers?manager=${stackList[0]}`
                                );
                                if (returnedData.data.length > 0) {
                                    for (
                                        let i = 0;
                                        i < returnedData.data.length;
                                        i++
                                    ) {
                                        if (
                                            returnedData.data[i]
                                                .has_subordinates
                                        ) {
                                            stackList.push(
                                                returnedData.data[i].id
                                            );
                                        } else {
                                            unstackedList.push(
                                                returnedData.data[i].id
                                            );
                                        }
                                    }
                                    finalList.push(stackList[0]);
                                    stackList.shift();
                                    console.log("StackList");
                                    console.log(finalList);
                                    console.log("unstackedlist");
                                    console.log(unstackedList);
                                    if (stackList.length > 0) {
                                        stackerTree();
                                    } else {
                                        setMouseEnterState(false);
                                        finalList.push(...unstackedList);
                                        let proxyArray = usersProcessList.filter(
                                            (ele) => {
                                                if (!finalList.includes(ele)) {
                                                    return ele
                                                }
                                            }
                                        );
                                        dispatch(usersUpdate(proxyArray));
                                        setMouseEnterState(true);
                                    }
                                }
                            };
                            stackerTree();
                        } else {
                            let proxyArray = [...usersProcessList, item.id];
                            dispatch(usersUpdate(proxyArray));
                            let finalList = [];
                            let stackList = [item.id];
                            let unstackedList = [];
                            const stackerTree = async () => {
                                let returnedData = await axios.get(
                                    `/api/getUsers?manager=${stackList[0]}`
                                );
                                // console.log(returnedData.data.length);
                                if (returnedData.data.length > 0) {
                                    for (
                                        let i = 0;
                                        i < returnedData.data.length;
                                        i++
                                    ) {
                                        if (
                                            returnedData.data[i]
                                                .has_subordinates
                                        ) {
                                            stackList.push(
                                                returnedData.data[i].id
                                            );
                                        } else {
                                            unstackedList.push(
                                                returnedData.data[i].id
                                            );
                                        }
                                    }
                                    finalList.push(stackList[0]);
                                    stackList.shift();
                                    console.log("StackList");
                                    console.log(finalList);
                                    console.log("unstackedlist");
                                    console.log(unstackedList);
                                    if (stackList.length > 0) {
                                        stackerTree();
                                    } else {
                                        setMouseEnterState(false);
                                        finalList.push(...unstackedList);
                                        let proxyArray = [...usersProcessList, ...finalList];
                                        // usersProcessList.push(...finalList);
                                        dispatch(usersUpdate(proxyArray));
                                        setMouseEnterState(true);
                                    }
                                }
                            };
                            stackerTree();
                        }
                    }}
                />
                &nbsp;&nbsp;
                <p>{item.first_name + " " + item.last_name}</p>
            </div>
            &nbsp;&nbsp;
            {item.has_subordinates ? (
                <FontAwesomeIcon icon={faCaretRight} />
            ) : null}
            <div className="subdropdowndivEle">
                {mouseEnterState ? (
                    <SubDropDown
                        id={item.id}
                        subOrdinateState={item.has_subordinates}
                    />
                ) : null}
            </div>
        </div>
    );
};

const SubDropDown = ({ id, name, subOrdinateState }) => {
    const loginAuth = useSelector((state) => state.auth.token);

    const [subCheckboxState, setSubCheckboxState] = useState(null);
    const [checkUserList, setCheckUserList] = useState([]);
    // console.log(id);
    useEffect(() => {
        axios
            .get(`/api/getUsers?manager=${id}`, {
                headers: {
                    Authorization: `Token ${loginAuth}`,
                },
            })
            .then((res) => {
                // console.log(res.data);
                setCheckUserList(res.data);
            });
    }, []);
    return subOrdinateState ? (
        checkUserList.length === 0 ? (
            <Reactloading
                width={15}
                height={15}
                color="#101012"
                type="spinningBubbles"
            />
        ) : (
            <div className="subdropdown">
                {checkUserList.map((item, index) => {
                    return (
                        <SubDropDownLevel
                            item={item}
                            index={index}
                            id={item.id}
                            key={index}
                        />
                    );
                })}
            </div>
        )
    ) : null;
};

const SubDropDownLevel = ({ item, index, id }) => {
    const [subCheckboxState, setSubCheckBoxState] = useState(false);
    const usersProcessList = useSelector(
        (state) => state.dashboarddropdownmanage.value
    );
    const dispatch = useDispatch();
    return (
        <div
            className="subdropdownCustomCheckboxDiv"
            key={index}
            onMouseEnter={(e) => {
                e.preventDefault();
                setSubCheckBoxState(true);
            }}
            onMouseLeave={(e) => {
                e.preventDefault();
                setSubCheckBoxState(false);
            }}
        >
            <div
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
                        id={"usercheck" + item.id}
                        defaultChecked={
                            usersProcessList.includes(item.id) ? true : false
                        }
                        onChange={(e) => {
                            // console.log(e.target.checked);
                            if (e.target.checked === false) {
                                let proxyArray = usersProcessList.filter(
                                    (ele) => {
                                        return ele !== item.id;
                                    }
                                );
                                dispatch(usersUpdate(proxyArray));
                                let finalList = [];
                                let stackList = [item.id];
                                let unstackedList = [];
                                const stackerTree = async () => {
                                    let returnedData = await axios.get(
                                        `/api/getUsers?manager=${stackList[0]}`
                                    );
                                    if (returnedData.data.length > 0) {
                                        for (
                                            let i = 0;
                                            i < returnedData.data.length;
                                            i++
                                        ) {
                                            if (
                                                returnedData.data[i]
                                                    .has_subordinates
                                            ) {
                                                stackList.push(
                                                    returnedData.data[i].id
                                                );
                                            } else {
                                                unstackedList.push(
                                                    returnedData.data[i].id
                                                );
                                            }
                                        }
                                        finalList.push(stackList[0]);
                                        stackList.shift();
                                        console.log("StackList");
                                        console.log(finalList);
                                        console.log("unstackedlist");
                                        console.log(unstackedList);
                                        if (stackList.length > 0) {
                                            stackerTree();
                                        } else {
                                            setSubCheckBoxState(false);
                                            finalList.push(...unstackedList);
                                            let proxyArray = usersProcessList.filter(
                                                (ele) => {
                                                    if (!finalList.includes(ele)) {
                                                        return ele
                                                    }
                                                }
                                            );
                                            dispatch(usersUpdate(proxyArray));
                                            setSubCheckBoxState(true);
                                        }
                                    }
                                };
                                stackerTree();
                            } else {
                                let proxyArray = [...usersProcessList, item.id];
                                dispatch(usersUpdate(proxyArray));
                                let finalList = [];
                                let stackList = [item.id];
                                let unstackedList = [];
                                const stackerTree = async () => {
                                    let returnedData = await axios.get(
                                        `/api/getUsers?manager=${stackList[0]}`
                                    );
                                    // console.log(returnedData.data.length);
                                    if (returnedData.data.length > 0) {
                                        for (
                                            let i = 0;
                                            i < returnedData.data.length;
                                            i++
                                        ) {
                                            if (
                                                returnedData.data[i]
                                                    .has_subordinates
                                            ) {
                                                stackList.push(
                                                    returnedData.data[i].id
                                                );
                                            } else {
                                                unstackedList.push(
                                                    returnedData.data[i].id
                                                );
                                            }
                                        }
                                        finalList.push(stackList[0]);
                                        stackList.shift();
                                        console.log("StackList");
                                        console.log(finalList);
                                        console.log("unstackedlist");
                                        console.log(unstackedList);
                                        if (stackList.length > 0) {
                                            stackerTree();
                                        } else {
                                            setSubCheckBoxState(false);
                                            finalList.push(...unstackedList);
                                            let proxyArray = [...usersProcessList, ...finalList];
                                            // usersProcessList.push(...finalList);
                                            dispatch(usersUpdate(proxyArray));
                                            setSubCheckBoxState(true);
                                        }
                                    }
                                };
                                stackerTree();
                                // console.log(stackList, unstackedList);
                            }
                        }}
                    // defaultChecked={true}
                    />
                    &nbsp;
                    <label
                        htmlFor={"usercheck" + item.id}
                        onClick={() => {
                            // setSubCheckboxState(index);
                        }}
                    >
                        &nbsp;
                        {item.first_name + " " + item.last_name}
                    </label>{" "}
                </div>
                &nbsp;&nbsp;&nbsp;
                {item.has_subordinates ? (
                    <FontAwesomeIcon icon={faCaretRight} />
                ) : null}
            </div>
            {subCheckboxState && id !== null ? (
                <div className="subdropdowndiv1">
                    {" "}
                    <SubDropDown
                        id={id}
                        subOrdinateState={item.has_subordinates}
                    />
                </div>
            ) : null}
        </div>
    );
};
