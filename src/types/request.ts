import { User } from 'src/users/entities/user.entity';

export type CustomRequest = Request & { user: User };
