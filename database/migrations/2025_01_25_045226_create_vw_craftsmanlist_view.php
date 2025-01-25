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
        DB::statement("CREATE VIEW `vw_craftsmanlist` AS select `" . env('DB_DATABASE') . "`.`craftsman`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`craftsman`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`craftsman`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`craftsman`.`rate_hour` AS `rate_hour`,`" . env('DB_DATABASE') . "`.`craftsman`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`craftsman`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`craftsman`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`craftsman`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`craftsman`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`craftsman`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`craftsman`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_craftsmanlist`");
    }
};
