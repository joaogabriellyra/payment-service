import { Repository } from 'typeorm';
import { MyPostgresDataSource } from '../config/database';
import { Token } from '../database/entity/Token';

export default class TokenService {
    private tokenRepository: Repository<Token>;

    constructor() {
        this.tokenRepository = MyPostgresDataSource.getRepository(Token);
      }

    public async insertToken(token: string): Promise<void> {
        await this.tokenRepository.save({token})
    }

    public async getToken(token: string): Promise<Token> {
        return await this.tokenRepository.findOne(
            {
                where: { token }
            }
        )
    }

    public async removeToken(token: string): Promise<void> {
        await this.tokenRepository.delete({ token })
    }


}