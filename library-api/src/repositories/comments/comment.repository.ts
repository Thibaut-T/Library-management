import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from '../../entities';

@Injectable()
export class CommentRepository extends Repository<Comment> {
    constructor(public readonly dataSource: DataSource) {
        super(Comment, dataSource.createEntityManager());
    }
};