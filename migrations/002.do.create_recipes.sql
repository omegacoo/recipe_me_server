drop type diet_name;

create type diet_name as enum ('paleo', 'vegan', 'vegitarian', 'keto', 'south_beach', 'atkins');

create table recipes(
    id integer primary key generated by default as identity,
    title text not null unique,
    description text,
    diet diet_name,
    instructions text not null
);