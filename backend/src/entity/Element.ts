import {
  Column, Entity, ObjectID, ObjectIdColumn,
} from 'typeorm';
import CommonStyle from './CommonStyle';
import PropsValue from './PropsValue';

@Entity()
export default class Element {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  elementId!: string;

  @Column()
  elementName!: string;

  @Column()
  value!: string;

  @Column()
  valueType!: string;

  @Column()
  events!: [];

  @Column((type) => CommonStyle)
  commonStyle: CommonStyle = new CommonStyle();

  @Column((type) => PropsValue)
  propsValue: PropsValue = new PropsValue();
}
