import { useContext, useEffect, useState } from "react";
import {
  CreateButton,
  EditButton,
  Loading,
  ShowButton,
  TextField,
  useQuery,
} from "react-admin";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserDataContext";
import { DataProviderTypes } from "../types/DataProviderTypes";
import { UserRoleTypes } from "../types/UserRoleTypes";
import { AxiosInstance } from "../Utils/AxiosInstance";
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Box,
  Button,
} from "@material-ui/core";
import { RouteDefinitons } from "../Utils/RouteDefinitions";
import CustomDatagrid from "../Components/CustomDataGrid";

const convertKeyToIndice = (data: any) => {
  let ids = [];
  const dataKey: any = [];

  if (data) {
    ids = data.map((elemento: any) => {
      dataKey[elemento.id] = elemento;
      return elemento.id;
    });
    return { ids, dataKey };
  }
  return {};
};

const TripList = (props: { bmeId: string }) => {
  const [newPage, setNewPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, loading, error, total } = useQuery({
    type: "getList",
    resource: DataProviderTypes.TRIP,
    payload: {
      filter: {
        bme_id: props.bmeId,
      },
    },
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  console.log({ data });
  return (
    <div>
      <Box display='flex' justifyContent={"end"} marginTop={"20px"}>
        <CreateButton
          basePath={RouteDefinitons.ROUTE_TRIPS + "/" + props.bmeId}
        />{" "}
      </Box>
      <CustomDatagrid
        dataGridValues={{
          ...convertKeyToIndice(data),
          total: total,
          rowsPerPage,
          setRowsPerPage,
          newPage,
          setNewPage,
        }}
      >
        <TextField source='title' label={"Title"} />
        <TextField source='status' label={"Status"} />
        <EditButton
          basePath={RouteDefinitons.ROUTE_TRIPS + "/" + props.bmeId}
          label='Edit'
        />
        <ShowButton
          basePath={RouteDefinitons.ROUTE_TRIPS + "/" + props.bmeId}
          label='View'
        />
      </CustomDatagrid>
    </div>
  );
};

export const TripPage = () => {
  const { user } = useContext(UserContext);
  const { bmeId }: any = useParams();
  const [bmes, setBmes] = useState<any>([]);
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
  }, [user]);
  return (
    <div>
      {" "}
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>SELECT BME</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={bmeId}
          label='BMEs'
          onChange={(e) =>
            history.push(RouteDefinitons.ROUTE_TRIPS + "/" + e.target.value)
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
      {bmeId && <TripList bmeId={bmeId} />}
    </div>
  );
};
