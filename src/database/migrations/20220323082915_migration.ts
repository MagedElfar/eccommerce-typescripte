export const up = function (knex:any) {
    return knex.schema
        .createTable("users", function (table:any) {
            table.increments();
            table.string("username").unique().notNullable();
            table.string("email").unique().notNullable();
            table.string("password").notNullable();
            table.string("profile_picture").nullable();
            table.enu("role" , ["admin" , "customer" , "corporate"]).notNullable().defaultTo("customer");
            table.timestamps(true, true);
        })
        .createTable("contacts", function (table:any) {
            table.increments();
            table.string("phone").notNullable();
            table.integer("user").unsigned();
            table.timestamps(true, true);
            table.foreign("user").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
        })
        .createTable("addresses", function (table:any) {
            table.increments();
            table.enu("type" , ["billing" , "shipping"]).notNullable().defaultTo("shipping");
            table.string("address_1").notNullable();
            table.string("address_2").nullable();
            table.integer("user").unsigned();
            table.string("country").notNullable();
            table.string("city").notNullable();
            table.string("state").nullable();
            table.string("zip_postal_code").notNullable();
            table.timestamps(true, true);
            table.foreign("user").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
        })
        .createTable("categories", function (table:any) {
            table.increments();
            table.string("name").notNullable();
            table.timestamps(true, true);
        })
        .createTable("products", function (table:any) {
            table.increments();
            table.string("title").notNullable();
            table.string("sku").unique().notNullable();
            table.string("description").nullable();
            table.integer("category").unsigned();
            table.integer("quantity").notNullable();            
            table.decimal("price" , 10 , 2).notNullable();
            table.foreign("category").references("id").inTable("categories").onUpdate("CASCADE").onDelete("SET NULL");
            table.timestamps(true, true);
        })
        .createTable("product_images", function (table:any) {
            table.increments();
            table.string("image").notNullable();
            table.integer("product").unsigned();
            table.timestamps(true, true);
            table.foreign("product").references("id").inTable("products").onUpdate("CASCADE").onDelete("CASCADE");
        })
        .then(console.log("tables are created"));
    };

export const down = function (knex:any) {
return knex.schema
    .dropTable("users")
    .dropTable("contacts")
    .dropTable("addresses")
};
