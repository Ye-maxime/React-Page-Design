import {
  Column, Entity, ObjectID, ObjectIdColumn,
} from 'typeorm';
import Page from './Page';

@Entity()
export default class Project {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  projectId!: string;

  @Column()
  name!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  script!: string;

  @Column()
  width!: number;

  @Column()
  height!: number;

  @Column((type) => Page)
  pages: Page[] = [];
}
