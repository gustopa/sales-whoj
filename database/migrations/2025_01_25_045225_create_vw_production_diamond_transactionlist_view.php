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
        DB::statement("CREATE VIEW `vw_production_diamond_transactionlist` AS select `" . env('DB_DATABASE') . "`.`production_diamond`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`production_diamond`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`production`.`doc_no` AS `doc_no`,`" . env('DB_DATABASE') . "`.`production`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`production_diamond`.`period` AS `period`,`" . env('DB_DATABASE') . "`.`production_diamond`.`work_no` AS `work_no`,'Proses poles' AS `work_name`,'Serah' AS `work_type`,`" . env('DB_DATABASE') . "`.`production_diamond`.`craftsman_id` AS `craftsman_id`,`" . env('DB_DATABASE') . "`.`craftsman`.`name` AS `craftsman_id_txt`,`" . env('DB_DATABASE') . "`.`production_diamond`.`diamond_type_id` AS `diamond_type_id`,concat(`" . env('DB_DATABASE') . "`.`diamond_type`.`category`,' ',`" . env('DB_DATABASE') . "`.`diamond_type`.`name`) AS `diamond_type_id_txt`,`" . env('DB_DATABASE') . "`.`production_diamond`.`pcs` * -1 AS `pcs`,`" . env('DB_DATABASE') . "`.`production_diamond`.`crt` * -1 AS `crt`,`" . env('DB_DATABASE') . "`.`production_diamond`.`delivery_date` AS `trans_date` from (((`" . env('DB_DATABASE') . "`.`production` left join `" . env('DB_DATABASE') . "`.`production_diamond` on(`" . env('DB_DATABASE') . "`.`production_diamond`.`row_id` = `" . env('DB_DATABASE') . "`.`production`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`craftsman` on(`" . env('DB_DATABASE') . "`.`production_diamond`.`craftsman_id` = `" . env('DB_DATABASE') . "`.`craftsman`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`diamond_type` on(`" . env('DB_DATABASE') . "`.`production_diamond`.`diamond_type_id` = `" . env('DB_DATABASE') . "`.`diamond_type`.`row_id`)) where `" . env('DB_DATABASE') . "`.`production`.`is_deleted` = 0 and `" . env('DB_DATABASE') . "`.`production`.`is_submitted` = 1 and `" . env('DB_DATABASE') . "`.`production_diamond`.`is_deleted` = 0 union all select `" . env('DB_DATABASE') . "`.`production_diamond`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`production_diamond`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`production`.`doc_no` AS `doc_no`,`" . env('DB_DATABASE') . "`.`production`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`production_diamond`.`period_received` AS `period`,`" . env('DB_DATABASE') . "`.`production_diamond`.`work_no` AS `work_no`,'Proses poles' AS `work_name`,'Terima' AS `work_type`,`" . env('DB_DATABASE') . "`.`production_diamond`.`craftsman_id` AS `craftsman_id`,`" . env('DB_DATABASE') . "`.`craftsman`.`name` AS `craftsman_id_txt`,`" . env('DB_DATABASE') . "`.`production_diamond`.`diamond_type_id` AS `diamond_type_id`,concat(`" . env('DB_DATABASE') . "`.`diamond_type`.`category`,' ',`" . env('DB_DATABASE') . "`.`diamond_type`.`name`) AS `diamond_type_id_txt`,`" . env('DB_DATABASE') . "`.`production_diamond`.`remaining_pcs` AS `pcs`,`" . env('DB_DATABASE') . "`.`production_diamond`.`remaining_crt` AS `crt`,`" . env('DB_DATABASE') . "`.`production_diamond`.`received_date` AS `trans_date` from (((`" . env('DB_DATABASE') . "`.`production` left join `" . env('DB_DATABASE') . "`.`production_diamond` on(`" . env('DB_DATABASE') . "`.`production_diamond`.`row_id` = `" . env('DB_DATABASE') . "`.`production`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`craftsman` on(`" . env('DB_DATABASE') . "`.`production_diamond`.`craftsman_id` = `" . env('DB_DATABASE') . "`.`craftsman`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`diamond_type` on(`" . env('DB_DATABASE') . "`.`production_diamond`.`diamond_type_id` = `" . env('DB_DATABASE') . "`.`diamond_type`.`row_id`)) where `" . env('DB_DATABASE') . "`.`production`.`is_deleted` = 0 and `" . env('DB_DATABASE') . "`.`production`.`is_submitted` = 1 and `" . env('DB_DATABASE') . "`.`production_diamond`.`is_deleted` = 0");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_production_diamond_transactionlist`");
    }
};
