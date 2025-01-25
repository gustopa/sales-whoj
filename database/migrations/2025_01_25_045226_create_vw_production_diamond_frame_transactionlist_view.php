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
        DB::statement("CREATE VIEW `vw_production_diamond_frame_transactionlist` AS select `" . env('DB_DATABASE') . "`.`production_diamond_frame`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`production`.`doc_no` AS `doc_no`,`" . env('DB_DATABASE') . "`.`production`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`period` AS `period`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`work_no` AS `work_no`,'Pemasangan batu - serah rangka' AS `work_name`,'Serah' AS `work_type`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`craftsman_id` AS `craftsman_id`,`" . env('DB_DATABASE') . "`.`craftsman`.`name` AS `craftsman_id_txt`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`frame_no` AS `frame_no`,`" . env('DB_DATABASE') . "`.`production_frame_finished`.`frame_no` AS `frame_no_txt`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`weight` * -1 AS `weight`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`delivery_date` AS `trans_date` from (((`" . env('DB_DATABASE') . "`.`production` join `" . env('DB_DATABASE') . "`.`production_diamond_frame` on(`" . env('DB_DATABASE') . "`.`production`.`row_id` = `" . env('DB_DATABASE') . "`.`production_diamond_frame`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`craftsman` on(`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`craftsman_id` = `" . env('DB_DATABASE') . "`.`craftsman`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`production_frame_finished` on(`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`frame_no` = `" . env('DB_DATABASE') . "`.`production_frame_finished`.`line_id`)) where `" . env('DB_DATABASE') . "`.`production`.`is_deleted` = 0 and `" . env('DB_DATABASE') . "`.`production`.`is_submitted` = 1 and `" . env('DB_DATABASE') . "`.`production_diamond_frame`.`is_deleted` = 0 union all select `" . env('DB_DATABASE') . "`.`production_diamond_frame`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`production`.`doc_no` AS `doc_no`,`" . env('DB_DATABASE') . "`.`production`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`period_received` AS `period`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`work_no` AS `work_no`,'Pemasangan batu - serah rangka' AS `work_name`,'Serah' AS `work_type`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`craftsman_id` AS `craftsman_id`,`" . env('DB_DATABASE') . "`.`craftsman`.`name` AS `craftsman_id_txt`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`frame_no` AS `frame_no`,`" . env('DB_DATABASE') . "`.`production_frame_finished`.`frame_no` AS `frame_no_txt`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`received_weight` AS `weight`,`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`received_date` AS `trans_date` from (((`" . env('DB_DATABASE') . "`.`production` join `" . env('DB_DATABASE') . "`.`production_diamond_frame` on(`" . env('DB_DATABASE') . "`.`production`.`row_id` = `" . env('DB_DATABASE') . "`.`production_diamond_frame`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`craftsman` on(`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`craftsman_id` = `" . env('DB_DATABASE') . "`.`craftsman`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`production_frame_finished` on(`" . env('DB_DATABASE') . "`.`production_diamond_frame`.`frame_no` = `" . env('DB_DATABASE') . "`.`production_frame_finished`.`line_id`)) where `" . env('DB_DATABASE') . "`.`production`.`is_deleted` = 0 and `" . env('DB_DATABASE') . "`.`production`.`is_submitted` = 1 and `" . env('DB_DATABASE') . "`.`production_diamond_frame`.`is_deleted` = 0");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_production_diamond_frame_transactionlist`");
    }
};
