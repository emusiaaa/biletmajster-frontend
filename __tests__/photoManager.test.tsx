import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PhotoManager } from '../components/PhotoManager';

beforeAll(() => {
  const user = userEvent.setup();
})

describe("PhotoManager", () => {
  it("renders all input data (title, types, max photos...)", () => {
    const addMock = jest.fn();
    const removeMock = jest.fn();
    const images: string[] = [];
    const types = ['jpg', 'png'];
    render(
      <PhotoManager
        title="TITLE"
        maxImages={5}
        imageSrcs={images}
        addImage={addMock}
        removeByIndex={removeMock}
        enabled={false}
        allowedTypes={types}
      />
    );
    expect(screen.getByText("TITLE")).toBeDefined();
    expect(screen.getByText("TITLE")).toBeDefined();
    expect(screen.getByText(text => text.includes("Max. images: 5"))).toBeDefined();
    types.forEach(type => expect(screen.getByText(text => text.includes(type))));
  });

  it("sends file when it is submitted", async () => {
    const user = userEvent.setup();
    const addMock = jest.fn();
    const removeMock = jest.fn();
    const images: string[] = [];
    const str = "some string";
    const blob = new Blob([str]);
    const file = new File([blob], 'image.png', {
      type: 'image/png',
    });
    File.prototype.text = jest.fn().mockResolvedValueOnce(str);
    render(
      <PhotoManager
        title="TITLE"
        maxImages={5}
        imageSrcs={images}
        addImage={addMock}
        removeByIndex={removeMock}
      />
    );

    const input = screen.getByTestId('upload-input');
    await act(() => {
      user.upload(input, file);
    })
    await waitFor(() => expect(addMock).toHaveBeenCalled());
  });

  it("removes image when X is clicked", async () => {
    const user = userEvent.setup();
    const addMock = jest.fn();
    const removeMock = jest.fn();
    const images = ["url1", "url2", "url3"]
    render(
      <PhotoManager
        title="TITLE"
        maxImages={3}
        imageSrcs={images}
        addImage={addMock}
        removeByIndex={removeMock}
      />
    );

    await act(() => {
      user.click(screen.getByTestId("clear-button-1"));
    });
    await waitFor(() => expect(removeMock).toHaveBeenCalledWith(1));
  });

  it("disables Add button when max number of photos is reached", () => {
    const addMock = jest.fn();
    const removeMock = jest.fn();
    const images = ["url1", "url2", "url3"]
    render(
      <PhotoManager
        title="TITLE"
        maxImages={3}
        imageSrcs={images}
        addImage={addMock}
        removeByIndex={removeMock}
      />
    );

    expect(screen.getByTestId("add-button")).toBeDisabled();
    expect(screen.getByTestId("clear-button-0")).not.toBeDisabled();
    expect(screen.getByTestId("clear-button-1")).not.toBeDisabled();
    expect(screen.getByTestId("clear-button-2")).not.toBeDisabled();
  });

  it("disables buttons with component is forcefully disabled", () => {

    const addMock = jest.fn();
    const removeMock = jest.fn();
    const images = ["url1", "url2"]
    render(
      <PhotoManager
        title="TITLE"
        maxImages={3}
        imageSrcs={images}
        addImage={addMock}
        removeByIndex={removeMock}
        enabled={false}
      />
    );

    expect(screen.getByTestId("add-button")).toBeDisabled();
    expect(screen.getByTestId("clear-button-0")).toBeDisabled();
    expect(screen.getByTestId("clear-button-1")).toBeDisabled();
  });
});
