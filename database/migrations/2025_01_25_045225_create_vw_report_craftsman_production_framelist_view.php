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
        DB::statement("CREATE VIEW `vw_report_craftsman_production_framelist` AS select `" . env('DB_DATABASE') . "`.`production`.`doc_no` AS `doc_no`,`" . env('DB_DATABASE') . "`.`production`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`production`.`identity_code` AS `identity_code`,`" . env('DB_DATABASE') . "`.`production_frame`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`production_frame`.`craftsman_id` AS `craftsman_id`,`" . env('DB_DATABASE') . "`.`craftsman`.`name` AS `craftsman_id_txt`,`" . env('DB_DATABASE') . "`.`production_frame`.`gold_type_id` AS `gold_type_id`,`" . env('DB_DATABASE') . "`.`gold_type`.`name` AS `gold_type_id_txt`,`" . env('DB_DATABASE') . "`.`production_frame`.`weight` AS `weight`,`" . env('DB_DATABASE') . "`.`production_frame`.`delivery_date` AS `delivery_date`,`" . env('DB_DATABASE') . "`.`production_frame`.`received_date` AS `received_date`,`" . env('DB_DATABASE') . "`.`production_frame`.`remaining` AS `remaining`,`" . env('DB_DATABASE') . "`.`production_frame`.`status` AS `status` from (((`" . env('DB_DATABASE') . "`.`production` join `" . env('DB_DATABASE') . "`.`production_frame` on(`" . env('DB_DATABASE') . "`.`production`.`row_id` = `" . env('DB_DATABASE') . "`.`production_frame`.`row_id` and `" . env('DB_DATABASE') . "`.`production_frame`.`is_deleted` = 0)) join `" . env('DB_DATABASE') . "`.`gold_type` on(`" . env('DB_DATABASE') . "`.`gold_type`.`row_id` = `" . env('DB_DATABASE') . "`.`production_frame`.`gold_type_id`)) join `" . env('DB_DATABASE') . "`.`craftsman` on(`" . env('DB_DATABASE') . "`.`craftsman`.`row_id` = `" . env('DB_DATABASE') . "`.`production_frame`.`craftsman_id`)) where `" . env('DB_DATABASE') . "`.`production`.`is_deleted` = 0 and `" . env('DB_DATABASE') . "`.`production`.`is_submitted` = 1");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_report_craftsman_production_framelist`");
    }
};
