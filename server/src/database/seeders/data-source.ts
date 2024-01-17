import { seeder } from "nestjs-seeder";
import { User } from "src/users/user.entity";
import { UserSeeder } from "./users.seeder";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import configuration from '../../config/configuration';
import { ConfigModule } from '@nestjs/config';
seeder({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
            load: [configuration],
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host:process.env.DB_HOST,
            port: 3306,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [User],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([User])
    ],
    providers: [UsersService, UserSeeder]
}).run([UserSeeder]);