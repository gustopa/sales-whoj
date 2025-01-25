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
        DB::statement("CREATE VIEW `vw_production_frame_finishedlist` AS select `" . env('DB_DATABASE') . "`.`production_frame_finished`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`production_frame_finished`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`production_frame_finished`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`production_frame_finished`.`period` AS `period`,`" . env('DB_DATABASE') . "`.`production_frame_finished`.`frame_no` AS `frame_no`,`" . env('DB_DATABASE') . "`.`production_frame_finished`.`frame_type_id` AS `frame_type_id`,`" . env('DB_DATABASE') . "`.`frame_type`.`name` AS `frame_type_id_txt`,`" . env('DB_DATABASE') . "`.`production_frame_finished`.`weight` AS `weight`,`" . env('DB_DATABASE') . "`.`production_frame_finished`.`photo` AS `photo`,`" . env('DB_DATABASE') . "`.`production_frame_finished`.`status` AS `status`,`" . env('DB_DATABASE') . "`.`production_frame_finished`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`production_frame_finished`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`production_frame_finished`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`production_frame_finished`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`production_frame_finished`.`modified_by` AS `modified_by` from (`" . env('DB_DATABASE') . "`.`production_frame_finished` left join `" . env('DB_DATABASE') . "`.`frame_type` on(`" . env('DB_DATABASE') . "`.`production_frame_finished`.`frame_type_id` = `" . env('DB_DATABASE') . "`.`frame_type`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_production_frame_finishedlist`");
    }
};
