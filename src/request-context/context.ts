import { EntityManager } from 'typeorm';

export interface Context {
    transaction?: EntityManager;
}
