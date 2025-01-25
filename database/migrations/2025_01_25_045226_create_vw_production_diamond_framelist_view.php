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
        DB::statement("CREATE VIEW `vw_production_diamond_framelist` AS select `" . env('DB_DATABASE') . "`.`production_diamond_frame`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`period` AS `period`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`work_no` AS `work_no`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`craftsman_id` AS `craftsman_id`,`" . env('DB_DATABASE') . "`.`craftsman`.`name` AS `craftsman_id_txt`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`frame_no` AS `frame_no`,`" . env('DB_DATABASE') . "`.`production_frame_finished`.`frame_no` AS `frame_no_txt`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`delivery_date` AS `delivery_date`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`weight` AS `weight`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`period_received` AS `period_received`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`received_date` AS `received_date`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`received_weight` AS `received_weight`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`photo` AS `photo`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`status` AS `status`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`modified_by` AS `modified_by` from ((`" . env('DB_DATABASE') . "`.`production_diamond_frame` left join `" . env('DB_DATABASE') . "`.`craftsman` on(`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`craftsman_id` = `" . env('DB_DATABASE') . "`.`craftsman`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`production_frame_finished` on(`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`frame_no` = `" . env('DB_DATABASE') . "`.`production_frame_finished`.`line_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_production_diamond_framelist`");
    }
};
