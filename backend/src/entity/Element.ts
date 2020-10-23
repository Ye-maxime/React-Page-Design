import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { CommonStyle } from './CommonStyle';
// import { PropsValue } from './PropsValue';

@Entity()
export class Element {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  elementName!: string;

  @Column()
  value!: string;

  @Column()
  valueType!: string;

  @Column((type) => CommonStyle)
  commonStyle: CommonStyle = new CommonStyle();

  //   @Column((type) => PropsValue)
  //   propsValue: PropsValue;
}
