import { Index, Generated, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum SmartContractType {
    NEP5 = 'NEP5',
    NEP17 = 'NEP17',
    NEP11 = 'NEP11'
}

@Entity('smart_contract') 
export class SmartContractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Generated('uuid')
    @Column({ unique: true, nullable: false })
    uuid: string;

    @Column({ unique: false, nullable: false, enum: SmartContractType })
    type: SmartContractType;
    
    @Column({ unique: false, nullable: false })
    code: string;

    @Column({ unique: false, nullable: false })
    name: string;

    @Column({ unique: false, nullable: false })
    decimals: number;

    @Column({ unique: false, nullable: true })
    initial?: string;

    @Column({ unique: false, nullable: true })
    description?: string;

    @Column({ unique: false, nullable: true })
    metadata?: string;

    @Column({ unique: false, nullable: true })
    script?: string;

    @Index()
    @Column({ unique: false, nullable: false })
    scriptHash: string;

    @Index()
    @Column({ unique: false, nullable: false })
    address: string;

    @Column({ unique: false, nullable: true })
    ownerAddress?: string;

    @Column({ unique: false, nullable: true })
    txHash?: string;

    @Column({ unique: false, nullable: true })
    tokenUrl?: string;

    @Column({ unique: false, nullable: true })
    iconUrl?: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    modifiedDate: Date;
}