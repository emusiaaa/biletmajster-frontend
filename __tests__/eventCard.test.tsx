import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import { useApiClient } from "../functions/useApiClient";
import { RecoilRoot } from "recoil";
import Categories from "@/pages/events/add";
import { EventStatus, Event } from "../api/Api";
import { EventCard } from "@/components/events/EventCard";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const apiClient = {
  events: {
    cancelEvent: jest.fn(),
  },
};

jest.mock("../functions/useApiClient", () => ({
  useApiClient: jest.fn(() => apiClient),
}));

const setup = async () => {
  const user = userEvent.setup();
  const nextStepMock = jest.fn((id) => {});
  const data: Event = {
    id: 2,
    title: "Bal u krasnali",
    startTime: 1682930711,
    endTime: 1684140311,
    latitude: "52.22216",
    longitude: "21.00698",
    name: "To wydarzenie własnie trwa",
    status: EventStatus.InFuture,
    categories: [
      {
        id: 1,
        name: "Sport",
      },
      {
        id: 3,
        name: "Science",
      },
    ],
    freePlace: 10,
    maxPlace: 10,
  };
  (useRouter as any).mockReturnValue({
    push: jest.fn((path) => {}),
  });

  act(() => {
    render(
      <RecoilRoot>
        <EventCard event={data} />
      </RecoilRoot>
    );
  });

  const cardHeader = await screen.findAllByTestId("card-header");
  const categoryElements = await screen.findAllByTestId("event-category");
  const editButton = await screen.findByTestId("edit-event-button");
  const deleteButton = await screen.findByTestId("delete-event-button");
  const freePlacesElement = await screen.findByTestId("event-free-places");
  const progressBarElement = (
    await screen.findByTestId("progress-bar")
  ).querySelector(".MuiLinearProgress-bar");
  return {
    user,
    cardHeader,
    categoryElements,
    editButton,
    deleteButton,
    freePlacesElement,
    progressBarElement,
    nextStepMock,
  };
};

describe("EventCard", () => {
  it("renders event card with data", async () => {
    const {
      user,
      cardHeader,
      categoryElements,
      editButton,
      deleteButton,
      freePlacesElement,
      progressBarElement,
      nextStepMock,
    } = await setup();
    expect(categoryElements).toHaveLength(2);
    expect(categoryElements[0].textContent).toBe("Sport");
    expect(freePlacesElement.textContent).toBe("free places:");
    expect(progressBarElement).toBeInTheDocument();
  });
});
