import {
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useContext, useEffect, useState } from "react";
import { List, Datagrid, TextField } from "react-admin";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserDataContext";
import { UserRoleTypes } from "../types/UserRoleTypes";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { RouteDefinitons } from "../Utils/RouteDefinitions";

export const VolunteerList = (props: any) => {
  const { user } = useContext(UserContext);
  const { bmeId }: any = useParams();
  const [bmes, setBmes] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [volunteers, setVolunteers] = useState<{
    items: {
      type: "jdr1:user:association";
      _id: string;
      association: {
        bme: {
          type: "jdr1:bme";
          _id: string;
        };
        user: {
          type: "jdr1:user";
          _id: string;
          role: "jdr1:volunteer";
          first_name: string;
          last_name: string;
          email: string;
        };
      };
    }[];
    page: number;
    total_items: number;
    total_pages: number;
  } | null>(null);
  const history = useHistory();
  useEffect(() => {
    if (
      user &&
      user.result.roles.some((el) => el.type === UserRoleTypes.BME_EDITOR)
    ) {
      AxiosInstance.post("", {
        jsonrpc: "2.0+hl",
        id: 1,
        method: `hladmin1:user:association:list`,
        params: {},
        auth: {
          type: "gcloud_firebase",
          id_token: localStorage.getItem("firebaseToken") || "",
        },
      }).then((res) => {
        if (res.data.error) {
          toast("Something went wrong...", {
            autoClose: 4000,
          });
        } else {
          setBmes(res.data.result);
        }
      });
    }
    if (bmeId) {
      const tokenId = localStorage.getItem("firebaseToken");
      console.log({ bmeId });
      AxiosInstance.post("", {
        jsonrpc: "2.0+hl",
        id: 1,
        method: `jdr1:bme:volunteer:association:list`,
        params: {
          bme_id: bmeId,
          page: page,
        },
        auth: {
          type: "gcloud_firebase",
          id_token: tokenId || "",
        },
      }).then((res) => {
        if (res.data.error) {
          toast("Something went wrong...", {
            autoClose: 4000,
          });
        } else {
          setVolunteers(res.data.result);
        }
        console.log(res.data.result);
      });
    }
  }, [bmeId]);
  return (
    <div style={{ padding: 50 }}>
      <div className='input-container'>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>SELECT BME</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={bmeId}
            label='BMEs'
            onChange={(e) =>
              history.push(
                RouteDefinitons.ROUTE_USER_ASSOCIATIONS + "/" + e.target.value
              )
            }
          >
            {bmes.map((el: any) => (
              <MenuItem
                value={el.association.bme._id}
                key={el.association.bme._id}
                onClick={() =>
                  history.push(
                    RouteDefinitons.ROUTE_USER_ASSOCIATIONS +
                      "/" +
                      el.association.bme._id
                  )
                }
              >
                {el.association.bme.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant='contained'
          color='primary'
          className='invite-btn'
          disabled={!bmeId}
        >
          Invite
        </Button>
      </div>
      {bmeId && (
        <>
          <Typography variant='h4' style={{ marginBottom: 20, marginTop: 30 }}>
            Volunteers{" "}
          </Typography>
          {volunteers &&
            volunteers.items.map((el) => (
              <Card key={el._id} style={{ marginTop: 10 }}>
                <CardContent>
                  <Typography variant='h6'>
                    {el.association.user.email}
                  </Typography>
                  <Typography variant='body1'>
                    {el.association.user.first_name || "-"}{" "}
                    {el.association.user.last_name || "-"}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          <Pagination
            page={page}
            onChange={(event, value) => {
              setPage(value);
            }}
            count={volunteers?.total_pages}
            variant='outlined'
            shape='rounded'
            style={{ marginTop: 20 }}
          />
        </>
      )}
    </div>
  );
};

//    filters={[<TextInput source='q' label='Search' alwaysOn />]}
