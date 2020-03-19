\set on_error_stop 1

begin;
    \i seeds/ingredients.sql;
    \i seeds/recipes.sql;
commit;