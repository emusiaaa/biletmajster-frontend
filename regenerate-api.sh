#!/bin/bash

# replace Organizer with OrganizerDTO to prevent declaration conflict
cp api/API.json API.json
sed -i -e 's/schemas\/Organizer/schemas\/OrganizerDTO/g' api/API.json
sed -i -e 's/"Organizer":/"OrganizerDTO":/g' api/API.json
sta --path api/API.json --output api --clean-output
mv API.json api/API.json
