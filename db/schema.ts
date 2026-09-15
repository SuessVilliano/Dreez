import {sqliteTable,text,integer,index} from 'drizzle-orm/sqlite-core';
export const subscribers=sqliteTable('subscribers',{email:text('email').primaryKey(),name:text('name').notNull(),source:text('source').notNull(),created:text('created').notNull()});
export const bookings=sqliteTable('bookings',{id:text('id').primaryKey(),name:text('name').notNull(),email:text('email').notNull(),date:text('date').notNull(),venue:text('venue').notNull(),budget:text('budget').notNull(),details:text('details').notNull(),created:text('created').notNull()});
export const events=sqliteTable('events',{id:text('id').primaryKey(),payload:text('payload').notNull(),starts:text('starts').notNull(),ends:text('ends').notNull()},t=>[index('idx_events_ends').on(t.ends)]);
export const settings=sqliteTable('settings',{key:text('key').primaryKey(),value:text('value').notNull()});
export const limits=sqliteTable('limits',{key:text('key').primaryKey(),count:integer('count').notNull(),expires:integer('expires').notNull()});
export const fanActions=sqliteTable('fan_actions',{id:text('id').primaryKey(),type:text('type').notNull(),name:text('name').notNull(),email:text('email').notNull(),payload:text('payload').notNull(),created:text('created').notNull()},t=>[index('idx_fan_actions_type_created').on(t.type,t.created)]);
