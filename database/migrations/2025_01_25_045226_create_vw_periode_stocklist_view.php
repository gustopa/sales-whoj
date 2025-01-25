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
        DB::statement("CREATE VIEW `vw_periode_stocklist` AS select `" . env('DB_DATABASE') . "`.`periode_stock`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`periode_stock`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`periode_stock`.`periode` AS `periode`,`" . env('DB_DATABASE') . "`.`periode_stock`.`periode_month` AS `periode_month`,`" . env('DB_DATABASE') . "`.`periode_stock`.`periode_year` AS `periode_year`,`" . env('DB_DATABASE') . "`.`periode_stock`.`status` AS `status`,`" . env('DB_DATABASE') . "`.`periode_stock`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`periode_stock`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`periode_stock`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`periode_stock`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`periode_stock`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`periode_stock`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`periode_stock`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_periode_stocklist`");
    }
};
