import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Element } from './Element';

@Entity()
export class Page {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  name!: string;

  @Column((type) => Element)
  elements: Element[] = [];
}
