const messages: any = {
  dataNotFound: "Data not found",
  expireAccessToken: "your jwt token is expired",
  invalidAccessToken: "token is not valid",
  notAuthorized:"You are not authorize to do this operation",
  fileNotFound:"mp3 file not found",
  fileUploadFailed:"file upload failed",
  somethingWentWrong:"something went wrong"

}


export const getMessage = (messageKey: string): string => {
  if (!messages[messageKey]) console.warn(`Message not found by ${messageKey}`);
  return messages[messageKey] || `Message not found by ${messageKey}`;
};