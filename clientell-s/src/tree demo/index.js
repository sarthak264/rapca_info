import React, { useState, createContext, useContext } from "react";
import "./index.less";

export const TreeDemo = () => {
    const [currentPage, setCurrentPage] = useState(compStates.welcomealert);
    const [headernmembers, setHeadernmembers] = useState([]);
    const [currentMemberState, setCurrentMemeberState] = useState(false);
    return (
        <div className="treedemo">
            <PageContext.Provider value={{ currentPage, setCurrentPage }}>
                <NewMemberFormState.Provider
                    value={{
                        currentMemberState,
                        setCurrentMemeberState,
                    }}
                >
                    <MemberBranches.Provider
                        value={{
                            headernmembers,
                            setHeadernmembers,
                        }}
                    >
                        {currentMemberState ? compStates.createnewlevel : null}
                        {currentPage}
                    </MemberBranches.Provider>
                    {/*currentPage*/}
                </NewMemberFormState.Provider>
            </PageContext.Provider>
        </div>
    );
};

export const WelcomeAlert = () => {
    // const { activeComp } = useContext(PageContext);
    const { setCurrentPage } = useContext(PageContext);
    // console.log(activeComp);
    return (
        <div className="welcomealert">
            <div className="header">Hey there!</div>
            <p>
                This is the place to setup your Organization structure and send
                invites to colleagues in form of invites.
            </p>
            <p>
                Each Organization structure is divided into levels like VP, CXO,
                Managers, etc. Each of these levels have their own members.
                Members across a level share similar dashboards and have access
                to the same kind of data.
            </p>
            <div>
                <p>
                    Let’s start by creating the first level. The best practice
                    is to create the top most level of CXO first.
                </p>
            </div>
            <div className="buttonsection">
                <button
                    onClick={() => {
                        setCurrentPage(compStates.createnewlevel);
                    }}
                >
                    Create a New Level
                </button>
            </div>
        </div>
    );
};

export const CreateNewLevel = () => {
    const { headernmembers, setHeadernmembers } = useContext(MemberBranches);
    const { setCurrentPage } = useContext(PageContext);
    const { currentMemberState, setCurrentMemeberState } =
        useContext(NewMemberFormState);
    return (
        <div className="createnewlevel">
            <div className="newlevelheader">Create a new level</div>
            <div className="lebelname">
                <label htmlFor="levname">Level Name</label>
                &nbsp;
                <input type="text" className="levelinput" id="levname" />
            </div>
            <div className="reportsto">
                <label htmlFor="reportname">Reports to</label>
                &nbsp;
                <input
                    type="text"
                    className="reportinput"
                    id="reportname"
                    disabled={headernmembers.length === 0 ? true : false}
                />
            </div>
            <div className="reporttobutton">
                <button
                    onClick={() => {
                        setHeadernmembers((currentData) => [
                            ...currentData,
                            {
                                membername:
                                    document.getElementById("levname").value,
                                submembers: [],
                            },
                        ]);
                        console.log(headernmembers);
                        if (currentMemberState === false) {
                            setCurrentPage(compStates.memberstructure);
                        } else {
                            setCurrentMemeberState((state) => !state);
                        }
                    }}
                >
                    Create a new level
                </button>
            </div>
        </div>
    );
};

export const MemberStructure = () => {
    const { headernmembers } = useContext(MemberBranches);
    const { setCurrentMemeberState } = useContext(NewMemberFormState);
    return (
        <div className="memberstructure">
            <div className="memberrender">
                {headernmembers.map((dataset) => {
                    return (
                        <div className="indimember">
                            <div className="newmember">
                                <div
                                    className="memberplus"
                                    onClick={() => {
                                        setCurrentMemeberState(
                                            (state) => !state
                                        );
                                        console.log("the data is being logged");
                                    }}
                                >
                                    +
                                </div>
                                <div className="level">
                                    {dataset.membername}
                                </div>
                                <div className="options">...</div>
                                <div
                                    className="memberplus"
                                    onClick={() => {
                                        setCurrentMemeberState(
                                            (state) => !state
                                        );
                                        console.log("the data is being logged");
                                    }}
                                >
                                    +
                                </div>
                            </div>
                            <div className="membersdisplay">
                                <div className="addnewmem">
                                    <button>Add a member</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const SubMembers = () => {
    return <div>This member will be added soon</div>;
};

const compStates = {
    welcomealert: <WelcomeAlert />,
    createnewlevel: <CreateNewLevel />,
    memberstructure: <MemberStructure />,
};

const PageContext = createContext({
    currentPage: compStates.welcomealert,
    setCurrentPage: (pageData) => {},
});

const MemberBranches = createContext({
    headernmembers: [],
    setHeadernmembers: (newmember) => {},
});

const NewMemberFormState = createContext({
    currentMemberState: false,
    setCurrentMemeberState: (addnewmember) => {},
});
