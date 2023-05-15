import Head from "next/head";
import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import AddCategoryPopUp from "@/components/events/AddCategoryPopUp";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  CssBaseline,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Category, Event, EventForm, EventPatch } from "api/Api";
import { useRecoilState } from "recoil";
import { sessionTokenState } from "../../recoil/sessionTokenState";
import { ValidationErrors } from "fluentvalidation-ts/dist/ValidationErrors";
import { EventValidator } from "../../validators/EventValidator";
import { useApiClient } from "../../functions/useApiClient";
import { useRouter } from "next/router";
import { Map } from "@/components/Map";
import { firstLoadState } from "recoil/firstLoadState";

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
  const [loaded, _] = useRecoilState(firstLoadState);
  const [sessionToken, setSessionToken] = useRecoilState(sessionTokenState);
  const [editedEvent, setEditedEvent] = useState<Event | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [maxPlaces, setMaxPlaces] = useState<string>("");
  const [helperText, setHelperText] = useState("");
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [beginDate, setBeginDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<ValidationErrors<EventForm>>({});

  const apiClient = useApiClient();
  const theme = useTheme();
  const router = useRouter();

  const handleMaxPlaces = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = e.target.value;
    const regex = /^[1-9]\d*$/;
    if (max === "" || regex.test(max)) {
      setMaxPlaces(max);
      setHelperText("");
    } else {
      setHelperText("Please put a valid integer number");
    }
  };
  const editEvent = async () => {
    if (editedEvent === undefined) return;

    setErrors({});
    const patch: EventPatch = {
      title: title,
      name: name,
      startTime: beginDate ? beginDate.unix() : 0,
      endTime: endDate ? endDate.unix() : 0,
      latitude: lat.toString(),
      longitude: long.toString(),
      maxPlace: Number(maxPlaces),
      categoriesIds: selectedCategories.map((cat) => cat.id),
      placeSchema: "empty",
    };
    const validation = new EventValidator().validate(patch as EventForm);
    if (!Object.values(validation).every((val) => val === undefined)) {
      setErrors(validation);
      console.log(validation);
    } else {
      if (sessionToken !== undefined) {
        const response = await apiClient.events.patchEvent(
          editedEvent.id.toString(),
          patch,
          { headers: { sessionToken: sessionToken } }
        );
        if (response.ok) {
          alert("Event modified!");
          router.push("/dashboard");
        } else {
          alert("Received error: " + response.statusText);
        }
      } else {
        alert("No token!");
      }
    }
  };
  const getCategories = async () => {
    const response = await apiClient.categories.getCategories();
    if (response.ok) {
      const categoriesFromResponse: Category[] = response.data.map(
        (category: Category) => {
          return {
            id: category.id,
            name: category.name,
          };
        }
      );
      setCategories(categoriesFromResponse);
    } else {
      alert(response.statusText);
    }
  };
  const getEvent = async (id: number) => {
    const response = await apiClient.events.getEventById(id);
    if (response.ok) {
      const event = response.data as Event;
      setEditedEvent(event);
      setTitle(event.title);
      setName(event.name);
      setMaxPlaces(event.maxPlace.toString());
      setBeginDate(dayjs.unix(event.startTime));
      setEndDate(dayjs.unix(event.endTime));
      setLat(Number(event.latitude));
      setLong(Number(event.longitude));
      setSelectedCategories(event.categories);
    } else {
      if (response.status === 404) {
        alert("This event does not exist.");
        router.push("/dashboard");
      }
      alert(response.statusText);
    }
  };
  useEffect(() => {
    if (loaded) getCategories();
  }, [loaded]);
  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (id !== undefined) {
        getEvent(Number(id as string));
      }
    }
  }, [router]);
  return (
    <>
      <Head>
        <title>Edit event</title>
      </Head>
      <main>
        <PageLayout />
        <Grid sx={{ marginTop: "60px" }}>
          <Container component="main">
            <CssBaseline />
            <Box
              sx={{
                my: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "10px",
                border: "2px solid #A2ADCD",
                borderRadius: "10px",
              }}
            >
              <Typography
                noWrap
                sx={{
                  display: { xs: "flex", md: "flex" },
                  fontFamily: "monospace",
                  fontSize: "25px",
                  fontWeight: 700,
                  letterSpacing: ".2rem",
                  color: "black",
                }}
              >
                MODIFY EVENT
              </Typography>
              <Box>
                <TextField
                  data-testid="title-input"
                  required
                  fullWidth
                  label="Nazwa eventu"
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{ mb: 2 }}
                  error={errors.title !== undefined}
                  helperText={errors.title}
                />
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      data-testid="name-input"
                      required
                      label="Short description of event"
                      fullWidth
                      multiline
                      maxRows={10.4}
                      minRows={10.4}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      sx={{ mb: 2 }}
                      error={errors.name !== undefined}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container spacing={2}>
                      <Grid item container spacing={0} xs={6}>
                        <Grid item xs={12}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              label="Event start time"
                              value={beginDate}
                              minDate={dayjs()}
                              disablePast
                              onChange={(newDate) => setBeginDate(newDate)}
                              sx={{ width: "100%", mb: 2 }}
                              slotProps={{
                                textField: {
                                  error: errors.startTime !== undefined,
                                  helperText: errors.startTime,
                                },
                              }}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              data-testid="endTime-picker"
                              label="Event end time"
                              value={endDate}
                              minDate={beginDate ? beginDate : dayjs()}
                              disablePast
                              onChange={(newDate) => setEndDate(newDate)}
                              sx={{ width: "100%", mb: 2 }}
                              slotProps={{
                                textField: {
                                  error: errors.endTime !== undefined,
                                  helperText: errors.endTime,
                                },
                              }}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            data-testid="max-input"
                            fullWidth
                            required
                            label="Max places"
                            value={maxPlaces}
                            onChange={handleMaxPlaces}
                            sx={{ mb: 2 }}
                            helperText={
                              helperText + errors.maxPlace
                                ? errors.maxPlace
                                : ""
                            }
                            error={errors.maxPlace !== undefined}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        {editedEvent === undefined ? (
                          <CircularProgress />
                        ) : (
                          <Map
                            bluePin={[
                              Number(editedEvent.latitude),
                              Number(editedEvent.longitude),
                            ]}
                            orangePin={[lat, long]}
                            style={{
                              height: "calc(100% - 16px)",
                              width: "100%",
                            }}
                            onClick={(pos) => {
                              setLat(pos[0]);
                              setLong(pos[1]);
                            }}
                          />
                        )}
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          data-testid="lat-input"
                          fullWidth
                          required
                          type="number"
                          label="Lat"
                          value={lat}
                          onChange={(e) => setLat(+e.target.value)}
                          sx={{ mb: 2 }}
                          error={errors.latitude !== undefined}
                          helperText={errors.latitude}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          data-testid="long-input"
                          fullWidth
                          required
                          type="number"
                          label="Long"
                          value={long}
                          onChange={(e) => setLong(+e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <FormControl sx={{ width: "100%", mb: 2 }}>
                      <InputLabel id="categories">Category</InputLabel>
                      <Select
                        data-testid="select"
                        labelId="categories"
                        id="demo-multiple-chip"
                        multiple
                        fullWidth
                        value={selectedCategories}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setSelectedCategories(e.target.value as Category[]);
                        }}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Chip"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value.id} label={value.name} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                        error={errors.categoriesIds !== undefined}
                      >
                        {categories ? (
                          categories.map((category) => (
                            <MenuItem key={category.id} value={category as any}>
                              {category.name}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>wait.....</MenuItem>
                        )}
                      </Select>
                      <FormHelperText>{errors.categoriesIds}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <AddCategoryPopUp />
                  </Grid>
                </Grid>
                <Button
                  data-testid="add-btn"
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={editEvent}
                >
                  MODIFY
                </Button>
              </Box>
            </Box>
          </Container>
        </Grid>
      </main>
    </>
  );
}
