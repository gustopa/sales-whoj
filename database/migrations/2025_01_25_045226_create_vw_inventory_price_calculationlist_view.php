<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("CREATE VIEW `vw_inventory_price_calculationlist` AS select `inventory`.`row_id` AS `row_id`,`inventory`.`company_id` AS `company_id`,`inventory`.`identity_code` AS `identity_code`,`inventory`.`name` AS `name`,`inventory`.`store_id` AS `store_id`,`inventory`.`production_cost` AS `production_cost`,`" . env('DB_DATABASE') . "`.`store`.`name` AS `store_id_txt`,`inventory`.`item_type_id` AS `item_type_id`,`" . env('DB_DATABASE') . "`.`item_type`.`name` AS `item_type_id_txt`,`inventory`.`item_id` AS `item_id`,`" . env('DB_DATABASE') . "`.`item`.`name` AS `item_id_txt`,`inventory`.`model_id` AS `model_id`,`" . env('DB_DATABASE') . "`.`model`.`name` AS `model_id_txt`,`inventory`.`location_id` AS `location_id`,`" . env('DB_DATABASE') . "`.`location`.`name` AS `location_id_txt`,`inventory`.`gold_weight` AS `gold_weight`,`inventory`.`gold_grade` AS `gold_grade`,`inventory`.`gold_price` AS `gold_price`,`inventory`.`item_source` AS `item_source`,`inventory`.`photo_inventory_id` AS `photo_inventory_id`,`" . env('DB_DATABASE') . "`.`photo_inventory`.`photo` AS `photo_inventory_id_txt`,`inventory`.`payment_order_id` AS `payment_order_id`,`" . env('DB_DATABASE') . "`.`request_order`.`doc_no` AS `payment_order_id_txt`,`inventory`.`labour_price_id` AS `labour_price_id`,`" . env('DB_DATABASE') . "`.`labour_price`.`name` AS `labour_price_id_txt`,`inventory`.`other_expense` AS `other_expense`,`inventory`.`basic_price_usd` AS `basic_price_usd`,`inventory`.`profit_margin` AS `profit_margin`,`inventory`.`buy_rate` AS `buy_rate`,`inventory`.`sold_rate` AS `sold_rate`,`inventory`.`sell_price` AS `sell_price`,`inventory`.`status` AS `status`,`inventory`.`is_submitted` AS `is_submitted`,`inventory`.`is_deleted` AS `is_deleted`,`inventory`.`created_date` AS `created_date`,`inventory`.`created_by` AS `created_by`,`inventory`.`modified_date` AS `modified_date`,`inventory`.`modified_by` AS `modified_by` from ((((((((`" . env('DB_DATABASE') . "`.`inventory_price_calculation` `inventory` left join `" . env('DB_DATABASE') . "`.`item_type` on(`inventory`.`item_type_id` = `" . env('DB_DATABASE') . "`.`item_type`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`item` on(`inventory`.`item_id` = `" . env('DB_DATABASE') . "`.`item`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`model` on(`inventory`.`model_id` = `" . env('DB_DATABASE') . "`.`model`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`photo_inventory` on(`inventory`.`photo_inventory_id` = `" . env('DB_DATABASE') . "`.`photo_inventory`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`store` on(`" . env('DB_DATABASE') . "`.`store`.`row_id` = `inventory`.`store_id`)) left join `" . env('DB_DATABASE') . "`.`request_order` on(`" . env('DB_DATABASE') . "`.`request_order`.`row_id` = `inventory`.`payment_order_id`)) left join `" . env('DB_DATABASE') . "`.`location` on(`" . env('DB_DATABASE') . "`.`location`.`row_id` = `inventory`.`location_id`)) left join `" . env('DB_DATABASE') . "`.`labour_price` on(`" . env('DB_DATABASE') . "`.`labour_price`.`row_id` = `inventory`.`labour_price_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_inventory_price_calculationlist`");
    }
};
