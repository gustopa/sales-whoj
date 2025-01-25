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
        DB::statement("CREATE VIEW `vw_citylist` AS select `" . env('DB_DATABASE') . "`.`city`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`city`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`city`.`province_name` AS `province_name`,`" . env('DB_DATABASE') . "`.`city`.`city_name` AS `city_name`,`" . env('DB_DATABASE') . "`.`city`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`city`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`city`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`city`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`city`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`city`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`city`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_citylist`");
    }
};
