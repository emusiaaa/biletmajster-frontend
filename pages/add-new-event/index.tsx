import Head from 'next/head'
import Image from 'next/image'
import {SyntheticEvent, useEffect, useState } from 'react'
import PageLayout from "@/components/PageLayout";
import { useApiClient } from 'api/apiClient';
import AddCategoryPopUp from '@/components/events/AddCategoryPopUp';
import {Box, Button, Chip, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select,
    SelectChangeEvent, TextField, Theme, Typography, useTheme } from '@mui/material';
import { createTheme } from '@mui/material'
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from '@mui/x-date-pickers';
import { Category, EventForm } from 'api/Api';
import { useRecoilState } from 'recoil';
import { sessionTokenState } from 'recoil/sessionTokenState';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
export default function Categories() {
    const [sessionToken, setSessionToken] = useRecoilState(sessionTokenState);
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [maxPlaces, setMaxPlaces] = useState<string>("");
    const [helperText, setHelperText] = useState("");
    const [lat, setLat] = useState<number>(0);
    const [long, setLong] = useState<number>(0);
    const [categories, setCategories] = useState<Category[]|null>(null);
    const [beginDate, setBeginDate] = useState<Dayjs|null>(null);
    const [endDate, setEndDate] = useState<Dayjs|null>(null);
    const [categoryNames, setCategoryNames] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    const apiClient = useApiClient();
    const theme = useTheme();

    const handleMaxPlaces = (e: React.ChangeEvent<HTMLInputElement>) => {
        const max= e.target.value;
        const regex = /^[1-9]\d*$/;
        if (max === "" || regex.test(max)) {
            setMaxPlaces(max);
            setHelperText("");
        }
        else{
            setHelperText("Please put a valid integer number")
        }
    };
    const handleChangeBeginDate = (newValue: Dayjs | null ) => {
        setBeginDate(newValue);
    };
    const handleChangeEndDate = (newValue: Dayjs | null) => {
        setEndDate(newValue);
    };
    const handleSelector = (event: SelectChangeEvent<typeof categoryNames>, obj : any) => {
        const {
            target: { value },
        } = event;
        setCategoryNames(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const addEvent = async () =>{
        const newEvent: EventForm = {
            title: title,
            name: name,
            startTime: beginDate!.unix(),
            endTime: endDate!.unix(),
            latitude: lat.toString(),
            longitude: long.toString(),
            maxPlace: Number(maxPlaces),
            categoriesIds: categoryNames.map((e)=>Number(e))
        };
        if (sessionToken !== undefined) {
            const response = await apiClient.events.addEvent(newEvent,{ headers: { sessionToken : sessionToken }});
            if (response.ok) {
                console.log(response)
            } else {
                alert("Received error: "+ response.statusText);
            }
        } else{ console.log("nie masz tokena")}
    }
    const getCategories = async () => {
        const response = await apiClient.categories.getCategories();
        if (response.ok) {
            const categoriesFromResponse: Category[] = response.data.map((category: any) => {
                return {
                    id: category.id,
                    name: category.name,
                };
            });
            setCategories(categoriesFromResponse);
        } else {
            alert(response.statusText);
        }
    };
    useEffect(() => {
        getCategories();
    }, []);
    return (
        <>
            <Head>
                <title>Add new event</title>
            </Head>
            <main>
                <PageLayout/>
                <Grid sx={{marginTop:'60px'}}>
                    <Container component="main" >
                        <CssBaseline />
                        <Box
                            sx={{
                                my: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '10px',
                                border: '2px solid #A2ADCD',
                                borderRadius: '10px',
                            }}
                        >
                            <Typography
                                noWrap
                                sx={{
                                    display: { xs: 'flex', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontSize: '25px',
                                    fontWeight: 700,
                                    letterSpacing: '.2rem',
                                    color: 'black',
                                }}
                            >
                                ADD NEW EVENT
                            </Typography>
                            <Box  >
                                <TextField
                                    required
                                    fullWidth
                                    label="Nazwa eventu"
                                    autoFocus
                                    value={title}
                                    onChange={(e)=>setTitle(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={4} >
                                        <TextField
                                            required
                                            label="Short description of event"
                                            fullWidth
                                            multiline
                                            maxRows={7}
                                            minRows={7}
                                            value={name}
                                            onChange={(e)=>setName(e.target.value)}
                                            sx={{ mb: 2 }}
                                        />
                                    </Grid>
                                    <Grid item xs={8} >
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DateTimePicker
                                                        label="Event start time"
                                                        value={beginDate}
                                                        minDate={dayjs()}
                                                        onChange={handleChangeBeginDate}
                                                        sx={{width:'100%', mb: 2}}
                                                    /></LocalizationProvider>
                                            </Grid>
                                                <Grid item xs={6}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DateTimePicker
                                                        label="Event end time"
                                                        value={endDate}
                                                        minDate={beginDate ? beginDate : dayjs()}
                                                        onChange={handleChangeEndDate}
                                                        sx={{width:'100%', mb: 2}}
                                                    />
                                                </LocalizationProvider>
                                                </Grid>
                                        </Grid>
                                        <TextField
                                            fullWidth
                                            required
                                            label="Max places"
                                            value={maxPlaces}
                                            onChange={handleMaxPlaces}
                                            sx={{ mb: 2 }}
                                            helperText={helperText}
                                        />
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    type="number"
                                                    label="Lat"
                                                    value={lat}
                                                    onChange={(e)=>setLat(+e.target.value)}
                                                    sx={{ mb: 2 }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    type="number"
                                                    label="Long"
                                                    value={long}
                                                    onChange={(e)=>setLong(+e.target.value)}
                                                    sx={{ mb: 2 }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={10}>
                                        <FormControl sx={{width: '100%', mb:2 }}>
                                            <InputLabel id="categories">Category</InputLabel>
                                            <Select
                                                labelId="categories"
                                                id="demo-multiple-chip"
                                                multiple
                                                fullWidth
                                                value={categoryNames}
                                                onChange={handleSelector}
                                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} />
                                                        ))}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {categories ? categories.map((category) => (
                                                    <MenuItem
                                                        key={category.id}
                                                        value={category.id}
                                                        style={getStyles(category.name, categoryNames, theme)}
                                                    >
                                                        {category.name}
                                                    </MenuItem>
                                                )) : <MenuItem>wait.....</MenuItem>}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <AddCategoryPopUp/>
                                    </Grid>
                                </Grid>
                                <Button
                                    data-testid="login"
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={addEvent}
                                >
                                   ADD
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Grid>
            </main>
        </>
    )
}
