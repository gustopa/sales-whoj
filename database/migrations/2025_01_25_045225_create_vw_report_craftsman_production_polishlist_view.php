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
        DB::statement("CREATE VIEW `vw_report_craftsman_production_polishlist` AS select `" . env('DB_DATABASE') . "`.`production`.`doc_no` AS `doc_no`,`" . env('DB_DATABASE') . "`.`production`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`production`.`identity_code` AS `identity_code`,`" . env('DB_DATABASE') . "`.`production_polish`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`production_polish`.`craftsman_id` AS `craftsman_id`,`" . env('DB_DATABASE') . "`.`craftsman`.`name` AS `craftsman_id_txt`,`" . env('DB_DATABASE') . "`.`production_polish`.`poles` AS `poles`,`" . env('DB_DATABASE') . "`.`production_polish`.`weight` AS `weight`,`" . env('DB_DATABASE') . "`.`production_polish`.`received_weight` AS `received_weight`,`" . env('DB_DATABASE') . "`.`production_polish`.`delivery_date` AS `delivery_date`,`" . env('DB_DATABASE') . "`.`production_polish`.`received_date` AS `received_date`,`" . env('DB_DATABASE') . "`.`production_polish`.`status` AS `status` from ((`" . env('DB_DATABASE') . "`.`production` join `" . env('DB_DATABASE') . "`.`production_polish` on(`" . env('DB_DATABASE') . "`.`production`.`row_id` = `" . env('DB_DATABASE') . "`.`production_polish`.`row_id` and `" . env('DB_DATABASE') . "`.`production_polish`.`is_deleted` = 0)) join `" . env('DB_DATABASE') . "`.`craftsman` on(`" . env('DB_DATABASE') . "`.`craftsman`.`row_id` = `" . env('DB_DATABASE') . "`.`production_polish`.`craftsman_id`)) where `" . env('DB_DATABASE') . "`.`production`.`is_deleted` = 0 and `" . env('DB_DATABASE') . "`.`production`.`is_submitted` = 1");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_report_craftsman_production_polishlist`");
    }
};
