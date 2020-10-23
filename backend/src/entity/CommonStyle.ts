import { Column } from 'typeorm';

export class CommonStyle {
  @Column()
  width!: number;

  @Column()
  height!: number;

  @Column()
  zIndex!: number;

  @Column()
  fontSize!: number;

  @Column()
  color!: string;
}
