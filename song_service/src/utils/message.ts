const messages: any = {
  dataNotFound: "Data not found",
  emailAlreadyExist: "Email already exist",
  expireAccessToken: "your jwt token is expired",
  incorrectEmailPassword: "incorrect email or password",
  invalidAccessToken: "token is not valid",
  userNotFound: "user not found",
  userDeleted: "user deleted successfully",
  notAuthorized:"You are not authorize to do this operation"

}


export const getMessage = (messageKey: string): string => {
  if (!messages[messageKey]) console.warn(`Message not found by ${messageKey}`);
  return messages[messageKey] || `Message not found by ${messageKey}`;
};