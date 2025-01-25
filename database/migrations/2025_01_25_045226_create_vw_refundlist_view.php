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
        DB::statement("CREATE VIEW `vw_refundlist` AS select `" . env('DB_DATABASE') . "`.`refund`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`refund`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`refund`.`doc_no` AS `doc_no`,`" . env('DB_DATABASE') . "`.`refund`.`store_id` AS `store_id`,`" . env('DB_DATABASE') . "`.`store`.`name` AS `store_id_txt`,`" . env('DB_DATABASE') . "`.`refund`.`customer_id` AS `customer_id`,`" . env('DB_DATABASE') . "`.`customer`.`name` AS `customer_id_txt`,`" . env('DB_DATABASE') . "`.`refund`.`sales_id` AS `sales_id`,`" . env('DB_DATABASE') . "`.`sysuser`.`name` AS `sales_id_txt`,`" . env('DB_DATABASE') . "`.`refund`.`trans_date` AS `trans_date`,`" . env('DB_DATABASE') . "`.`refund`.`txt` AS `txt`,`" . env('DB_DATABASE') . "`.`refund`.`status` AS `status`,`" . env('DB_DATABASE') . "`.`refund`.`payment_id` AS `payment_id`,`" . env('DB_DATABASE') . "`.`refund`.`type_refund` AS `type_refund`,`" . env('DB_DATABASE') . "`.`refund`.`potongan` AS `potongan`,`" . env('DB_DATABASE') . "`.`refund`.`amount_invoice` AS `amount_invoice`,`payment`.`doc_no` AS `payment_id_txt`,`payment`.`inventory_id_txt` AS `inventory_id_txt`,`payment`.`identity_code` AS `identity_code`,`" . env('DB_DATABASE') . "`.`refund`.`amount_refund` AS `amount_refund`,`" . env('DB_DATABASE') . "`.`refund`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`refund`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`refund`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`refund`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`refund`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`refund`.`modified_by` AS `modified_by` from ((((`" . env('DB_DATABASE') . "`.`refund` left join `" . env('DB_DATABASE') . "`.`vw_paymentlist` `payment` on(`" . env('DB_DATABASE') . "`.`refund`.`payment_id` = `payment`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`store` on(`" . env('DB_DATABASE') . "`.`refund`.`store_id` = `" . env('DB_DATABASE') . "`.`store`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`customer` on(`" . env('DB_DATABASE') . "`.`refund`.`customer_id` = `" . env('DB_DATABASE') . "`.`customer`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`sysuser` on(`" . env('DB_DATABASE') . "`.`refund`.`sales_id` = `" . env('DB_DATABASE') . "`.`sysuser`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_refundlist`");
    }
};
