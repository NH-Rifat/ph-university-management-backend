export const semesterRegistrationStatus = ["UPCOMING", "ONGOING", "ENDED"];

export const semesterRegistrationStatusValidation = {
  type: "string",
  enum: semesterRegistrationStatus,
};

export const semesterRegistrationStatusEnum = {
  UPCOMING: "UPCOMING",
  ONGOING: "ONGOING",
  ENDED: "ENDED",
} as const;
