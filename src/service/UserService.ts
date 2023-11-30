import { Repository } from 'typeorm';
import { MyPostgresDataSource } from '../config/database';
import { User } from '../database/entity/User';

export default class UserService {
    private userRepository: Repository<User>;

    constructor() {
      this.userRepository = MyPostgresDataSource.getRepository(User);
    }

    public async newUser(firstName, lastName, email, password) {
        const newUser = await this.userRepository.save({firstName, lastName, email, password})
        return newUser;
    }
}