import { differenceInDays } from "date-fns";

export interface LppParticipantInfo {
  pid: string;
  studyData: { [key: string]: string };
  contactInfos: {
    name: string;
  };
  submissions?: { [key: string]: string };
  tempParticipantInfo?: {
    id: string;
    enteredAt: number;
  }
}

export const lppSurveyKeys = {
  T0_Invites: 'T0_Invites',
  LPplus_part1: 'LPplus_part1',
  LPplus_part2: 'LPplus_part2',
  LPplus_part3: 'LPplus_part3',
}

export const getCurrentSurveyKey = (participantInfo: LppParticipantInfo): string | undefined => {
  if (!participantInfo.submissions) {
    return lppSurveyKeys.LPplus_part1;
  }
  const submissionKeys = Object.keys(participantInfo.submissions);
  if (submissionKeys.length < 1) {
    return lppSurveyKeys.LPplus_part1;
  }
  if (submissionKeys.includes(lppSurveyKeys.LPplus_part3)) {
    return undefined;
  } else if (submissionKeys.includes(lppSurveyKeys.LPplus_part2)) {
    return lppSurveyKeys.LPplus_part3;
  } else if (submissionKeys.includes(lppSurveyKeys.T0_Invites)) {
    return lppSurveyKeys.LPplus_part2;
  } else if (submissionKeys.includes(lppSurveyKeys.LPplus_part1)) {
    return lppSurveyKeys.T0_Invites;
  } else {
    return lppSurveyKeys.LPplus_part1;
  }
}

export const firstSubmissionTooOld = (participantInfo: LppParticipantInfo): boolean => {
  if (!participantInfo.submissions) {
    return false;
  }
  const submissionKeys = Object.keys(participantInfo.submissions);
  if (!submissionKeys.includes(lppSurveyKeys.LPplus_part1)) {
    return false;
  }
  const firstSubmission = new Date(participantInfo.submissions[lppSurveyKeys.LPplus_part1]);
  const diff = differenceInDays(firstSubmission, new Date());
  if (Math.abs(diff) > 42) {
    return true;
  }

  return false;
}
