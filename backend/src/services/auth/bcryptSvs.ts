import bcrypt from 'bcrypt';


class BcryptSvs {
  private static saltRounds = 12;

  static async hashPassword(password: string) {
    return await bcrypt.hash(password, this.saltRounds);
  }

  static async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}

export default BcryptSvs;
