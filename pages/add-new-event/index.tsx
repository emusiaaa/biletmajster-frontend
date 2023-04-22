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
import { Category } from 'api/Api';
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
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]|null>(null);
    const [beginDate, setBeginDate] = useState<Dayjs|null>(
        null
    );
    const [endDate, setEndDate] = useState<Dayjs|null>(
        null
    );
    const [value, setValue] = useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
    };
    const apiClient = useApiClient();
    const theme = useTheme();
    const [categoryNames, setCategoryNames] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const handleSelector = (event: SelectChangeEvent<typeof categoryNames>, obj : any) => {
        const {
            target: { value },
        } = event;
        setCategoryNames(
            typeof value === 'string' ? value.split(',') : value,
        );
        setSelectedCategories(
           obj.key.substring(2),
        );
    };
    const submin = () =>{
        //tuuuuuuuuuu działa w końcu jprdl
        console.log(categoryNames.map((e)=>Number(e)));
    }
    const getCategories = async () => {
        setError("");
        setLoading(true);
        const response = await apiClient.categories.getCategories();
        setLoading(false);
        if (response.ok) {
            const categoriesFromResponse: Category[] = response.data.map((category: any) => {
                return {
                    id: category.id,
                    name: category.name,
                };
            });
            setCategories(categoriesFromResponse);
        } else {
            if (response.status === 400)
                setError("Invalid verification code.")
            else
                alert(response.statusText);
        }
    };
    useEffect(() => {
        getCategories();
    }, []);
    return (
        <>
            <Head>
                <title>Create Next App</title>
            </Head>

            <main>
                <PageLayout/>
                <Grid sx={{marginTop:'70px'}}>
                    <Container component="main" >
                        <CssBaseline />
                        <Box
                            sx={{
                                my: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                backgroundColor: 'lightblue'
                            }}
                        >
                            <Typography
                                noWrap
                                sx={{
                                    display: { xs: 'flex', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontSize: '30px',
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
                                    sx={{ mb: 2 }}
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={6} >

                                                <TextField
                                                    required
                                                    label="Short description of event"
                                                    fullWidth
                                                    multiline
                                                    maxRows={6}
                                                    minRows={2}
                                                    sx={{ mb: 2 }}
                                                />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                label="Event start time"
                                                sx={{width:'100%', mb: 2}}
                                            />
                                            <DateTimePicker
                                                label="Event end time"
                                                sx={{width:'100%', mb: 2}}
                                            />
                                        </LocalizationProvider>
                                        <TextField
                                            fullWidth
                                            required
                                            type="number"
                                            label="Max places"
                                            sx={{ mb: 2 }}
                                        />
                                        <TextField
                                            fullWidth
                                            required
                                            type="number"
                                            label="Lat"
                                            sx={{ mb: 2 }}
                                        />
                                        <TextField
                                            fullWidth
                                            required
                                            type="number"
                                            label="Long"
                                            sx={{ mb: 2 }}
                                        />
                                    </Grid>
                                </Grid>
                                <FormControl sx={{width: '100%' }}>
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
                                    {/*tuuuuuuu*/}
                                    {categories ? categories.map((category) => (
                                        <MenuItem
                                            key={category.id}
                                            value={category.id}
                                            style={getStyles(category.name, categoryNames, theme)}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    )) : <MenuItem>bleee</MenuItem>}
                                </Select>
                                </FormControl>

                                <Button
                                    data-testid="login"
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mb: 2 }}
                                    onClick={submin}
                                >
                                   ADD
                                </Button>

                            </Box>
                        </Box>
                    </Container>
                    <AddCategoryPopUp/>
                </Grid>

            </main>

        </>
    )
}
