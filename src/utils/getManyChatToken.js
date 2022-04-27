export const getManyChatToken = (companyAbbr, clientTokens) => {
  const token = clientTokens[companyAbbr].mc_token;
  return token;
};
