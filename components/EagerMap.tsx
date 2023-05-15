import { CircularProgress } from "@mui/material";
import L, { LatLng, MapOptions } from "leaflet";
import dynamic from "next/dynamic";
import { CSSProperties, ReactNode } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  Marker,
} from "react-leaflet";

interface MapProps {
  style?: CSSProperties;
  center: [number, number];
  children: ReactNode | ReactNode[];
  zoom: number;
  pinPosition?: [number, number];
}

export const EagerMap = (props: MapProps & MapOptions) => {
  const { children, style, ...options } = { ...props };
  // const map = useMap();
  // useMapEvents({

  // });
  return (
    <MapContainer maxZoom={18} style={style} {...options}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {children}
    </MapContainer>
  );
};

const icon = L.icon({
  iconUrl: "/gps-icon.svg",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});
const iconNew = L.icon({
  iconUrl: "/gps-icon-new.svg",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export const EagerMarker = (props: {
  children?: ReactNode;
  position: [number, number];
  isNew?: boolean;
}) => {
  return (
    <Marker
      position={props.position}
      icon={props.isNew === true ? iconNew : icon}
    >
      {props.children}
    </Marker>
  );
};

export const ClickChecker = (props: {
  clickedPosition: (arg: LatLng) => void;
}) => {
  useMapEvents({
    click(e) {
      props.clickedPosition(e.latlng);
      console.log("Clicku, " + e.latlng.toString());
    },
  });

  return <></>;
};
