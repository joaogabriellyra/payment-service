import { Repository } from 'typeorm';
import { MyPostgresDataSource } from '../config/database';
import { User } from '../database/entity/User';

export default class UserService {
    private userRepository: Repository<User>;

    constructor() {
      this.userRepository = MyPostgresDataSource.getRepository(User);
    }

    public async newUser(firstName: string, lastName: string, email: string, password: string): Promise<User> {
        const newUser = await this.userRepository.save({firstName, lastName, email, password})
        return newUser;
    }

    public async findOneUser(email: string): Promise<User> {
      return await this.userRepository.findOne({ where: { email }})
    }

    public async confirmEmail(email: string): Promise<void> {
      await this.userRepository.update({
        email
      },
      {
        confirmed: true
      })
    }

    public async updateUserPassword(email:string, password: string): Promise<void> {
      await this.userRepository.update({
        email
      },
      {
        password
      })
    }

    public async deleteUser(email: string): Promise<void> {
      await this.userRepository.update({
        email
      },
      {
        deleted: true
      })
    }

}