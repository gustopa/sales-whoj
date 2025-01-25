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
        DB::statement("CREATE VIEW `vw_edclist` AS select `" . env('DB_DATABASE') . "`.`edc`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`edc`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`edc`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`edc`.`txt` AS `txt`,`" . env('DB_DATABASE') . "`.`edc`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`edc`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`edc`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`edc`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`edc`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`edc`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`edc`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_edclist`");
    }
};
