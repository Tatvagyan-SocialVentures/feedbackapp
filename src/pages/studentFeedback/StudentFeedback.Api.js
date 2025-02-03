import { dataAPI } from "../../api/api";

//*To fetch my students under my consultantId
export const getStudentListForFeedback = async (data) => {
  return await dataAPI.post("/getAllocatedStudents", data);
};

//* To fetch all the questions.
export const getAllFeedbackQuestions = async () => {
  return await dataAPI.get("/getAllFeedbackQuestions");
};

//* To save the feedback of the student
export const saveFeedback = async (body) => {
  return await dataAPI.post("/saveParentsFeedback", body);
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

//*  API to request for feedback edit
export const requestEditToAdmin = async (body) => {
  return await dataAPI.post("request_edit_api", body);
};
