import React, { useState } from "react";
import Button from "../../components/common/Button/Button";
import { useSelector } from "react-redux";
import StudentServices from "api/StudentServices";
import { message } from "antd";
import { useDispatch } from "react-redux";
import AuthActions from "redux/auth/actions";
import AuthServices from "api/AuthServices";
const { userData } = AuthActions;

export default function ModifySubscription(props) {
  const [loading, setloading] = useState(false);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const unsubscribeHandler = () => {
    setloading(true);
    StudentServices.unsubscribe().then((res) => {
      if (res.data.status === 0) {
        message.error(res.data.message);
        setloading(false);
        props.onClick();
      } else {
        message.success(res.data.message);
        setTimeout(() => {
          AuthServices.view().then((res) => {
            dispatch(
              userData({
                firstName: res.data.data.first_name,
                lastName: res.data.data.last_name,
                image: res.data.data.profile_photo,
                data: res.data.data,
              })
            );
          });
          setloading(false);
          props.onClick();
        }, 4000);
      }
    });
  };

  return (
    <div className="text-left">
      {user.user_data.subscription_status === "active" ? (
        <>
          <div className="Monts-Medium light-blue fs-16 ptb-10">
            Subscription Id : {user.user_data.subscription_id}
          </div>
          <div className="Monts-Medium light-blue fs-16 ptb-10">
            Plan Id : {user.user_data.plan_id}
          </div>
          <div className="Monts-Medium light-blue fs-16 ptb-10">
            Subscription Status : Active
          </div>
          <div className="pt-10">
            <Button
              text="Cancel Subscription"
              loading={loading}
              onClick={() => {
                unsubscribeHandler();
              }}
              width={300}
            ></Button>
          </div>
        </>
      ) : (
        <div className="Monts-Medium light-blue fs-16 ptb-10 text-center">
          No Plan purchased !
        </div>
      )}
    </div>
  );
}
