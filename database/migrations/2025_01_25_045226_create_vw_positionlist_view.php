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
        DB::statement("CREATE VIEW `vw_positionlist` AS select `" . env('DB_DATABASE') . "`.`position`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`position`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`position`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`position`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`position`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`position`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`position`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`position`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`position`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`position`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_positionlist`");
    }
};
