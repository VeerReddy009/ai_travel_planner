import API from "../utils/api";

export const generateTrip = async (
  data
) => {
  const res = await API.post(
    "/trips/generate",
    data
  );

  return res.data;
};

export const getTrips =
  async () => {
    const res =
      await API.get("/trips");

    return res.data;
  };

export const getTrip =
  async (id) => {
    const res =
      await API.get(
        `/trips/${id}`
      );

    return res.data;
  };

export const updateTrip =
  async (id, data) => {
    const res =
      await API.put(
        `/trips/${id}`,
        data
      );

    return res.data;
  };

export const deleteTrip =
  async (id) => {
    const res =
      await API.delete(
        `/trips/${id}`
      );

    return res.data;
  };


  export const addActivity =
  async (id, data) => {
    const res =
      await API.post(
          `/trips/${id}/activities`,
        data
      );

    return res.data;
  };

export const removeActivity =
  async (id, data) => {
    const res =
      await API.delete(
        `/trips/${id}/activities`,
        {
          data,
        }
      );

    return res.data;
  };

export const regenerateDay =
  async (id, dayNumber) => {
    const res =
      await API.post(
        `/trips/${id}/regenerate`,
        {
          dayNumber,
        }
      );

    return res.data;
  };