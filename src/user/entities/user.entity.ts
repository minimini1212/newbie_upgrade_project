import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Post } from 'src/post/entities/post.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @IsEmail()
    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    bannedDate: Date;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @Column()
    password: string;

    @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
    @IsString()
    @Column()
    nickname: string;

    @Column({ default: 0 })
    warningCount: number;

    @Column({ nullable: true })
    providerId: string;

    @Column({ default: false })
    isAdmin: boolean;

    @Column({ default: false })
    isBan: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column({ nullable: true })
    profileImage?: string;

    // @OneToMany(() => Comment, (comment) => comment.user)
    // comments: Comment[];

    // @OneToMany(() => CommentLike, (commentLike) => commentLike.user)
    // commentLikes: CommentLike[];

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

    // @OneToMany((type) => PostLike, (postLike) => postLike.user)
    // postLikes: PostLike[];

    // @OneToMany((type) => Warning, (warning) => warning.user)
    // warnings: Warning[];

    // @OneToMany(() => Banner, (banner) => banner.user)
    // banners: Banner[];

    // @OneToMany(() => Answer, (answer) => answer.user)
    // answers: Answer[];

    // @OneToMany(() => ProjectLike, (projectLike) => projectLike.user)
    // projectLike: ProjectLike[];

    // async serializeUser(): Promise<number> {
    //     return this.id;
    // }

    // @OneToMany(() => ProjectPost, (projectPost) => projectPost.user)
    // projectPost: ProjectPost[];

    // @OneToMany(() => ProjectApplicant, (projectApplicant) => projectApplicant.user)
    // projectApplicant: ProjectApplicant[];

    // @OneToMany((type) => Alarm, (alarm) => alarm.user)
    // alarms: Alarm[];
}
