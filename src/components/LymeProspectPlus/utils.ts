export interface LppParticipantInfo {
  pid: string;
  studyData: { [key: string]: string };
  contactInfos: {
    name: string;
  };
  submissions?: { [key: string]: string };
  tempParticipantId?: {
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
  console.log('todo: implement logic to check if first submission is too old');
  return true;

  /*
  if (participantInfo.submissions['T0_Invites'] < new Date().getTime()) {

  }*/
}
