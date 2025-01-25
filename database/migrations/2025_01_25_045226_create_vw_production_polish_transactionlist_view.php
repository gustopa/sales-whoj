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
        DB::statement("CREATE VIEW `vw_production_polish_transactionlist` AS select `" . env('DB_DATABASE') . "`.`production_polish`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`production_polish`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`production`.`doc_no` AS `doc_no`,`" . env('DB_DATABASE') . "`.`production`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`production_polish`.`period` AS `period`,`" . env('DB_DATABASE') . "`.`production_polish`.`work_no` AS `work_no`,'Proses poles' AS `work_name`,'Serah' AS `work_type`,`" . env('DB_DATABASE') . "`.`production_polish`.`craftsman_id` AS `craftsman_id`,`" . env('DB_DATABASE') . "`.`craftsman`.`name` AS `craftsman_id_txt`,`" . env('DB_DATABASE') . "`.`production_polish`.`poles` AS `poles`,`" . env('DB_DATABASE') . "`.`production_polish`.`frame_no` AS `frame_no`,`" . env('DB_DATABASE') . "`.`frame_type`.`name` AS `frame_no_txt`,`" . env('DB_DATABASE') . "`.`production_polish`.`weight` * -1 AS `weight`,`" . env('DB_DATABASE') . "`.`production_polish`.`delivery_date` AS `trans_date` from ((((`" . env('DB_DATABASE') . "`.`production` left join `" . env('DB_DATABASE') . "`.`production_polish` on(`" . env('DB_DATABASE') . "`.`production_polish`.`row_id` = `" . env('DB_DATABASE') . "`.`production`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`craftsman` on(`" . env('DB_DATABASE') . "`.`production_polish`.`craftsman_id` = `" . env('DB_DATABASE') . "`.`craftsman`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`production_frame_finished` on(`" . env('DB_DATABASE') . "`.`production_polish`.`frame_no` = `" . env('DB_DATABASE') . "`.`production_frame_finished`.`frame_no`)) left join `" . env('DB_DATABASE') . "`.`frame_type` on(`" . env('DB_DATABASE') . "`.`frame_type`.`row_id` = `" . env('DB_DATABASE') . "`.`production_frame_finished`.`frame_type_id`)) where `" . env('DB_DATABASE') . "`.`production`.`is_deleted` = 0 and `" . env('DB_DATABASE') . "`.`production`.`is_submitted` = 1 and `" . env('DB_DATABASE') . "`.`production_polish`.`is_deleted` = 0");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_production_polish_transactionlist`");
    }
};
