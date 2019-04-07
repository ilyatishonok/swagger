import { schema } from 'normalizr';

export const jogSchema = new schema.Entity('jogs');
export const jogsSchema = new schema.Array(jogSchema);