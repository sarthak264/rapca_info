import { Box, Button, Card, TextField, Typography } from "@material-ui/core";
import { Link, useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { RouteDefinitons } from "../Utils/RouteDefinitions";

export const InviteVolunteer = (props: any) => {
  const history = useHistory();
  const { bmeId }: any = useParams();
  const onSubmit = (e: any) => {
    e.preventDefault();
    const tokenId = localStorage.getItem("firebaseToken");
    AxiosInstance.post("", {
      jsonrpc: "2.0+hl",
      id: 1,
      method: "jdr1:volunteer:invitation:add",
      params: {
        email: e.target[0].value,
        bme_id: bmeId,
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
        history.push(RouteDefinitons.ROUTE_USER_ASSOCIATIONS + "/" + bmeId);
      }
    });
  };

  return (
    <Card style={{ padding: 50, width: 400, margin: "auto" }}>
      <Typography variant='h4'>Invite</Typography>
      <form onSubmit={onSubmit} style={{ marginTop: 30 }}>
        <TextField
          variant='outlined'
          name='email'
          style={{ width: "100%" }}
          type='email'
        />
        <Box display='flex' paddingTop='50px'>
          <Link to={RouteDefinitons.ROUTE_USER_ASSOCIATIONS + "/" + bmeId}>
            <Button
              variant='outlined'
              color='secondary'
              style={{ marginRight: 10 }}
            >
              Cancel
            </Button>
          </Link>
          <Button variant='contained' color='primary' type='submit'>
            Submit
          </Button>
        </Box>
      </form>
    </Card>
  );
};

//    filters={[<TextInput source='q' label='Search' alwaysOn />]}
