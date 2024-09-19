import bcrypt from "bcrypt";

const passwordEncoder = (password: string): string => {
  const salt = bcrypt.genSaltSync(2);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
};

export default passwordEncoder;
