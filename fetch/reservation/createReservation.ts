
export interface CreateReservationRequest {
  eventId: number;
  placeId: number;
  reservationToken: string;
}

export interface CreateReservationResponse {
  eventId: number;
  placeId: number;
  reservationToken: string;
}

export const createReservation(

  created?: (arg: CreateReservationResponse) => void
  noFreePlace?: () => void,
  notExist?: () => void
)