drop type if exists food_category;

create type food_category as enum ( 'dairy', 
                                    'meat', 
                                    'grain', 
                                    'fruit', 
                                    'vegetable',
                                    'other');

create table ingredients(
    id integer primary key generated by default as identity,
    title text not null unique,
    category food_category
);