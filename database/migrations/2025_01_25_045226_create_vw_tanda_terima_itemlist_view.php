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
        DB::statement("CREATE VIEW `vw_tanda_terima_itemlist` AS select `" . env('DB_DATABASE') . "`.`tanda_terima_item`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`tanda_terima_item`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`tanda_terima_item`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`tanda_terima_item`.`inventory_id` AS `inventory_id`,`inventory`.`name` AS `inventory_name`,`inventory`.`identity_code` AS `inventory_id_txt`,`inventory`.`item_id_txt` AS `item_id_txt`,`inventory`.`item_type_id_txt` AS `item_type_id_txt`,`inventory`.`model_id_txt` AS `model_id_txt`,`" . env('DB_DATABASE') . "`.`tanda_terima_item`.`payment_id` AS `payment_id`,`" . env('DB_DATABASE') . "`.`payment`.`doc_no` AS `payment_id_txt`,`inventory`.`photo_inventory_id_txt` AS `photo_inventory_id_txt`,`" . env('DB_DATABASE') . "`.`tanda_terima_item`.`sertificate_1` AS `sertificate_1`,`" . env('DB_DATABASE') . "`.`tanda_terima_item`.`sertificate_2` AS `sertificate_2`,case when `" . env('DB_DATABASE') . "`.`tanda_terima_item`.`photo` is null then `inventory`.`photo_inventory_id_txt` else `" . env('DB_DATABASE') . "`.`tanda_terima_item`.`photo` end AS `photo`,`" . env('DB_DATABASE') . "`.`tanda_terima_item`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`tanda_terima_item`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`tanda_terima_item`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`tanda_terima_item`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`tanda_terima_item`.`modified_by` AS `modified_by` from ((`" . env('DB_DATABASE') . "`.`tanda_terima_item` left join `" . env('DB_DATABASE') . "`.`vw_inventorylist` `inventory` on(`" . env('DB_DATABASE') . "`.`tanda_terima_item`.`inventory_id` = `inventory`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`payment` on(`" . env('DB_DATABASE') . "`.`tanda_terima_item`.`payment_id` = `" . env('DB_DATABASE') . "`.`payment`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_tanda_terima_itemlist`");
    }
};
