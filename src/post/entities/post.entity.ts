import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import {
    AfterInsert,
    BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    @IsNotEmpty({ message: '제목란을 확인해주세요' })
    @IsString()
    title: string;

    @Column({ type: 'longtext' })
    @IsNotEmpty({ message: '내용란을 확인해주세요' })
    content: string;

    @Column({ nullable: true })
    @IsString()
    image?: string;

    @Column({ default: 0 })
    @IsNumber()
    likes: number;

    @Column({ default: 'unfinished' })
    status: string;

    @Column({ default: 0 })
    hitCount: number;

    @Column({ default: 0 })
    warning: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne((type) => User, (user) => user.posts)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    // @ManyToMany((type) => Tag, (tag) => tag.posts, { cascade: true })
    // @IsNotEmpty({ message: '입력란을 확인해주세요' })
    // @JoinTable()
    // tags: Tag[];

    // @OneToMany((type) => Comment, (comment) => comment.post)
    // comments: Comment[];

    // @OneToMany((type) => PostLike, (postLike) => postLike.post)
    // postLikes: PostLike[];

    // @OneToMany((type) => Warning, (warning) => warning.post)
    // warnings: Warning[];

    // @BeforeInsert()
    // beforeInsert() {
    //     this.content = he.encode(this.content);
    // }

    // @AfterInsert()
    // afterInsert() {
    //     this.content = he.decode(this.content);
    // }
}
