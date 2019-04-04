import { MigrationInterface, QueryRunner, Table, Index, TableIndex } from "typeorm";

export class addUserTable1550454621969 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isGenerated: true,
                    isPrimary: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'firstname',
                    type: 'varchar',
                },
                {
                    name: 'lastname',
                    type: 'varchar',
                },
                {
                    name: 'confirmation_code',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'role',
                    type: 'int',
                    default: 0,
                },
                {
                    name: 'status',
                    type: 'int',
                    default: 0,
                },
            ]
        }));

        await queryRunner.createIndex('user', new TableIndex({
            name: 'idx_user_search',
            columnNames: ['email', 'password', 'role']
        }));

        await queryRunner.createIndex('user', new TableIndex({
            name: 'idx_user_status',
            columnNames: ['status']
        }));

        await queryRunner.createIndex('user', new TableIndex({
            name: 'idx_user_confirmation_code',
            columnNames: ['confirmation_code']
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropIndex('user', 'idx_user_search');
        await queryRunner.dropIndex('user', 'idx_user_status');
        await queryRunner.dropIndex('user', 'idx_user_confirmation_code');
        await queryRunner.dropTable('user');
    }
}