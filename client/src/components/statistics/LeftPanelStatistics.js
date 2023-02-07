
import Typography from "@material-ui/core/Typography"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Box } from '@mui/material';
import { setChartType } from '../../features/usersSlice';
import lineChartImage from '../../assets/images/lineChart.jpg'   
import barChartImage from '../../assets/images/barChart.png'  
import pieChartImage from '../../assets/images/pieChart.png'  
import { useDispatch} from 'react-redux';
import { ButtonGroup, IconButton, makeStyles } from "@material-ui/core"
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';

const useStyles = makeStyles(theme=>({
    card: {
        maxWidth:100,
        margin: 'auto',
        marginTop: theme.spacing(2),
        paddingBottom: theme.spacing(0),
        borderStyle:'none'
    },
  
}))

const LeftPanelStatistics = () => {

const dispatch = useDispatch()
const classes = useStyles()

//chart select functions
const pieChart = () => {
    dispatch(setChartType('pie'))
}

const barChart = () => {
    dispatch(setChartType('bar'))
}

const lineChart = () => {
    dispatch(setChartType('scatter'))
}
    return (
   
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
            >
                <Typography component="p" style={{textAlign:'left'}}>
                    Charts
                </Typography>

    {/*  
    clicable images for user to select type of chart for statistical overview of data
    */}

<ButtonGroup>
<IconButton onClick={pieChart}>
<PieChartIcon sx={{fontSize:"48px", color:'green'}}  />
</IconButton>
<IconButton onClick={barChart}>
<BarChartIcon sx={{fontSize:"48px", color:'purple'}} />
</IconButton>
<IconButton onClick={lineChart}>
<TimelineIcon  sx={{fontSize:"48px", color:"aquamarine"}} />
</IconButton>
</ButtonGroup>
 
    
  

  
                     
     </Box>
    
     
    )
}

export default LeftPanelStatistics