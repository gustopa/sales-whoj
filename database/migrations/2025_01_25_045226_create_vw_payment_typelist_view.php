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
        DB::statement("CREATE VIEW `vw_payment_typelist` AS select `" . env('DB_DATABASE') . "`.`payment_type`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`payment_type`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`payment_type`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`payment_type`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`payment_type`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`payment_type`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`payment_type`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`payment_type`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`payment_type`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`payment_type`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_payment_typelist`");
    }
};
