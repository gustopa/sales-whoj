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
        DB::statement("CREATE VIEW `vw_sysgroupapprovallist` AS select `" . env('DB_DATABASE') . "`.`sysgroupapproval`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysgroupapproval`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`sysgroupapproval`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`sysgroupapproval`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`sysgroupapproval`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysgroupapproval`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysgroupapproval`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysgroupapproval`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysgroupapproval`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`sysgroupapproval`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysgroupapprovallist`");
    }
};
