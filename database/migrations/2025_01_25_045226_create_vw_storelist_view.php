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
        DB::statement("CREATE VIEW `vw_storelist` AS select `" . env('DB_DATABASE') . "`.`store`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`store`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`store`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`store`.`address` AS `address`,`" . env('DB_DATABASE') . "`.`store`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`store`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`store`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`store`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`store`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`store`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`store`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_storelist`");
    }
};
