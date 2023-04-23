#!/bin/bash

# replace Organizer with OrganizerDTO to prevent declaration conflict
curl https://raw.githubusercontent.com/PW-MiNI-IO2-2023-Group-3/Specyfikacja/main/API.json --silent --output API.json
# sed -i -e 's/schemas\/Organizer/schemas\/OrganizerDTO/g' API.json
# sed -i -e 's/\"Organizer\":/\"OrganizerDTO\":/g' API.json
sta --path API.json --disable-throw-on-error --output api --clean-output
mv API.json api/API.json
