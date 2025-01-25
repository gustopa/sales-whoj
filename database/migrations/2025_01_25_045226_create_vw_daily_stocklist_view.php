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
        DB::statement("CREATE VIEW `vw_daily_stocklist` AS select `" . env('DB_DATABASE') . "`.`daily_stock`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`daily_stock`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`daily_stock`.`trans_date` AS `trans_date`,`" . env('DB_DATABASE') . "`.`daily_stock`.`txt` AS `txt`,`" . env('DB_DATABASE') . "`.`daily_stock`.`grand_total` AS `grand_total`,`" . env('DB_DATABASE') . "`.`daily_stock`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`daily_stock`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`daily_stock`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`daily_stock`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`daily_stock`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`daily_stock`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`daily_stock`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_daily_stocklist`");
    }
};
