import { dataAPI } from "../../api/api";

export const getAllocatedDistricts = async () => {
  return await dataAPI.post("/getAllDistricts");
};

export const getAllocatedBlocks = async (district) => {
  return await dataAPI.get(`/getAllBlocksByDistrict/${district}`);
};

//* To get Assigned clusters for our consultant
export const getAllocatedClusters = async (data) => {
    const { year, month, consultantId } = data;
    return await dataAPI.get(
      `/getAllocatedClusters/${year}/${month}/${consultantId}`
    );
  };
  
  //* To get the schools according to the selected clusters
  export const getAllSchoolsClusterwise = async (cluster) => {
    return await dataAPI.get("getAllSchoolsByCluster/" + cluster);
  };

//? To fetch the feedback report of the consultant
export const getStudentReport = async (body) => {
  return await dataAPI.post("getTimespentReport", body);
};
