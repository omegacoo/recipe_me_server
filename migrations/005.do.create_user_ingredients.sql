create table user_ingredients(
    ingredient_id integer references ingredients(id) on delete cascade not null,
    user_id integer references users(id) on delete cascade not null
);