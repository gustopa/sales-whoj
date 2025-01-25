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
        DB::statement("CREATE VIEW `vw_inventoryprintlist` AS select `inventory`.`row_id` AS `row_id`,`inventory`.`company_id` AS `company_id`,`inventory`.`identity_code` AS `identity_code`,`inventory`.`name` AS `name`,`inventory`.`item_type_id` AS `item_type_id`,`" . env('DB_DATABASE') . "`.`item_type`.`name` AS `item_type_id_txt`,`inventory`.`item_id` AS `item_id`,`" . env('DB_DATABASE') . "`.`item`.`name` AS `item_id_txt`,`inventory`.`model_id` AS `model_id`,`" . env('DB_DATABASE') . "`.`model`.`name` AS `model_id_txt`,`inventory`.`gold_weight` AS `gold_weight`,`inventory`.`gold_grade` AS `gold_grade`,`inventory`.`photo_inventory_id` AS `photo_inventory_id`,`inventory`.`photo_inventory_id_txt` AS `photo_inventory_id_txt`,`inventory`.`item_source` AS `item_source`,`inventory`.`basic_price_usd` AS `basic_price_usd`,`inventory`.`profit_margin` AS `profit_margin`,`inventory`.`buy_rate` AS `buy_rate`,`inventory`.`sold_rate` AS `sold_rate`,`inventory`.`sell_price` AS `sell_price`,`inventory`.`status` AS `status`,`inventory`.`ses_id` AS `ses_id`,`inventory`.`is_submitted` AS `is_submitted`,`inventory`.`is_deleted` AS `is_deleted`,`inventory`.`created_date` AS `created_date`,`inventory`.`created_by` AS `created_by`,`inventory`.`modified_date` AS `modified_date`,`inventory`.`modified_by` AS `modified_by`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`grain` AS `grain`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`grade` AS `grade`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`karat_perbutir` AS `karat_perbutir`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`diamond_type` AS `diamond_type` from ((((`" . env('DB_DATABASE') . "`.`vw_inventorylist` `inventory` left join `" . env('DB_DATABASE') . "`.`item_type` on(`inventory`.`item_type_id` = `" . env('DB_DATABASE') . "`.`item_type`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`item` on(`inventory`.`item_id` = `" . env('DB_DATABASE') . "`.`item`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`model` on(`inventory`.`model_id` = `" . env('DB_DATABASE') . "`.`model`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`inventory_diamond` on(`" . env('DB_DATABASE') . "`.`inventory_diamond`.`row_id` = `inventory`.`row_id`)) where ifnull(`inventory`.`ses_id`,'') <> ''");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_inventoryprintlist`");
    }
};
