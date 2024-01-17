import { Seeder, DataFactory } from "nestjs-seeder";
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from "src/enums/role.enum";

@Injectable()
export class UserSeeder implements Seeder {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,) {}

    async seed(): Promise<any> {
        const hashedPassword = await bcrypt.hash("P@ssw0rd!", 10);
        const users = [
            {
                "name": "Super Admin",
                "email": "superadmin@nardpos.com",
                "password": hashedPassword,
                "role": Role.Admin
            },
            {
                "name": "Employee",
                "email": "employee@nardpos.com",
                "password": hashedPassword,
                "role": Role.Employee
            },
        ]   

        // Insert into the database.
        return this.userRepository.createQueryBuilder()
            .insert()
            .into(User)
            .values(users)
            .execute();
    }
    
    async drop(): Promise<any> {
        return this.userRepository.createQueryBuilder()
            .delete()
            .from(User)
            .execute();
    }
}
