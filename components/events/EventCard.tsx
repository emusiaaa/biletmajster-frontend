import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
//import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
import { Event} from 'api/Api';
import {Box, Typography, Grid } from '@mui/material';
import { useState } from 'react';
import { Map } from '@/components/Map';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



export interface EventProps {
    event: Event
};

export const EventCard = (props: EventProps) => {
    const [expanded, setExpanded] = useState(false);
    const startTime = new Date(props.event.startTime * 1000);
    const endTime = new Date(props.event.endTime * 1000);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false // Use 24-hour clock format
    };;
    const formattedStartTime = startTime.toLocaleDateString('en-US', options);
    const formattedEndTime = startTime.toLocaleDateString('en-US', options);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return(
        <>
            <Card sx={{ maxWidth: 1045, mt:5 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            1223
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={props.event.title}
                    subheader={formattedStartTime + " - " + formattedEndTime}
                    titleTypographyProps={{variant:'h5' }}
                />
                <Box sx={{backgroundColor: 'primary.dark', height: "150px", width:"230px"}}>

                </Box>
                <h2>sjijdoj</h2>

                <CardContent>


                    <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if youhhuhu like.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>About:</Typography>
                        <Typography paragraph>
                            {props.event.name}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </>
    )
}