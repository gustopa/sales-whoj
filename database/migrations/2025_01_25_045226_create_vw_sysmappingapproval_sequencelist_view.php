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
        DB::statement("CREATE VIEW `vw_sysmappingapproval_sequencelist` AS select `" . env('DB_DATABASE') . "`.`sysmappingapproval_sequence`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`sysmappingapproval_sequence`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysmappingapproval_sequence`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`sysmappingapproval_sequence`.`seq` AS `seq`,`" . env('DB_DATABASE') . "`.`sysmappingapproval_sequence`.`approval_type` AS `approval_type`,`" . env('DB_DATABASE') . "`.`sysmappingapproval_sequence`.`employee_id` AS `employee_id`,`" . env('DB_DATABASE') . "`.`sysemployee`.`name` AS `employee_id_txt`,`" . env('DB_DATABASE') . "`.`sysmappingapproval_sequence`.`approvalgroup_id` AS `approvalgroup_id`,`" . env('DB_DATABASE') . "`.`sysgroupapproval`.`name` AS `approvalgroup_id_txt`,`" . env('DB_DATABASE') . "`.`sysmappingapproval_sequence`.`approvalgroup_type` AS `approvalgroup_type`,`" . env('DB_DATABASE') . "`.`sysmappingapproval_sequence`.`rejection_type` AS `rejection_type`,`" . env('DB_DATABASE') . "`.`sysmappingapproval_sequence`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysmappingapproval_sequence`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysmappingapproval_sequence`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysmappingapproval_sequence`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysmappingapproval_sequence`.`modified_by` AS `modified_by` from ((`" . env('DB_DATABASE') . "`.`sysmappingapproval_sequence` left join `" . env('DB_DATABASE') . "`.`sysemployee` on(`" . env('DB_DATABASE') . "`.`sysmappingapproval_sequence`.`employee_id` = `" . env('DB_DATABASE') . "`.`sysemployee`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`sysgroupapproval` on(`" . env('DB_DATABASE') . "`.`sysmappingapproval_sequence`.`approvalgroup_id` = `" . env('DB_DATABASE') . "`.`sysgroupapproval`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysmappingapproval_sequencelist`");
    }
};
