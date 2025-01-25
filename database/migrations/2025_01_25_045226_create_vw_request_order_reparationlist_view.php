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
        DB::statement("CREATE VIEW `vw_request_order_reparationlist` AS select `" . env('DB_DATABASE') . "`.`request_order_reparation`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`request_order_reparation`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`request_order_reparation`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`request_order`.`doc_no` AS `doc_no`,`" . env('DB_DATABASE') . "`.`customer`.`name` AS `customer_name`,`" . env('DB_DATABASE') . "`.`request_order`.`name` AS `reparation`,`" . env('DB_DATABASE') . "`.`request_order_reparation`.`amount_txt` AS `amount_txt`,`" . env('DB_DATABASE') . "`.`request_order_reparation`.`amount_type` AS `amount_type`,`" . env('DB_DATABASE') . "`.`request_order_reparation`.`amount` AS `amount`,`" . env('DB_DATABASE') . "`.`request_order_reparation`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`request_order_reparation`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`request_order_reparation`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`request_order_reparation`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`request_order_reparation`.`modified_by` AS `modified_by` from ((`" . env('DB_DATABASE') . "`.`request_order_reparation` join `" . env('DB_DATABASE') . "`.`request_order` on(`" . env('DB_DATABASE') . "`.`request_order_reparation`.`row_id` = `" . env('DB_DATABASE') . "`.`request_order`.`row_id`)) join `" . env('DB_DATABASE') . "`.`customer` on(`" . env('DB_DATABASE') . "`.`customer`.`row_id` = `" . env('DB_DATABASE') . "`.`request_order`.`customer_id`)) where `" . env('DB_DATABASE') . "`.`request_order`.`type_order` = 'REPARASI'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_request_order_reparationlist`");
    }
};
