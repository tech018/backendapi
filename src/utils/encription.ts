import bcrypt from "bcrypt";
export const encryptPassword = async (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = await bcrypt.hashSync(password, salt);
  return passwordHash;
};

export const isPasswordMatch = async (
  password: string,
  userPassword: string
) => {
  return bcrypt.compare(password, userPassword);
};
