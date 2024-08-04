import { IsNotEmpty } from 'class-validator';

export class WelcomeEmailDto {
    name: string;
    email: string;
    phoneNumber: string;
    siteLink: string;
    pollenPassId: string;
    createdAt: string;
}

export class EmailUserDto {
    @IsNotEmpty()
    first_name: string;
    @IsNotEmpty()
    last_name: string;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    country_code: string;
    @IsNotEmpty()
    phone_no: string;
}

export class EmailAdminOnboardNotifyDto {
    email_type!: string;
    companyName: string;
    companyType: string;
    companyLocation: string;
    liquidateVolume: string;
    contactName: string;
    contactEmail: string;
    contactPhoneNumber: string;
    adminLink: 'https://admin-dev.pollen.tech';
}
