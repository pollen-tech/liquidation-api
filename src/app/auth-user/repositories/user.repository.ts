import { CustomRepository } from 'src/database/decorators/custom-repository.decorator';
import BaseRepository from 'src/database/infrastructure/repository/base.repository';
import { UserEntity } from './user.entity';
import { ChannelName } from '../../../common/enums/common.enum';
import { Not } from 'typeorm';

@CustomRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
    async getPollenPassUserByUserId(user_id: string) {
        const qb = this.createQueryBuilder(this.metadata.givenTableName);
        const result = await qb
            .where('auth_id=' + qb.subQuery().select('auth_id').from(UserEntity, 'user').where('user.id = :user_id').getQuery())
            .andWhere({ channel: ChannelName.POLLEN_PASS })
            .setParameter('user_id', user_id)
            .getOne();

        console.log('consol', result);
        return result;
    }

    async getPollenPassUserByEmail(email: string) {
        return await this.getRepository().findOne({ where: { email: email, channel: ChannelName.POLLEN_PASS } });
    }

    async getPollenPassUserByAuthId(auth_id: string) {
        return await this.getRepository().findOne({ where: { auth_id: auth_id, channel: ChannelName.POLLEN_PASS } });
    }

    async getChannels(user_id: string) {
        const qb = this.createQueryBuilder(this.metadata.givenTableName);
        return await qb
            .where('auth_id=' + qb.subQuery().select('auth_id').from(UserEntity, 'user').where('user.id = :user_id').getQuery())
            .andWhere({ channel: Not(ChannelName.POLLEN_PASS) })
            .setParameter('user_id', user_id)
            .getMany();
    }

    async getMaxPollenPassIdValue() {
        const qb = this.createQueryBuilder(this.metadata.givenTableName);
        const max_json = await qb.select('coalesce(max(pollen_pass_id)+1,0)', 'max').andWhere({ channel: ChannelName.POLLEN_PASS }).getRawOne<any>();
        if (max_json.max) {
            return max_json.max;
        }
        return 0;
    }
}
