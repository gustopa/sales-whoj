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
        DB::statement("CREATE VIEW `vw_production_framelist` AS select `" . env('DB_DATABASE') . "`.`production_frame`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`production_frame`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`production_frame`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`production_frame`.`period` AS `period`,`" . env('DB_DATABASE') . "`.`production_frame`.`period_received` AS `period_received`,`" . env('DB_DATABASE') . "`.`production_frame`.`work_no` AS `work_no`,`" . env('DB_DATABASE') . "`.`production_frame`.`craftsman_id` AS `craftsman_id`,`" . env('DB_DATABASE') . "`.`craftsman`.`name` AS `craftsman_id_txt`,`" . env('DB_DATABASE') . "`.`production_frame`.`gold_type_id` AS `gold_type_id`,`" . env('DB_DATABASE') . "`.`gold_type`.`name` AS `gold_type_id_txt`,`" . env('DB_DATABASE') . "`.`production_frame`.`weight` AS `weight`,`" . env('DB_DATABASE') . "`.`production_frame`.`delivery_date` AS `delivery_date`,`" . env('DB_DATABASE') . "`.`production_frame`.`received_date` AS `received_date`,`" . env('DB_DATABASE') . "`.`production_frame`.`remaining` AS `remaining`,`" . env('DB_DATABASE') . "`.`production_frame`.`photo` AS `photo`,`" . env('DB_DATABASE') . "`.`production_frame`.`status` AS `status`,`" . env('DB_DATABASE') . "`.`production_frame`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`production_frame`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`production_frame`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`production_frame`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`production_frame`.`modified_by` AS `modified_by` from ((`" . env('DB_DATABASE') . "`.`production_frame` left join `" . env('DB_DATABASE') . "`.`craftsman` on(`" . env('DB_DATABASE') . "`.`production_frame`.`craftsman_id` = `" . env('DB_DATABASE') . "`.`craftsman`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`gold_type` on(`" . env('DB_DATABASE') . "`.`production_frame`.`gold_type_id` = `" . env('DB_DATABASE') . "`.`gold_type`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_production_framelist`");
    }
};
