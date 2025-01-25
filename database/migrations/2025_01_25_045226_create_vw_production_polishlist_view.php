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
        DB::statement("CREATE VIEW `vw_production_polishlist` AS select `" . env('DB_DATABASE') . "`.`production_polish`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`production_polish`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`production_polish`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`production_polish`.`period` AS `period`,`" . env('DB_DATABASE') . "`.`production_polish`.`period_received` AS `period_received`,`" . env('DB_DATABASE') . "`.`production_polish`.`work_no` AS `work_no`,`" . env('DB_DATABASE') . "`.`production_polish`.`craftsman_id` AS `craftsman_id`,`" . env('DB_DATABASE') . "`.`craftsman`.`name` AS `craftsman_id_txt`,`" . env('DB_DATABASE') . "`.`production_polish`.`poles` AS `poles`,`" . env('DB_DATABASE') . "`.`production_polish`.`frame_no` AS `frame_no`,`" . env('DB_DATABASE') . "`.`frame_type`.`name` AS `frame_no_txt`,`" . env('DB_DATABASE') . "`.`production_polish`.`weight` AS `weight`,`" . env('DB_DATABASE') . "`.`production_polish`.`received_weight` AS `received_weight`,`" . env('DB_DATABASE') . "`.`production_polish`.`delivery_date` AS `delivery_date`,`" . env('DB_DATABASE') . "`.`production_polish`.`received_date` AS `received_date`,`" . env('DB_DATABASE') . "`.`production_polish`.`photo` AS `photo`,`" . env('DB_DATABASE') . "`.`production_polish`.`status` AS `status`,`" . env('DB_DATABASE') . "`.`production_polish`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`production_polish`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`production_polish`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`production_polish`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`production_polish`.`modified_by` AS `modified_by` from (((`" . env('DB_DATABASE') . "`.`production_polish` left join `" . env('DB_DATABASE') . "`.`craftsman` on(`" . env('DB_DATABASE') . "`.`production_polish`.`craftsman_id` = `" . env('DB_DATABASE') . "`.`craftsman`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`production_frame_finished` on(`" . env('DB_DATABASE') . "`.`production_polish`.`frame_no` = `" . env('DB_DATABASE') . "`.`production_frame_finished`.`frame_no`)) left join `" . env('DB_DATABASE') . "`.`frame_type` on(`" . env('DB_DATABASE') . "`.`frame_type`.`row_id` = `" . env('DB_DATABASE') . "`.`production_frame_finished`.`frame_type_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_production_polishlist`");
    }
};
