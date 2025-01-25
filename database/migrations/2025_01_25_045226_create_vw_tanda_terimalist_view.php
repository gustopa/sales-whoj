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
        DB::statement("CREATE VIEW `vw_tanda_terimalist` AS select `" . env('DB_DATABASE') . "`.`tanda_terima`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`tanda_terima`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`tanda_terima`.`doc_no` AS `doc_no`,`" . env('DB_DATABASE') . "`.`tanda_terima`.`trans_date` AS `trans_date`,`" . env('DB_DATABASE') . "`.`tanda_terima`.`customer_id` AS `customer_id`,`" . env('DB_DATABASE') . "`.`customer`.`name` AS `customer_id_txt`,`" . env('DB_DATABASE') . "`.`tanda_terima`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`tanda_terima`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`tanda_terima`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`tanda_terima`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`tanda_terima`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`tanda_terima`.`modified_by` AS `modified_by` from (`" . env('DB_DATABASE') . "`.`tanda_terima` left join `" . env('DB_DATABASE') . "`.`customer` on(`" . env('DB_DATABASE') . "`.`tanda_terima`.`customer_id` = `" . env('DB_DATABASE') . "`.`customer`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_tanda_terimalist`");
    }
};
