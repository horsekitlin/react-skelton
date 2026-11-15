import { Link, Navigate } from "react-router";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";

// project imports
import AuthWrapper1 from "components/AuthWrapper1";
import AuthCardWrapper from "components/AuthCardWrapper";
import AuthLogin from "components/auth-forms/AuthLogin";
import AuthFooter from "ui-component/cards/AuthFooter";

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const LoginScreen = (props) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  if (props.isAuth) return <Navigate to="/" replace />;
  return (
    <AuthWrapper1>
      <Grid
        container
        direction="column"
        sx={{ justifyContent: "flex-end", minHeight: "100vh" }}
      >
        <Grid size={12}>
          <Grid container sx={{ justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 68px)" }}>
            <Grid sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  sx={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Grid size={12}>
                    <Grid
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      sx={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Grid>
                        <Stack
                          spacing={1}
                          sx={{ alignItems: "center", justifyContent: "center" }}
                        >
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? "h3" : "h2"}
                          >
                            Hi, Welcome Back
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            sx={{ textAlign: matchDownSM ? "center" : "inherit" }}
                          >
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid size={12}>
                    <AuthLogin handleSignIn={props.handleSignIn} />
                  </Grid>
                  <Grid size={12}>
                    <Divider />
                  </Grid>
                  <Grid size={12}>
                    <Grid
                      container
                      direction="column"
                      size={12}
                      sx={{ alignItems: "center" }}
                    >
                      <Typography
                        component={Link}
                        to="/pages/register/register3"
                        variant="subtitle1"
                        sx={{ textDecoration: "none" }}
                      >
                        Don&apos;t have an account?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default LoginScreen;
