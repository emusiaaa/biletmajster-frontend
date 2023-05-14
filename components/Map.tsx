import { Card } from '@mui/material';
import dynamic from "next/dynamic"
import { CSSProperties } from "react";

const MyMap = dynamic(async () => (await import('./EagerMap')).EagerMap, { ssr: false });
const MyMarker = dynamic(async () => (await import('./EagerMap')).EagerMarker, { ssr: false });
const MyClickChecker = dynamic(async () => (await import('./EagerMap')).ClickChecker, { ssr: false });
const MyPopup = dynamic(async () => (await import('react-leaflet')).Popup, { ssr: false });

type Pos = [number, number];

export interface MapProps {
  bluePin?: Pos,
  orangePin?: Pos,
  onClick?: (arg: Pos) => void,
  style?: CSSProperties,
  elevation?: number
}

export const Map = (props: MapProps) => {
  return (
    <Card sx={props.style} elevation={props.elevation}>
      <MyMap
        center={props.bluePin ?? [52.232, 21]}
        zoom={props.bluePin === undefined ? 12 : 17}
        style={{ width: "100%", height: "100%" }}
      >
        <MyClickChecker
          clickedPosition={latLng => (props.onClick ?? (() => { }))([latLng.lat, latLng.lng])}
        />
        {
          props.bluePin === undefined ? undefined :
            <MyMarker
              position={props.bluePin}
            />
        }
        {
          props.orangePin === undefined ? undefined :
            <MyMarker
              position={props.orangePin}
              isNew
            />
        }
      </MyMap>
    </Card>
  )
}