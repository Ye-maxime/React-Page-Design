import { Column } from 'typeorm';

export class PropsValue {
  @Column()
  text!: string;

  @Column()
  placeholder!: string;
}
