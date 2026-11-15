import { Link } from "react-router";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";

// project imports
import AuthWrapper1 from "components/AuthWrapper1";
import AuthCardWrapper from "components/AuthCardWrapper";
import Logo from "ui-component/Logo";
import AuthRegister from "components/auth-forms/AuthRegister";
import AuthFooter from "ui-component/cards/AuthFooter";

// assets

// ===============================|| AUTH3 - REGISTER ||=============================== //

const RegisterScreen = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

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
                  <Grid sx={{ mb: 3 }}>
                    <Link to="#">
                      <Logo />
                    </Link>
                  </Grid>
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
                            Sign up
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
                    <AuthRegister />
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
                        to="/login"
                        variant="subtitle1"
                        sx={{ textDecoration: "none" }}
                      >
                        Already have an account?
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

export default RegisterScreen;
