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
        DB::statement("CREATE VIEW `vw_inventory_out_detaillist` AS select `" . env('DB_DATABASE') . "`.`inventory_out_detail`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`inventory_out_detail`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`inventory_out_detail`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`inventory_out_detail`.`inventory_id` AS `inventory_id`,`inventory`.`identity_code` AS `inventory_id_txt`,`inventory`.`payment_order_id_txt` AS `payment_order_id_txt`,`inventory`.`photo_inventory_id_txt` AS `photo_inventory_id_txt`,`inventory`.`item_id_txt` AS `item_id_txt`,`" . env('DB_DATABASE') . "`.`inventory_out_detail`.`request_order_id` AS `request_order_id`,`request_order`.`name` AS `request_order_id_txt`,`" . env('DB_DATABASE') . "`.`inventory_out_detail`.`status` AS `status`,`" . env('DB_DATABASE') . "`.`inventory_out_detail`.`received_date` AS `received_date`,`" . env('DB_DATABASE') . "`.`inventory_out_detail`.`notes` AS `notes`,`" . env('DB_DATABASE') . "`.`inventory_out_detail`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`inventory_out_detail`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`inventory_out_detail`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`inventory_out_detail`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`inventory_out_detail`.`modified_by` AS `modified_by` from ((`" . env('DB_DATABASE') . "`.`inventory_out_detail` left join `" . env('DB_DATABASE') . "`.`vw_inventorylist` `inventory` on(`" . env('DB_DATABASE') . "`.`inventory_out_detail`.`inventory_id` = `inventory`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`vw_request_orderlist` `request_order` on(`" . env('DB_DATABASE') . "`.`inventory_out_detail`.`request_order_id` = `request_order`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_inventory_out_detaillist`");
    }
};
