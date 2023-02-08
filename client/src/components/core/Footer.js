import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Item from '@mui/material/Grid';

const Footer = () => {
  return (
    <Grid container item xs={12} lg={12} md={12} xl={12} justifyContent='center'>
      <Item style={{ position: 'absolute', bottom: '0', paddingBottom: '20px' }}>
        <Typography component='p'>{/* Powered by Paragon 2021 */}</Typography>
      </Item>
    </Grid>
  );
};

export default Footer;
