import bcrypt from "bcrypt";

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function verifyPassword(myPlaintextPassword, hash) {
  const isPasswordCorrect = await bcrypt.compare(myPlaintextPassword, hash);
  return isPasswordCorrect;
}
