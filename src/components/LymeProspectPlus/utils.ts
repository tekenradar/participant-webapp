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

export const getCurrentSurveyKey = (participantInfo: LppParticipantInfo): string | undefined => {
  if (!participantInfo.submissions) {
    return 'T0_Invites';
  }
  const submissionKeys = Object.keys(participantInfo.submissions);
  if (submissionKeys.length < 1) {
    return 'T0_Invites';
  }
  if (submissionKeys.includes('LPplus_part3')) {
    return undefined;
  } else if (submissionKeys.includes('LPplus_part2')) {
    return 'LPplus_part3';
  } else if (submissionKeys.includes('LPplus_part1')) {
    return 'LPplus_part2';
  } else if (submissionKeys.includes('T0_Invites')) {
    return 'LPplus_part1';
  } else {
    return 'T0_Invites';
  }
}

export const firstSubmissionTooOld = (participantInfo: LppParticipantInfo): boolean => {
  if (!participantInfo.submissions) {
    return false;
  }
  const submissionKeys = Object.keys(participantInfo.submissions);
  if (!submissionKeys.includes('T0_Invites')) {
    return false;
  }
  const firstSubmission = new Date(participantInfo.submissions['T0_Invites']);
  const diff = differenceInDays(firstSubmission, new Date());
  if (Math.abs(diff) > 42) {
    return true;
  }

  return false;
}
