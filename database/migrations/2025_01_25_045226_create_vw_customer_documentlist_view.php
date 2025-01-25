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
        DB::statement("CREATE VIEW `vw_customer_documentlist` AS select `" . env('DB_DATABASE') . "`.`customer_document`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`customer_document`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`customer_document`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`customer_document`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`customer_document`.`notes` AS `notes`,`" . env('DB_DATABASE') . "`.`customer_document`.`status` AS `status`,`" . env('DB_DATABASE') . "`.`customer_document`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`customer_document`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`customer_document`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`customer_document`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`customer_document`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`customer_document`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_customer_documentlist`");
    }
};
