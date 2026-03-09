import moment from "moment-timezone";

export const formatDate = (payload: string, format: string) => {
  return moment(payload)
    .tz(moment.tz.guess())
    .format(format || "dddd Do MMMM, YYYY");
};

export const formatOnlyDate = (payload: string) => {
  return moment(payload).tz(moment.tz.guess()).format("DD-MM-YYYY");
};

export const formatOnlyTime = (payload: string) => {
  return moment(payload).tz(moment.tz.guess()).format("hh:mmA");
};

export const formatDateTime = (payload: string) => {
  return moment(payload)
    .tz(moment.tz.guess())
    .format("dddd Do MMMM, YYYY - hh:mm A");
};

export const formatDateDashTime = (payload: string) => {
  return moment(payload).tz(moment.tz.guess()).format("DD-MM-YYYY - hh:mm A");
};

export const timeDiffDay = (date: Date | string) => {
  const timePart = moment(date).tz(moment.tz.guess()).format("hh:mm A");
  const currentTime = moment().tz(moment.tz.guess());
  const diffDays = currentTime.diff(date, "days");

  if (diffDays === 0) {
    return `Today - ${timePart}`;
  } else if (diffDays === 1) {
    return `Yesterday - ${timePart}`;
  } else {
    return `${diffDays} Days ago - ${timePart}`;
  }
};

export const timeDiffShort = (date: Date | string) => {
  const currentTime = moment().tz(moment.tz.guess());
  const diffDays = currentTime.diff(date, "days");

  const diffHours = currentTime.diff(date, "hours");
  const diffMinutes = currentTime.diff(date, "minutes");
  const diffSeconds = currentTime.diff(date, "seconds");

  if (diffSeconds < 60) {
    return `${diffSeconds}s`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  } else if (diffHours < 24) {
    return `${diffHours}h`;
  } else if (diffDays === 0) {
    return `Today`;
  } else if (diffDays === 1) {
    return `Yesterday`;
  } else {
    return `${diffDays}d`;
  }
};

export const timeDiff = (payload: string) => {
  return moment(payload).tz(moment.tz.guess()).fromNow();
};
