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
        DB::statement("CREATE VIEW `vw_production_diamondlist` AS select `" . env('DB_DATABASE') . "`.`production_diamond`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`production_diamond`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`production_diamond`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`production_diamond`.`period` AS `period`,`" . env('DB_DATABASE') . "`.`production_diamond`.`period_received` AS `period_received`,`" . env('DB_DATABASE') . "`.`production_diamond`.`work_no` AS `work_no`,`" . env('DB_DATABASE') . "`.`production_diamond`.`craftsman_id` AS `craftsman_id`,`" . env('DB_DATABASE') . "`.`craftsman`.`name` AS `craftsman_id_txt`,`" . env('DB_DATABASE') . "`.`production_diamond`.`diamond_type_id` AS `diamond_type_id`,concat(`" . env('DB_DATABASE') . "`.`diamond_type`.`category`,' ',`" . env('DB_DATABASE') . "`.`diamond_type`.`name`) AS `diamond_type_id_txt`,`" . env('DB_DATABASE') . "`.`production_diamond`.`pcs` AS `pcs`,`" . env('DB_DATABASE') . "`.`production_diamond`.`crt` AS `crt`,`" . env('DB_DATABASE') . "`.`production_diamond`.`delivery_date` AS `delivery_date`,`" . env('DB_DATABASE') . "`.`production_diamond`.`received_date` AS `received_date`,`" . env('DB_DATABASE') . "`.`production_diamond`.`remaining_pcs` AS `remaining_pcs`,`" . env('DB_DATABASE') . "`.`production_diamond`.`remaining_crt` AS `remaining_crt`,`" . env('DB_DATABASE') . "`.`production_diamond`.`photo` AS `photo`,`" . env('DB_DATABASE') . "`.`production_diamond`.`status` AS `status`,`" . env('DB_DATABASE') . "`.`production_diamond`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`production_diamond`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`production_diamond`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`production_diamond`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`production_diamond`.`modified_by` AS `modified_by` from ((`" . env('DB_DATABASE') . "`.`production_diamond` left join `" . env('DB_DATABASE') . "`.`craftsman` on(`" . env('DB_DATABASE') . "`.`production_diamond`.`craftsman_id` = `" . env('DB_DATABASE') . "`.`craftsman`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`diamond_type` on(`" . env('DB_DATABASE') . "`.`production_diamond`.`diamond_type_id` = `" . env('DB_DATABASE') . "`.`diamond_type`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_production_diamondlist`");
    }
};
