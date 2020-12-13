import { Column } from 'typeorm';

export default class PropsValue {
  @Column()
  text!: string;

  @Column()
  placeholder!: string;
}
