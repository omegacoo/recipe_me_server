create table recipes_ingredients(
    recipe_id integer references recipes(id) on delete cascade not null,
    ingredient_id integer references ingredients(id) on delete cascade not null,
    unit text not null,
    quantity integer not null
);