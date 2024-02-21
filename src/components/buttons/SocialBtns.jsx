import { Grid } from "@mui/material";

import Facebook from "@/components/buttons/Facebook";
import Google from "@/components/buttons/Google";

const SocialBtns = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} md={6}>
        <Google />
      </Grid>
      <Grid item xs={12} md={6}>
        <Facebook />
      </Grid>
    </Grid>
  );
};
export default SocialBtns;
