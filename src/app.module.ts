import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { CustomConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { HealthcheckModule } from './app/healthcheck/healthcheck.module';
import { getKeycloakModule } from './keycloak/keycloak.module';
import { UserModule } from './app/auth-user/user.module';
import { OnboardModule } from './app/onboard/onboard.module';
import { CountryModule } from './app/country/country.module';
import { NotifyModule } from './app/notify/notify.module';

// export const getAppModules = () => [HealthcheckModule, CountryModule];
export const getAppModules = () => [HealthcheckModule, UserModule, OnboardModule, CountryModule, NotifyModule];

export const getInfraModules = () => [DatabaseModule.forRoot(), getKeycloakModule()];

@Module({
    imports: [CustomConfigModule, ...getInfraModules(), ...getAppModules()],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: ResourceGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
})
export class AppModule {}
