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
        DB::statement("CREATE VIEW `vw_exratelist` AS select `" . env('DB_DATABASE') . "`.`exrate`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`exrate`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`exrate`.`rate_jual` AS `rate_jual`,`" . env('DB_DATABASE') . "`.`exrate`.`rate_beli` AS `rate_beli`,`" . env('DB_DATABASE') . "`.`exrate`.`profit_margin` AS `profit_margin`,`" . env('DB_DATABASE') . "`.`exrate`.`gold_price` AS `gold_price`,`" . env('DB_DATABASE') . "`.`exrate`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`exrate`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`exrate`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`exrate`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`exrate`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`exrate`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`exrate`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_exratelist`");
    }
};
