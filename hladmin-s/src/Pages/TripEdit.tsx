import {
  TextField,
  Button,
  FormControl,
  Paper,
  Card,
  CircularProgress,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Autocomplete } from "@material-ui/lab";
import { useEffect, useState, Fragment } from "react";
import { Loading, useDataProvider } from "react-admin";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DataProviderTypes } from "../types/DataProviderTypes";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { RouteDefinitons } from "../Utils/RouteDefinitions";

export const TripEdit = (props: any) => {
  const { bmeId, tripId }: any = useParams();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<
    {
      type: "jdr1:bme";
      name: string;
      address: string;
      region: {
        type: "jdr1:region";
        _id: string;
        title: string;
        tz: string;
      };
      id: string;
    }[]
  >([]);
  const loading = open && options.length === 0;
  const dataProvider = useDataProvider();
  const [inputValue, setInputValue] = useState("");

  const [clients, setClients] = useState<
    {
      type: string;
      _id: string;
      name: string;
      allocation: {
        total_weight_kg: number;
      };
    }[]
  >([]);
  const [formData, setFormData] = useState({ title: "", date: "" });
  const history = useHistory();
  const [errors, setErrors] = useState<
    {
      _id: string;
      code: string;
    }[]
  >([]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    const toastId = toast("Loading...", { autoClose: false });
    const tokenId = localStorage.getItem("firebaseToken");
    AxiosInstance.post("", {
      jsonrpc: "2.0+hl",
      id: 1,
      method: `jdr1:${DataProviderTypes.TRIP}:get`,
      params: { bme_id: bmeId, trip_id: tripId },
      auth: {
        type: "gcloud_firebase",
        id_token: tokenId || "",
      },
    }).then((res) => {
      console.log(res.data);
      if (res.data.error) {
        toast.update(toastId, {
          render: "Something went wrong...",
          autoClose: 4000,
          type: "error",
        });
      } else {
        setClients(res.data.result.clients);
        setFormData({
          title: res.data.result.title,
          date: res.data.result.date.split("T")[0],
        });
        toast.update(toastId, {
          autoClose: 1,
          type: "success",
        });
      }
    });
  }, []);
  console.log({ formData });
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const { data }: { data: any } = await dataProvider.getList(
        DataProviderTypes.BME,
        {
          filter: {
            q: inputValue,
          },
          pagination: {
            page: 0,
            perPage: 10,
          },
          sort: { field: "", order: "asc" },
        }
      );
      console.log({ data });
      setOptions(data);
    })();

    return () => {
      active = false;
    };
  }, [loading, inputValue]);
  console.log({ errors });

  const validate = () => {
    if (formData.title !== "") {
      if (formData.date !== "") {
        if (clients.length !== 0) {
          return true;
        } else {
          toast.error("Add atleast 1 client");
        }
      } else {
        toast.error("Select a date");
      }
    } else {
      toast.error("Title empty");
    }
    return false;
  };

  const today = new Date();

  if (formData.date === "") return <Loading />;

  return (
    <div>
      {" "}
      <form
        style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}
        autoComplete='off'
        onSubmit={(e) => {
          e.preventDefault();
          const toastId = toast("Submitting...", { autoClose: false });
          const tokenId = localStorage.getItem("firebaseToken");
          if (validate())
            AxiosInstance.post("", {
              jsonrpc: "2.0+hl",
              id: 1,
              method: `jdr1:${DataProviderTypes.TRIP}:edit`,
              params: {
                trip_id: tripId,
                title: formData.title,
                date: formData.date,
                bme_id: bmeId,
                clients: clients.map((val) => {
                  console.log({ val });
                  return {
                    _id: val._id,
                    type: val.type,
                    allocation: val.allocation,
                  };
                }),
              },
              auth: {
                type: "gcloud_firebase",
                id_token: tokenId || "",
              },
            })
              .then((res) => {
                console.log({ res });
                if (
                  res.data.error &&
                  res.data.error.code === "invalid_client_list"
                ) {
                  setErrors(res.data.error.data);
                } else {
                  toast.update(toastId, {
                    render: "Success",
                    autoClose: 1,
                    type: "success",
                  });
                  history.push(RouteDefinitons.ROUTE_TRIPS + "/" + bmeId);
                }
              })
              .catch((err) => {
                console.log(err);
                toast.error(err.message);
              });
        }}
      >
        <TextField
          className='formcontrol-field'
          label='Title'
          variant='filled'
          name='title'
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          required
        />
        <TextField
          inputProps={{
            min: `${today.getFullYear()}-${today.getMonth() + 1}-${
              today.getDate() + 1
            }`,
          }}
          name='date'
          label='Date'
          type='date'
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.date}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, date: e.target.value }))
          }
          className='formcontrol-field'
        />
        <FormControl className='formcontrol-field'>
          <Autocomplete
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id='asynchronous-demo'
            style={{ width: 300 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            onChange={(event, newValue) => {
              if (newValue) {
                if (!clients.some((el) => el._id === newValue.id)) {
                  console.log({ newValue });
                  setClients((prev) => [
                    ...prev,
                    {
                      name: newValue.name,
                      _id: newValue.id,
                      type: newValue.type,
                      allocation: {
                        total_weight_kg: 0,
                      },
                    },
                  ]);
                }
              }
            }}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Clients'
                variant='outlined'
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {loading ? (
                        <CircularProgress color='inherit' size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }}
              />
            )}
          />
        </FormControl>
        {clients.length !== 0 && (
          <FormControl>
            <Paper style={{ padding: "20px 10px" }}>
              {clients.map((val, index) => (
                <Card
                  key={val._id}
                  style={{
                    padding: 10,
                    margin: "15px 5px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>{val.name}</div>
                    <TextField
                      label='Weight (KG)'
                      variant='filled'
                      type={"number"}
                      value={val.allocation.total_weight_kg}
                      onChange={(e) => {
                        let arr = clients;
                        arr[index] = {
                          ...val,
                          allocation: {
                            total_weight_kg: parseInt(e.target.value),
                          },
                        };
                        setClients((prev) => [...prev]);
                      }}
                      inputProps={{
                        min: 1,
                      }}
                    />
                    <Button
                      variant='outlined'
                      onClick={() => {
                        setClients((prev) =>
                          prev.filter((pval) => pval._id !== val._id)
                        );
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                  {errors.some((evalue) => evalue._id === val._id) && (
                    <p
                      style={{
                        background: "red",
                        padding: "5px 10px",
                        color: "white",
                      }}
                    >
                      {errors.find((evalue) => evalue._id === val._id)?.code}
                    </p>
                  )}
                </Card>
              ))}
            </Paper>
          </FormControl>
        )}
        <FormControl>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            style={{ width: "fit-content", marginLeft: 10, marginTop: 20 }}
          >
            Save
          </Button>
        </FormControl>
      </form>
    </div>
  );
};
