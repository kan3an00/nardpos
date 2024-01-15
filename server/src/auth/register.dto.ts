import { IsNotEmpty, Validate } from 'class-validator';
import { EmailExistsConstraint } from '../constraints/emailExists';

export class registerDto {
    @IsNotEmpty()
    @Validate(EmailExistsConstraint)
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    name: string;
}