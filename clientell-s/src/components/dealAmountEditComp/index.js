import React, { useState } from "react";
import Mousetrap from "mousetrap";
import "./index.less";
export const DealAmountEditComponent = ({ dealvalue }) => {
    const [editState, setEditState] = useState(false);
    const [currentValue, setCurrentValue] = useState(dealvalue);
    Mousetrap.bind("enter", () => {
        setEditState(false);
        console.log("enter");
    });
    return (
        <div className="dealamounteditcomponent">
            {!editState ? (
                <p
                    className="preeditamount"
                    onClick={() => {
                        setEditState((state) => !state);
                    }}
                >
                    ${currentValue.toLocaleString()}
                </p>
            ) : (
                <>
                    <p
                        className="dollarlogo"
                        onClick={() => {
                            setEditState(false);
                        }}
                    >
                        $
                    </p>
                    <input
                        className="dealamountvalue"
                        onChange={(e) => {
                            setCurrentValue(e.target.value);
                        }}
                        defaultValue={currentValue}
                    />
                </>
            )}
        </div>
    );
};
