import { Index, Generated, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('faucet_activity') 
export class FaucetActivityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Generated('uuid')
    @Column({ unique: true, nullable: false })
    uuid: string;

    @Index()
    @Column({ unique: false, nullable: false })
    address: string;

    @Column({ unique: false, nullable: false })
    dvitaAmount: string;

    @Column({ unique: true, nullable: false })
    dvitaTxHash: string;

    @Column({ unique: false, nullable: false })
    dvgAmount: string;

    @Column({ unique: true, nullable: false })
    dvgTxHash: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    modifiedDate: Date;
}