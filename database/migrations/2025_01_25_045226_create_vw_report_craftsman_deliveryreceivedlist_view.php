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
        DB::statement("CREATE VIEW `vw_report_craftsman_deliveryreceivedlist` AS select `vw_report_craftsman_production_framelist`.`doc_no` AS `doc_no`,'Pembuatan Rangka' AS `task`,`vw_report_craftsman_production_framelist`.`name` AS `name`,`vw_report_craftsman_production_framelist`.`craftsman_id` AS `craftsman_id`,`vw_report_craftsman_production_framelist`.`craftsman_id_txt` AS `craftsman_id_txt`,`vw_report_craftsman_production_framelist`.`delivery_date` AS `delivery_date`,`vw_report_craftsman_production_framelist`.`received_date` AS `received_date` from `" . env('DB_DATABASE') . "`.`vw_report_craftsman_production_framelist` where `vw_report_craftsman_production_framelist`.`status` = 'DONE' union select `vw_report_craftsman_production_polishlist`.`doc_no` AS `doc_no`,'Proses Poles' AS `task`,`vw_report_craftsman_production_polishlist`.`name` AS `name`,`vw_report_craftsman_production_polishlist`.`craftsman_id` AS `craftsman_id`,`vw_report_craftsman_production_polishlist`.`craftsman_id_txt` AS `craftsman_id_txt`,`vw_report_craftsman_production_polishlist`.`delivery_date` AS `delivery_date`,`vw_report_craftsman_production_polishlist`.`received_date` AS `received_date` from `" . env('DB_DATABASE') . "`.`vw_report_craftsman_production_polishlist` where `vw_report_craftsman_production_polishlist`.`status` = 'DONE' union select `vw_report_craftsman_production_diamondlist`.`doc_no` AS `doc_no`,'Pemasangan batu' AS `task`,`vw_report_craftsman_production_diamondlist`.`name` AS `name`,`vw_report_craftsman_production_diamondlist`.`craftsman_id` AS `craftsman_id`,`vw_report_craftsman_production_diamondlist`.`craftsman_id_txt` AS `craftsman_id_txt`,`vw_report_craftsman_production_diamondlist`.`delivery_date` AS `delivery_date`,`vw_report_craftsman_production_diamondlist`.`received_date` AS `received_date` from `" . env('DB_DATABASE') . "`.`vw_report_craftsman_production_diamondlist` where `vw_report_craftsman_production_diamondlist`.`status` = 'DONE'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_report_craftsman_deliveryreceivedlist`");
    }
};
