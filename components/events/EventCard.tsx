import {styled} from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, {IconButtonProps} from "@mui/material/IconButton";
import {red} from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import {Event, EventStatus} from "../../api/Api";
import {Box, Typography, Grid, Chip, CircularProgress} from "@mui/material";
import {useState} from "react";
import {Map} from "@/components/Map";
import EditIcon from "@mui/icons-material/Edit";
import {LinearProgress} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {sessionTokenState} from "../../recoil/sessionTokenState";
import {useApiClient} from "../../functions/useApiClient";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import {Camera} from "@mui/icons-material";

export interface EventProps {
    event: Event;
    hideEditButtons?: boolean;
}

export interface StatusProps {
    status: EventStatus;
}

export interface TitleProps {
    status: EventStatus;
    title: string;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
export const StatusChip = (props: StatusProps) => {
    return (
        <>
            {props.status === EventStatus.Pending ? (
                <Chip
                    style={{backgroundColor: "#FFCA3A", height: "25px"}}
                    icon={<MoreHorizIcon style={{color: "black"}}/>}
                    label={props.status}
                />
            ) : props.status === EventStatus.InFuture ? (
                <Chip
                    style={{backgroundColor: "#D972FF", height: "25px"}}
                    icon={<UpdateOutlinedIcon style={{color: "black"}}/>}
                    label={props.status}
                />
            ) : props.status === EventStatus.Cancelled ? (
                <Chip
                    style={{backgroundColor: "red", height: "25px"}}
                    icon={<HighlightOffIcon style={{color: "black"}}/>}
                    label={props.status}
                />
            ) : (
                //EventStatus.Done
                <Chip
                    style={{backgroundColor: "#8AC926", height: "25px"}}
                    icon={<CheckCircleOutlineIcon style={{color: "black"}}/>}
                    label={props.status}
                />
            )}
        </>
    );
};
export const Title = (props: TitleProps) => {
    return (
        <Grid container>
            <Grid>
                <StatusChip status={props.status}/>
            </Grid>
            <Grid sx={{ml: 1}}>
                <Typography variant="h5">{props.title}</Typography>
            </Grid>
        </Grid>
    );
};
export const EventCard = (props: EventProps) => {
    const [sessionToken, setSessionToken] = useRecoilState(sessionTokenState);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const apiClient = useApiClient();
    const startTime = new Date(props.event.startTime * 1000);
    const endTime = new Date(props.event.endTime * 1000);
    const progressBarValue = (props.event.freePlace * 100) / props.event.maxPlace;
    const [expanded, setExpanded] = useState(false);
    const [photos, setPhotos] = useState<string[]>([]);

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false, // Use 24-hour clock format
    };
    const formattedStartTime = startTime.toLocaleDateString("en-US", options);
    const formattedEndTime = endTime.toLocaleDateString("en-US", options);

    const handleEdit = () => {
        router.push("/events/edit?id=" + props.event.id);
        console.log("edit icon");
    };
    const handleDelete = async () => {
        console.log("delete icon");
        if (sessionToken !== undefined) {
            const response = await apiClient.events.cancelEvent(
                props.event.id.toString(),
                {headers: {sessionToken: sessionToken}}
            );
            if (response.ok) {
                console.log(response);
            } else {
                alert("Received error: " + response.statusText);
            }
        } else {
            console.log("nie masz tokena");
        }
    };
    const downloadAll = async () => {
        if (photos.length === 0 && loading) {
            console.log("pobieram");
            const response = await apiClient.events.getPhoto(Number(props.event.id));
            if (!response.ok) {
                router.push("/dashboard");
                return;
            }
            setPhotos(response.data);
            setLoading(false);
        }
    }
    const handleExpandClick = () => {
        setExpanded(!expanded);
        downloadAll();
    };
    return (
        <>
            <Card sx={{width: 800, mt: 5, px: 3, pt: 2, boxShadow: 13}}>
                <CardHeader
                    action={
                        props.hideEditButtons ?? false ? undefined : (
                            <CardActions>
                                {props.event.status === EventStatus.Cancelled ? (
                                    <></>
                                ) : (
                                    <IconButton
                                        data-testid="delete-event-button"
                                        aria-label="delete-event"
                                        onClick={handleDelete}
                                    >
                                        <DeleteIcon style={{color: "black"}}/>
                                    </IconButton>
                                )}
                                <IconButton
                                    data-testid="edit-event-button"
                                    aria-label="Edit event"
                                    onClick={handleEdit}
                                >
                                    <EditIcon style={{color: "black"}}/>
                                </IconButton>
                                <IconButton
                                    data-testid="edit-photos-button"
                                    aria-label="Edit event photos"
                                    onClick={() =>
                                        router.push("/events/photos?id=" + props.event.id)
                                    }
                                >
                                    <Camera style={{color: "black"}}/>
                                </IconButton>
                            </CardActions>
                        )
                    }
                    title={
                        <Title title={props.event.title} status={props.event.status}/>
                    }
                    subheader={formattedStartTime + " - " + formattedEndTime}
                    titleTypographyProps={{variant: "h5"}}
                    sx={{padding: 0, mb: 1}}
                    data-testid="card-header"
                />
                <Grid container>
                    <Grid item xs={8}>
                        <Box>
                            <Grid container spacing={1}>
                                {props.event.categories.map((cat) => (
                                    <Grid item key={cat.id}>
                                        <Chip label={cat.name} data-testid="event-category"></Chip>
                                    </Grid>
                                ))}
                            </Grid>
                            <Typography sx={{mt: 1}} variant="body2" color="text.secondary">
                                {props.event.name}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <>
                            <Map
                                style={{
                                    width: 240,
                                    height: 150,
                                    borderColor: "black",
                                    borderWidth: 1,
                                }}
                                elevation={0}
                                bluePin={[
                                    Number(props.event.latitude),
                                    Number(props.event.longitude),
                                ]}
                            />
                        </>
                    </Grid>
                    <Grid item xs={12} sx={{mt: 1, mb: 3}}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography data-testid="event-free-places" gutterBottom>
                                    free places:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom align="right">
                                    {props.event.freePlace + " out of " + props.event.maxPlace}
                                </Typography>
                            </Grid>
                        </Grid>
                        <LinearProgress
                            value={progressBarValue}
                            variant="determinate"
                            data-testid="progress-bar"
                        />
                    </Grid>
                </Grid>
                <CardActions disableSpacing>

                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>

                    </ExpandMore>
                    {expanded ? "Hide pictures" : "Show pictures"}
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Box
                            sx={{
                                width: "100%",
                                overflow: "auto",
                                display: "flex",
                                padding: 1,
                                gap: 1,
                            }}
                        >
                            {loading ? <CircularProgress /> :
                                photos.length === 0 ? "No photos found...." : photos.map((imgSrc, index) => (
                                <Box
                                    key={imgSrc}
                                    sx={{
                                        width: 200,
                                        height: "fit-content",
                                        display: "flex",
                                        flexShrink: 0,
                                        border: "1px solid lightgray",
                                        borderRadius: 2,
                                    }}
                                    alignItems="center"
                                    alignContent="center"
                                    justifyContent="center"
                                >
                                    <Grid container direction="row">
                                        <Grid item>
                                            <img
                                                src={imgSrc}
                                                width="100"
                                                height="100"
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                    borderRadius: 8,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </Collapse>
            </Card>
        </>
    );
};
