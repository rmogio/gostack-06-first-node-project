import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AlterProviderFieldToProviderId1592964595753 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider')

    await queryRunner.addColumn('appointments', new TableColumn({
      name:'provider_id',
      type:'uuid',
      isNullable: true
    }))

    /**
     * Cria uma chave estrangeira de relacionamento com a tabela de usuarios
     */
    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      //nome da chave estrangeira
      name: 'AppointmentProvider',
      //nome da coluna que vai receber
      columnNames: ['provider_id'],
      //coluna referenciada na outra tabela
      referencedColumnNames: ['id'],
      //tabela de referencia
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider')

    await queryRunner.dropColumn('appointments', 'provider_id')

    await queryRunner.addColumn('appointments', new TableColumn({
        name: 'provider',
        type: 'varchar',
    }))
  }

}
