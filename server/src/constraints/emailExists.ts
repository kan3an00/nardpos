import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';

import { UsersService } from '../users/users.service';

@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class EmailExistsConstraint implements ValidatorConstraintInterface {
    constructor(
        private readonly usersService: UsersService
    ) {}

    async validate(email: string) {
        const user = await this.usersService.findOne(email);
        
        if(user){
            throw new UnprocessableEntityException('Email already exists');
        } else {
            return true;
        }
    }

    defaultMessage() {
        return 'Email must be unique'; // Validation error message
    }
}
  