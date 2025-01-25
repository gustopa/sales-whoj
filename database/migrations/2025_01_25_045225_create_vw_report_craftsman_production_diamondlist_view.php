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
        DB::statement("CREATE VIEW `vw_report_craftsman_production_diamondlist` AS select `" . env('DB_DATABASE') . "`.`production`.`doc_no` AS `doc_no`,`" . env('DB_DATABASE') . "`.`production`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`production`.`identity_code` AS `identity_code`,`" . env('DB_DATABASE') . "`.`production_diamond`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`production_diamond`.`craftsman_id` AS `craftsman_id`,`" . env('DB_DATABASE') . "`.`craftsman`.`name` AS `craftsman_id_txt`,`" . env('DB_DATABASE') . "`.`production_diamond`.`diamond_type_id` AS `diamond_type_id`,`" . env('DB_DATABASE') . "`.`diamond_type`.`name` AS `diamond_type_id_txt`,`" . env('DB_DATABASE') . "`.`production_diamond`.`pcs` AS `pcs`,`" . env('DB_DATABASE') . "`.`production_diamond`.`crt` AS `crt`,`" . env('DB_DATABASE') . "`.`production_diamond`.`remaining_pcs` AS `remaining_pcs`,`" . env('DB_DATABASE') . "`.`production_diamond`.`remaining_crt` AS `remaining_crt`,`" . env('DB_DATABASE') . "`.`production_diamond`.`delivery_date` AS `delivery_date`,`" . env('DB_DATABASE') . "`.`production_diamond`.`received_date` AS `received_date`,`" . env('DB_DATABASE') . "`.`production_diamond`.`status` AS `status` from (((`" . env('DB_DATABASE') . "`.`production` join `" . env('DB_DATABASE') . "`.`production_diamond` on(`" . env('DB_DATABASE') . "`.`production`.`row_id` = `" . env('DB_DATABASE') . "`.`production_diamond`.`row_id` and `" . env('DB_DATABASE') . "`.`production_diamond`.`is_deleted` = 0)) join `" . env('DB_DATABASE') . "`.`diamond_type` on(`" . env('DB_DATABASE') . "`.`diamond_type`.`row_id` = `" . env('DB_DATABASE') . "`.`production_diamond`.`diamond_type_id`)) join `" . env('DB_DATABASE') . "`.`craftsman` on(`" . env('DB_DATABASE') . "`.`craftsman`.`row_id` = `" . env('DB_DATABASE') . "`.`production_diamond`.`craftsman_id`)) where `" . env('DB_DATABASE') . "`.`production`.`is_deleted` = 0 and `" . env('DB_DATABASE') . "`.`production`.`is_submitted` = 1");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_report_craftsman_production_diamondlist`");
    }
};
