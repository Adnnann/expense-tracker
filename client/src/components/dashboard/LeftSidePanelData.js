import Typography from '@material-ui/core/Typography';

export default function LeftSidePanelData({totalBalance}) {
  return (
    <div style={{ display: 'inline-flex' }}>
      <Typography
        variant='h5'
        style={{
          display: 'inline-flex',
          marginTop: '10px',
          marginLeft: '5px',
          color: "black"}}
      >
          {totalBalance}
      </Typography>
    </div>
  );
}
