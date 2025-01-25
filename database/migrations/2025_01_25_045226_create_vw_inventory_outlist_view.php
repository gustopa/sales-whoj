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
        DB::statement("CREATE VIEW `vw_inventory_outlist` AS select `" . env('DB_DATABASE') . "`.`inventory_out`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`inventory_out`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`inventory_out`.`doc_no` AS `doc_no`,`" . env('DB_DATABASE') . "`.`inventory_out`.`trans_date` AS `trans_date`,`" . env('DB_DATABASE') . "`.`inventory_out`.`out_from` AS `out_from`,`store_out`.`name` AS `out_from_txt`,`" . env('DB_DATABASE') . "`.`inventory_out`.`in_to` AS `in_to`,`store_in`.`name` AS `in_to_txt`,`" . env('DB_DATABASE') . "`.`inventory_out`.`notes` AS `notes`,`" . env('DB_DATABASE') . "`.`inventory_out`.`status` AS `status`,`" . env('DB_DATABASE') . "`.`inventory_out`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`inventory_out`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`inventory_out`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`inventory_out`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`inventory_out`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`inventory_out`.`modified_by` AS `modified_by` from ((`" . env('DB_DATABASE') . "`.`inventory_out` left join `" . env('DB_DATABASE') . "`.`store` `store_out` on(`" . env('DB_DATABASE') . "`.`inventory_out`.`out_from` = `store_out`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`store` `store_in` on(`" . env('DB_DATABASE') . "`.`inventory_out`.`in_to` = `store_in`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_inventory_outlist`");
    }
};
