import {
  Column, Entity, ObjectID, ObjectIdColumn,
} from 'typeorm';
import Element from './Element';

@Entity()
export default class Page {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  pageId!: string;

  @Column()
  name!: string;

  @Column((type) => Element)
  elements: Element[] = [];
}
