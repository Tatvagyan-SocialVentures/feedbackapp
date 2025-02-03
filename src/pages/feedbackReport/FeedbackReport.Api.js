import { dataAPI } from "../../api/api";

export const getAllocatedDistricts = async () => {
  return await dataAPI.post("/getAllDistricts");
};

export const getAllocatedBlocks = async (district) => {
  return await dataAPI.get(`/getAllBlocksByDistrict/${district}`);
};

//? To fetch the feedback report of the consultant
export const getConsultantFeedbackReport = async (body) => {
  return await dataAPI.post("getConsultantFeedbackReport", body);
};
