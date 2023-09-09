import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder('games')
      .where('LOWER(games.title) ILIKE LOWER(:param)', { param: `%${param}%` }).getMany();
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const result = await this.repository.query('SELECT COUNT(*) as count FROM games'); // Complete usando raw query
    return result;
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder('games').where('games.id = :id', { id }).relation(Game, 'users').of(id).loadMany();
      // Complete usando query builder
  }
}
