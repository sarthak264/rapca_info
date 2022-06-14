import {
  Box,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { authProvider } from "../AuthProviders";
import { useRedirect } from "react-admin";
import LoginLogo from "../assets/LoginLogo.svg";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {}

export const Login = (props: Props) => {
  const redirect = useRedirect();
  const [emailSent, setEmailSent] = useState(false);
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);

  useEffect(() => {
    const init = async () => {
      const userData = await authProvider.VerifySignIn();
      console.log({ userData });
      if (userData.success && userData.data) {
        redirect("/");
      } else {
        localStorage.removeItem("emailForSignIn");
        redirect("/login");
      }
    };
    if (localStorage.getItem("emailForSignIn")) {
      init();
    }
  }, []);
  const onSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const toastObj = toast("Loading...", { autoClose: false });
    localStorage.setItem("emailForSignIn", email);
    authProvider.SignInWithEmail(email).then((res) => {
      if (res.data.error) {
        toast.update(toastObj, {
          render: "Something went wrong...",
          type: "error",
          autoClose: 1000,
        });
      }
      setEmailSent(true);
      toast.update(toastObj, {
        type: "success",
        render: "Mail sent",
        autoClose: 1000,
      });
    });
  };
  if (localStorage.getItem("emailForSignIn") && query.get("apiKey")) {
    return (
      <section className='verifying-page'>
        <h1>Verifying</h1>
        <CircularProgress />
      </section>
    );
  }
  return (
    <Box
      display='flex'
      justifyContent='center'
      sx={{ bgcolor: "text.main" }}
      className='login-page'
      minHeight='100vh'
    >
      <Box maxWidth={500} width='100%' marginTop='120px'>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <img src={LoginLogo} alt='logo' className='login-logo' />
          <form onSubmit={onSubmit}>
            <TextField
              variant='outlined'
              style={{ marginTop: 50, width: "100%" }}
              placeholder='Enter email'
              type='email'
              required
            />
            {emailSent && (
              <div className='email-sent'>
                <p>Please sign in using the LINK sent to your email</p>
              </div>
            )}
            <Button
              type='submit'
              variant='contained'
              color='primary'
              style={{ marginTop: 20, width: "100%" }}
              size='large'
              disabled={emailSent}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};
