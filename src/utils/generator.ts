import moment, { Moment } from "moment";

const randomNumber = (length: number): number => {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
};

const expiration = (): string => {
  const expires = moment.utc().add(3, "minutes").toISOString();

  return expires;
};

const currentDate: Moment = moment(new Date()).utc();

export default {
  randomNumber,
  expiration,
  currentDate,
};
