import { Index, Generated, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('become_partner') 
export class BecomePartnerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Generated('uuid')
    @Column({ unique: true, nullable: false })
    uuid: string;

    @Column({ unique: false, nullable: false })
    companyName: string;

    @Column({ unique: false, nullable: false })
    industry: string;
    
    @Column({ unique: false, nullable: false })
    partnerName: string;

    @Column({ unique: false, nullable: false })
    position: string;

    @Column({ unique: false, nullable: false })
    email: string;

    @Column({ unique: false, nullable: true })
    description?: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    modifiedDate: Date;
}