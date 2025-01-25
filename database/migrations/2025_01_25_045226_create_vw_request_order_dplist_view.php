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
        DB::statement("CREATE VIEW `vw_request_order_dplist` AS select `" . env('DB_DATABASE') . "`.`request_order`.`doc_no` AS `doc_no`,`" . env('DB_DATABASE') . "`.`request_order`.`store_id` AS `store_id`,`" . env('DB_DATABASE') . "`.`store`.`name` AS `store_id_txt`,`" . env('DB_DATABASE') . "`.`request_order`.`customer_id` AS `customer_id`,`" . env('DB_DATABASE') . "`.`customer`.`name` AS `customer_id_txt`,`" . env('DB_DATABASE') . "`.`request_order`.`sales_id` AS `sales_id`,`" . env('DB_DATABASE') . "`.`sysuser`.`name` AS `sales_id_txt`,`" . env('DB_DATABASE') . "`.`request_order`.`trans_date` AS `trans_date`,`" . env('DB_DATABASE') . "`.`request_order`.`estimated_date` AS `estimated_date`,`" . env('DB_DATABASE') . "`.`request_order`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`request_order`.`type_order` AS `type_order`,`" . env('DB_DATABASE') . "`.`request_order`.`qty` AS `qty`,`" . env('DB_DATABASE') . "`.`request_order`.`size` AS `size`,`" . env('DB_DATABASE') . "`.`request_order`.`warna_emas` AS `warna_emas`,`" . env('DB_DATABASE') . "`.`request_order`.`berat_emas` AS `berat_emas`,`" . env('DB_DATABASE') . "`.`request_order`.`kadar_emas` AS `kadar_emas`,`" . env('DB_DATABASE') . "`.`request_order`.`txt` AS `txt`,`" . env('DB_DATABASE') . "`.`request_order`.`notes` AS `notes`,`" . env('DB_DATABASE') . "`.`request_order`.`customer_material` AS `customer_material`,`" . env('DB_DATABASE') . "`.`request_order`.`estimated_price` AS `estimated_price`,`" . env('DB_DATABASE') . "`.`request_order`.`settlement` AS `settlement`,`" . env('DB_DATABASE') . "`.`request_order`.`custom_box` AS `custom_box`,`" . env('DB_DATABASE') . "`.`request_order`.`status` AS `status`,`" . env('DB_DATABASE') . "`.`request_order`.`is_print_dp` AS `is_print_dp`,`" . env('DB_DATABASE') . "`.`request_order`.`photo_file` AS `photo_file`,`" . env('DB_DATABASE') . "`.`request_order_dp`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`request_order_dp`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`request_order_dp`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`request_order_dp`.`dp_date` AS `dp_date`,`" . env('DB_DATABASE') . "`.`request_order_dp`.`down_payment` AS `down_payment`,`" . env('DB_DATABASE') . "`.`request_order_dp`.`dp_ke` AS `dp_ke`,`" . env('DB_DATABASE') . "`.`request_order_dp`.`bukti_dp` AS `bukti_dp`,`" . env('DB_DATABASE') . "`.`request_order_dp`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`request_order_dp`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`request_order_dp`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`request_order_dp`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`request_order_dp`.`modified_by` AS `modified_by` from ((((`" . env('DB_DATABASE') . "`.`request_order_dp` join `" . env('DB_DATABASE') . "`.`request_order` on(`" . env('DB_DATABASE') . "`.`request_order_dp`.`row_id` = `" . env('DB_DATABASE') . "`.`request_order`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`store` on(`" . env('DB_DATABASE') . "`.`request_order`.`store_id` = `" . env('DB_DATABASE') . "`.`store`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`customer` on(`" . env('DB_DATABASE') . "`.`request_order`.`customer_id` = `" . env('DB_DATABASE') . "`.`customer`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`sysuser` on(`" . env('DB_DATABASE') . "`.`request_order`.`sales_id` = `" . env('DB_DATABASE') . "`.`sysuser`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_request_order_dplist`");
    }
};
