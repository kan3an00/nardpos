import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/users/user.entity';

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
    ): Promise<void> {
        await dataSource.query('TRUNCATE "user" RESTART IDENTITY;');

        const repository = dataSource.getRepository(User);
        await repository.insert({
            name: 'Super Admin',
            email: 'superadmin@nardpos.com',
            password: 'P@ssw0rd!',
        });
    }
}
