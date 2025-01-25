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
        DB::statement("CREATE VIEW `vw_sysmappingapprovallist` AS select `" . env('DB_DATABASE') . "`.`sysmappingapproval`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysmappingapproval`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`sysmappingapproval`.`init_approval` AS `init_approval`,`" . env('DB_DATABASE') . "`.`sysmappingapproval`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`sysmappingapproval`.`subject_notification` AS `subject_notification`,`" . env('DB_DATABASE') . "`.`sysmappingapproval`.`body_notification` AS `body_notification`,`" . env('DB_DATABASE') . "`.`sysmappingapproval`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`sysmappingapproval`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysmappingapproval`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysmappingapproval`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysmappingapproval`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysmappingapproval`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`sysmappingapproval`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysmappingapprovallist`");
    }
};
